import { WORDS, WordEntry } from "@/constants/words";
import { getCachedWords, syncWordsFromDb } from "@/lib/words-db";
import { getNextRabbitHoleWord } from "@/lib/graph-engine";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { AppState, AppStateStatus } from "react-native";
import { LOCAL_USER_NAME_KEY, LOCAL_USER_AVATAR_KEY } from "@/context/auth-context";

const STATS_KEY = "@etymo_user_stats_local";
const BOOKMARKS_KEY = "@etymo_bookmarked_words_local";

export type GamePhase = "quiz" | "story" | "result" | "branching";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/**
 * Generates an SRS (Spaced Repetition System) weighted learning queue:
 * - Words with lower mastery (0 or 1) appear first with high probability
 * - Bookmarked words receive an extra weight boost
 * - Mastered words (level 3) appear with lower frequency for retention check
 * - Adds random jitter for session variety
 */
export function buildSrsQueue(
  words: WordEntry[],
  mastery: Record<string, number> = {},
  bookmarkedIds: Set<string> = new Set(),
): WordEntry[] {
  if (words.length === 0) return [];

  const scored = words.map((w) => {
    const level = mastery[w.id] ?? 0;
    // Level 0: 4.0, Level 1: 3.0, Level 2: 1.5, Level 3: 0.5
    let weight = level === 0 ? 4.0 : level === 1 ? 3.0 : level === 2 ? 1.5 : 0.5;

    if (bookmarkedIds.has(w.id)) {
      weight += 1.5;
    }

    const jitter = 0.8 + Math.random() * 0.4;
    return { word: w, score: weight * jitter };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.map((s) => s.word);
}

import { ALL_BADGES, Badge } from "@/constants/badges";

export type BadgeType = Badge;

// ── Main hook ──────────────────────────────────────────────────────────

export function useGameState(user?: { id: string; email?: string } | null) {
  const [wordsList, setWordsList] = useState<WordEntry[]>(WORDS);
  const [queue, setQueue] = useState<WordEntry[]>(() => shuffle(WORDS));
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentWord = queue[currentIndex % queue.length] || WORDS[0];
  const [phase, setPhase] = useState<GamePhase>("quiz");
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);

  const [dailyStreak, setDailyStreak] = useState(0);
  const [lastPlayedDate, setLastPlayedDate] = useState<string | null>(null);
  const [sessionStreak, setSessionStreak] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);
  const [blitzRecord, setBlitzRecord] = useState(0);
  const [randomRecord, setRandomRecord] = useState(0);
  const [wordsDiscovered, setWordsDiscovered] = useState<WordEntry[]>([]);
  const [wordMastery, setWordMastery] = useState<Record<string, number>>({});
  const [bookmarkedWords, setBookmarkedWords] = useState<WordEntry[]>([]);
  const [isSpecialMode, setIsSpecialMode] = useState(false);
  const [isSrsMode, setIsSrsMode] = useState(false);
  const [newBadge, setNewBadge] = useState<BadgeType | null>(null);
  const [unlockedBadgeIds, setUnlockedBadgeIds] = useState<string[]>([]);

  const [dailyWordsCount, setDailyWordsCount] = useState(0);
  const [dailyBlitzCount, setDailyBlitzCount] = useState(0);
  const [rabbitHoleTrail, setRabbitHoleTrail] = useState<string[]>([]);

  const handleNextRef = useRef<(specificWordId?: string) => void>(() => {});

  useEffect(() => {
    loadInitialData();
  }, []);

  const checkBadgeUnlock = useCallback(
    (stats: {
      wordsCount?: number;
      streak?: number;
      combo?: number;
      blitz?: number;
      bookmarks?: number;
      mastery?: number;
    }) => {
      const wordsCount = stats.wordsCount ?? wordsDiscovered.length;
      const currentStreak = stats.streak ?? dailyStreak;
      const currentCombo = stats.combo ?? maxCombo;
      const currentBlitz = stats.blitz ?? blitzRecord;
      const currentBookmarks = stats.bookmarks ?? bookmarkedWords.length;
      const currentMastery = stats.mastery ?? Object.values(wordMastery).filter((v) => v >= 3).length;

      for (const badge of ALL_BADGES) {
        if (unlockedBadgeIds.includes(badge.id)) continue;

        let unlocked = false;
        const targetReq =
          badge.id === "maestro" ? (wordsList.length || badge.req) : badge.req;
        if (badge.category === "words" && wordsCount >= targetReq) unlocked = true;
        if (badge.category === "streak" && currentStreak >= badge.req) unlocked = true;
        if (badge.category === "combo" && currentCombo >= badge.req) unlocked = true;
        if (badge.category === "blitz" && currentBlitz >= badge.req) unlocked = true;
        if (badge.category === "bookmarks" && currentBookmarks >= badge.req) unlocked = true;
        if (badge.category === "mastery" && currentMastery >= badge.req) unlocked = true;

        if (unlocked) {
          setUnlockedBadgeIds((prev) => [...prev, badge.id]);
          setNewBadge(badge);
          break;
        }
      }
    },
    [wordsDiscovered.length, dailyStreak, maxCombo, blitzRecord, bookmarkedWords.length, wordMastery, unlockedBadgeIds, wordsList.length]
  );

  const buildCurrentState = useCallback(
    () => ({
      dailyStreak,
      maxCombo,
      blitzRecord,
      randomRecord,
      lastPlayedDate,
      wordMastery,
      discoveredIds: wordsDiscovered.map((w) => w.id),
      unlockedBadgeIds,
      isPremium: true,
      dailyWordsCount,
      dailyBlitzCount,
    }),
    [
      dailyStreak,
      maxCombo,
      blitzRecord,
      randomRecord,
      lastPlayedDate,
      wordMastery,
      wordsDiscovered,
      unlockedBadgeIds,
      dailyWordsCount,
      dailyBlitzCount,
    ],
  );

  const persistState = useCallback(async () => {
    if (!lastPlayedDate) return;
    const state = buildCurrentState();
    await AsyncStorage.setItem(STATS_KEY, JSON.stringify(state));
  }, [buildCurrentState, lastPlayedDate]);

  // Debounced save
  useEffect(() => {
    if (!lastPlayedDate) return;
    const timer = setTimeout(persistState, 1000);
    return () => clearTimeout(timer);
  }, [persistState, lastPlayedDate]);

  // Immediate save on background
  useEffect(() => {
    const handleAppStateChange = async (nextState: AppStateStatus) => {
      if (nextState === "background" || nextState === "inactive") {
        await persistState();
      }
    };
    const subscription = AppState.addEventListener(
      "change",
      handleAppStateChange,
    );
    return () => subscription.remove();
  }, [persistState]);

  const loadInitialData = useCallback(async () => {
    try {
      const today = new Date().toISOString().split("T")[0];

      // 0. Words list
      const activeWords = await getCachedWords();
      setWordsList(activeWords);
      setQueue(shuffle(activeWords));

      // 1. Stats with migration from previous keys
      let savedStats = await AsyncStorage.getItem(STATS_KEY);
      if (!savedStats) {
        for (const k of ["@user_stats_v2_guest", "@user_stats_v2_local_user", "@user_stats_v2"]) {
          const val = await AsyncStorage.getItem(k);
          if (val) {
            savedStats = val;
            await AsyncStorage.setItem(STATS_KEY, val);
            break;
          }
        }
      }

      let initialDailyStreak = 0;
      let initialMaxCombo = 0;
      let initialBlitzRecord = 0;
      let initialRandomRecord = 0;
      let initialLastPlayed: string | null = null;
      let initialMastery: Record<string, number> = {};
      let discoveredIds: string[] = [];
      let initialDailyWordsCount = 0;
      let initialDailyBlitzCount = 0;

      if (savedStats) {
        const parsed = JSON.parse(savedStats);
        initialDailyStreak = parsed.dailyStreak ?? 0;
        initialMaxCombo = parsed.maxCombo ?? 0;
        initialBlitzRecord = parsed.blitzRecord ?? 0;
        initialRandomRecord = parsed.randomRecord ?? 0;
        initialLastPlayed = parsed.lastPlayedDate ?? null;
        initialMastery = parsed.wordMastery ?? {};
        discoveredIds = parsed.discoveredIds ?? [];
        if (Array.isArray(parsed.unlockedBadgeIds)) {
          setUnlockedBadgeIds(parsed.unlockedBadgeIds);
        }

        if (parsed.lastPlayedDate === today) {
          initialDailyWordsCount = parsed.dailyWordsCount ?? 0;
          initialDailyBlitzCount = parsed.dailyBlitzCount ?? 0;
        }
      }

      setDailyStreak(initialDailyStreak);
      setMaxCombo(initialMaxCombo);
      setBlitzRecord(initialBlitzRecord);
      setRandomRecord(initialRandomRecord);
      setLastPlayedDate(initialLastPlayed);
      setWordMastery(initialMastery);
      setDailyWordsCount(initialDailyWordsCount);
      setDailyBlitzCount(initialDailyBlitzCount);
      setWordsDiscovered(activeWords.filter((w) => discoveredIds.includes(w.id)));

      // 2. Bookmarks with migration
      let savedBookmarks = await AsyncStorage.getItem(BOOKMARKS_KEY);
      if (!savedBookmarks) {
        for (const bk of ["@bookmarked_words_guest", "@bookmarked_words_local_user", "@bookmarked_words"]) {
          const bVal = await AsyncStorage.getItem(bk);
          if (bVal) {
            savedBookmarks = bVal;
            await AsyncStorage.setItem(BOOKMARKS_KEY, bVal);
            break;
          }
        }
      }

      let bookmarkedIds: string[] = [];
      if (savedBookmarks) {
        try {
          bookmarkedIds = JSON.parse(savedBookmarks);
        } catch {}
      }
      setBookmarkedWords(activeWords.filter((w) => bookmarkedIds.includes(w.id)));

      // Initialize queue with SRS weights
      setQueue(buildSrsQueue(activeWords, initialMastery, new Set(bookmarkedIds)));

      // Background optional sync for word updates
      syncWordsFromDb().then((syncedWords) => {
        if (syncedWords && syncedWords.length > 0) {
          setWordsList(syncedWords);
          setQueue(buildSrsQueue(syncedWords, initialMastery, new Set(bookmarkedIds)));
          setWordsDiscovered(syncedWords.filter((w) => discoveredIds.includes(w.id)));
          setBookmarkedWords(syncedWords.filter((w) => bookmarkedIds.includes(w.id)));
        }
      }).catch(() => {});

      // Streak logic on mount
      let finalDailyStreak = initialDailyStreak;
      let finalLastPlayed = initialLastPlayed;
      let streakUpdated = false;

      if (finalLastPlayed) {
        const lastDate = new Date(finalLastPlayed);
        const todayDate = new Date(today);
        lastDate.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);
        const diffDays = Math.round(
          (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
        );

        if (diffDays > 1) {
          // Missed more than 1 day: streak reset to 0 until played
          finalDailyStreak = 0;
          streakUpdated = true;
        }
      }

      if (streakUpdated) {
        setDailyStreak(finalDailyStreak);
        const statsToSave = {
          dailyStreak: finalDailyStreak,
          maxCombo: initialMaxCombo,
          blitzRecord: initialBlitzRecord,
          randomRecord: initialRandomRecord,
          lastPlayedDate: finalLastPlayed,
          wordMastery: initialMastery,
          discoveredIds,
          isPremium: true,
          dailyWordsCount: finalLastPlayed === today ? initialDailyWordsCount : 0,
          dailyBlitzCount: finalLastPlayed === today ? initialDailyBlitzCount : 0,
        };
        await AsyncStorage.setItem(STATS_KEY, JSON.stringify(statsToSave));
      }
    } catch (e) {
      console.error("Error loading local data:", e);
    }
  }, []);

  const updateBlitzRecord = useCallback(
    (newScore: number) => {
      if (newScore > blitzRecord) {
        setBlitzRecord(newScore);
        checkBadgeUnlock({ blitz: newScore });
        return true;
      }
      return false;
    },
    [blitzRecord, checkBadgeUnlock],
  );

  const updateRandomRecord = useCallback(
    (newScore: number) => {
      if (newScore > randomRecord) {
        setRandomRecord(newScore);
        checkBadgeUnlock({ combo: newScore });
        return true;
      }
      return false;
    },
    [randomRecord, checkBadgeUnlock],
  );

  const discoverWord = useCallback(
    (word: WordEntry) => {
      setWordsDiscovered((prev) => {
        const alreadyDiscovered = prev.some((w) => w.id === word.id);
        const filtered = prev.filter((w) => w.id !== word.id);
        const newList = [word, ...filtered];
        if (!alreadyDiscovered) {
          checkBadgeUnlock({ wordsCount: newList.length });
        }
        return newList;
      });
    },
    [checkBadgeUnlock],
  );

  // Registra automaticamente ogni parola di cui l'utente legge la storia
  useEffect(() => {
    if (phase === "story" && currentWord) {
      discoverWord(currentWord);
    }
  }, [phase, currentWord, discoverWord]);

  const handleNext = useCallback(
    (specificWordId?: string) => {
      if (specificWordId) {
        const word = wordsList.find(
          (w) =>
            w.id.toLowerCase() === specificWordId.toLowerCase() ||
            w.word.toLowerCase() === specificWordId.toLowerCase(),
        );
        if (word) {
          setRabbitHoleTrail((prev) => [...prev.slice(-10), word.id]);
          const newQueue = [...queue];
          const nextIndex = (currentIndex + 1) % newQueue.length;
          newQueue[nextIndex] = word;
          setQueue(newQueue);
          setCurrentIndex(nextIndex);
          setSelectedAnswer(null);
          setIsCorrect(false);
          setPhase("quiz");
          return;
        }
      }

      // Se siamo in modalità speciale o ripasso SRS, scorriamo la coda dedicata
      if (isSpecialMode || isSrsMode) {
        const nextIndex = (currentIndex + 1) % queue.length;
        setCurrentIndex(nextIndex);
        setSelectedAnswer(null);
        setIsCorrect(false);
        setPhase("quiz");
        return;
      }

      // ── Flusso Rabbit Hole: seleziona una parola collegata con criterio ──
      const nextWord = getNextRabbitHoleWord(
        currentWord,
        wordsList,
        wordsDiscovered,
        wordMastery,
        rabbitHoleTrail
      );

      setRabbitHoleTrail((prev) => [...prev.slice(-10), nextWord.id]);
      const newQueue = [...queue];
      const nextIndex = (currentIndex + 1) % newQueue.length;
      newQueue[nextIndex] = nextWord;
      setQueue(newQueue);
      setCurrentIndex(nextIndex);
      setSelectedAnswer(null);
      setIsCorrect(false);
      setPhase("quiz");
    },
    [queue, currentIndex, wordsList, currentWord, wordsDiscovered, wordMastery, rabbitHoleTrail, isSpecialMode, isSrsMode],
  );

  useEffect(() => {
    handleNextRef.current = handleNext;
  }, [handleNext]);

  const showWordStory = useCallback((word: WordEntry) => {
    setQueue((prev) => {
      const idx = prev.findIndex((w) => w.id === word.id);
      if (idx !== -1) {
        setCurrentIndex(idx);
        return prev;
      }
      return [word, ...prev];
    });
    if (!queue.some((w) => w.id === word.id)) {
      setCurrentIndex(0);
    }
    setPhase("story");
    setSelectedAnswer(null);
    setIsCorrect(false);
    setIsSrsMode(false);
    discoverWord(word);
  }, [queue, discoverWord]);

  const startSpecialQuiz = useCallback((words: WordEntry[]) => {
    if (words.length === 0) return;
    setQueue(shuffle(words));
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setPhase("quiz");
    setIsSpecialMode(true);
    setIsSrsMode(false);
    setSessionStreak(0);
  }, []);

  const recordDailyActivity = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    setLastPlayedDate((currentLastPlayed) => {
      if (currentLastPlayed === today) return currentLastPlayed;

      setDailyStreak((prevStreak) => {
        if (!currentLastPlayed) return 1;
        const lastDate = new Date(currentLastPlayed);
        const todayDate = new Date(today);
        lastDate.setHours(0, 0, 0, 0);
        todayDate.setHours(0, 0, 0, 0);
        const diffDays = Math.round(
          (todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24),
        );
        return diffDays === 1 ? prevStreak + 1 : 1;
      });

      return today;
    });
  }, []);

  const handleAnswer = useCallback(
    (selectedIndex: number) => {
      setSelectedAnswer(selectedIndex);
      const correct = selectedIndex === currentWord.correctAnswer;
      setIsCorrect(correct);
      recordDailyActivity();

      if (correct) {
        setSessionStreak((prev) => {
          const newStreak = prev + 1;
          setMaxCombo((currentMax) => {
            const nextMax = Math.max(currentMax, newStreak);
            checkBadgeUnlock({ combo: nextMax });
            return nextMax;
          });
          return newStreak;
        });

        setWordMastery((prev) => {
          const currentLevel = prev[currentWord.id] ?? 0;
          const nextLevel = Math.min(3, currentLevel + 1);
          return { ...prev, [currentWord.id]: nextLevel };
        });

        if (!isSpecialMode) {
          discoverWord(currentWord);
          setDailyWordsCount((prev) => prev + 1);
        }

        if (isSrsMode) {
          // Nel Ripasso Intelligente, se la risposta è corretta si passa direttamente alla parola successiva
          setTimeout(() => {
            handleNextRef.current();
          }, 1000);
        } else {
          setTimeout(() => {
            setPhase("story");
          }, 1200);
        }
      } else {
        setSessionStreak(0);
        // SRS: decrement mastery level on error
        setWordMastery((prev) => {
          const currentLevel = prev[currentWord.id] ?? 0;
          const nextLevel = Math.max(0, currentLevel - 1);
          return { ...prev, [currentWord.id]: nextLevel };
        });

        // SRS: re-insert this word 3 positions later into the active queue
        setQueue((prevQueue) => {
          const copy = [...prevQueue];
          const insertIdx = Math.min(copy.length, currentIndex + 3);
          copy.splice(insertIdx, 0, currentWord);
          return copy;
        });

        if (!isSpecialMode) {
          discoverWord(currentWord);
          setDailyWordsCount((prev) => prev + 1);
        }
        // Se invece sbaglia, mostra la storia della parola per permettere all'utente di leggerla e impararla
        setTimeout(() => {
          setPhase("story");
        }, 1400);
      }
    },
    [
      currentWord,
      currentIndex,
      isSpecialMode,
      isSrsMode,
      discoverWord,
      recordDailyActivity,
    ],
  );

  const updateWordMastery = useCallback((wordId: string, levelDelta: number = 1) => {
    setWordMastery((prev) => {
      const currentLevel = prev[wordId] ?? 0;
      const nextLevel = Math.max(0, Math.min(3, currentLevel + levelDelta));
      return { ...prev, [wordId]: nextLevel };
    });
  }, []);

  const toggleBookmark = useCallback(
    async (word: WordEntry) => {
      const isBookmarked = bookmarkedWords.some((w) => w.id === word.id);

      const newList = isBookmarked
        ? bookmarkedWords.filter((w) => w.id !== word.id)
        : [word, ...bookmarkedWords];

      setBookmarkedWords(newList);

      await AsyncStorage.setItem(
        BOOKMARKS_KEY,
        JSON.stringify(newList.map((w) => w.id)),
      );

      return true;
    },
    [bookmarkedWords],
  );

  const resetGame = useCallback((special: boolean = false) => {
    if (special) {
      setQueue(shuffle(wordsList));
    } else {
      const bookmarkedIds = new Set(bookmarkedWords.map((w) => w.id));
      setQueue(buildSrsQueue(wordsList, wordMastery, bookmarkedIds));
    }
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setPhase("quiz");
    setSessionStreak(0);
    setIsSpecialMode(special);
    setIsSrsMode(false);
  }, [wordsList, wordMastery, bookmarkedWords]);

  const startSrsReview = useCallback(() => {
    const bookmarkedIds = new Set(bookmarkedWords.map((w) => w.id));
    const dueWords = wordsList.filter(
      (w) => (wordMastery[w.id] ?? 0) < 3 || bookmarkedIds.has(w.id),
    );
    const targetWords = dueWords.length > 0 ? dueWords : wordsList;
    const srsQueue = buildSrsQueue(targetWords, wordMastery, bookmarkedIds);
    setQueue(srsQueue);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setPhase("quiz");
    setIsSpecialMode(true);
    setIsSrsMode(true);
    setSessionStreak(0);
  }, [wordsList, wordMastery, bookmarkedWords]);

  // ── Backup Export / Import ──────────────────────────────────────────────────

  const exportBackup = useCallback(async (): Promise<string> => {
    const [savedStats, savedBookmarks, localName, localAvatar] = await Promise.all([
      AsyncStorage.getItem(STATS_KEY),
      AsyncStorage.getItem(BOOKMARKS_KEY),
      AsyncStorage.getItem(LOCAL_USER_NAME_KEY),
      AsyncStorage.getItem(LOCAL_USER_AVATAR_KEY),
    ]);

    const resolvedName = localName || (user as any)?.user_metadata?.full_name || "Studioso Errante";
    const resolvedAvatar = localAvatar || (user as any)?.user_metadata?.avatar_url || "";

    const backupData = {
      app: "Etymo",
      version: 1,
      exportedAt: new Date().toISOString(),
      profile: {
        name: resolvedName,
        avatar: resolvedAvatar,
      },
      stats: savedStats ? JSON.parse(savedStats) : buildCurrentState(),
      bookmarks: savedBookmarks ? JSON.parse(savedBookmarks) : bookmarkedWords.map((w) => w.id),
    };

    return JSON.stringify(backupData, null, 2);
  }, [buildCurrentState, bookmarkedWords, user]);

  const importBackup = useCallback(
    async (jsonString: string): Promise<{ success: boolean; error?: string }> => {
      try {
        const data = JSON.parse(jsonString.trim());
        if (!data || typeof data !== "object") {
          return { success: false, error: "Formato JSON non valido." };
        }
        if (!data.stats && !data.bookmarks) {
          return { success: false, error: "Il file non contiene dati di backup per Etymo." };
        }

        const profileName = data.profile?.name || data.profile?.full_name || data.userName || data.user_name;
        const profileAvatar = data.profile?.avatar ?? data.profile?.avatar_url ?? data.avatarUrl ?? data.avatar_url;

        if (profileName) {
          await AsyncStorage.setItem(LOCAL_USER_NAME_KEY, profileName);
        }
        if (profileAvatar !== undefined) {
          await AsyncStorage.setItem(LOCAL_USER_AVATAR_KEY, profileAvatar);
        }
        if (data.stats) {
          await AsyncStorage.setItem(STATS_KEY, JSON.stringify(data.stats));
        }
        if (data.bookmarks) {
          await AsyncStorage.setItem(BOOKMARKS_KEY, JSON.stringify(data.bookmarks));
        }

        await loadInitialData();
        return { success: true };
      } catch (e: any) {
        return { success: false, error: e.message || "Errore nella lettura del backup." };
      }
    },
    [loadInitialData],
  );

  const resetAllData = useCallback(async () => {
    setDailyStreak(0);
    setMaxCombo(0);
    setBlitzRecord(0);
    setRandomRecord(0);
    setLastPlayedDate(null);
    setWordMastery({});
    setDailyWordsCount(0);
    setDailyBlitzCount(0);
    setWordsDiscovered([]);
    setBookmarkedWords([]);
    setSessionStreak(0);
    setSelectedAnswer(null);
    setIsCorrect(false);
    setPhase("quiz");

    await AsyncStorage.multiRemove([
      STATS_KEY,
      BOOKMARKS_KEY,
      "@user_stats_v2_guest",
      "@user_stats_v2_local_user",
      "@user_stats_v2",
      "@bookmarked_words_guest",
      "@bookmarked_words_local_user",
      "@bookmarked_words",
    ]);
  }, []);

  return {
    wordsList,
    currentWord,
    phase,
    selectedAnswer,
    isCorrect,
    streak: dailyStreak,
    sessionStreak,
    maxCombo,
    blitzRecord,
    updateBlitzRecord,
    randomRecord,
    updateRandomRecord,
    wordMastery,
    updateWordMastery,
    wordsDiscovered,
    bookmarkedWords,
    toggleBookmark,
    handleAnswer,
    handleNext,
    showWordStory,
    startSpecialQuiz,
    startSrsReview,
    resetGame,
    resetAllData,
    newBadge,
    clearNewBadge: () => setNewBadge(null),
    rabbitHoleTrail,
    isSpecialMode,
    isSrsMode,
    isPremium: true,
    dailyWordsCount,
    dailyBlitzCount,
    incrementBlitzCount: () => setDailyBlitzCount((prev) => prev + 1),
    exportBackup,
    importBackup,
  };
}
