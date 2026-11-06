import BottomNav from "@/components/bottom-nav";
import GraphScreen from "@/components/graph-screen";
import Header from "@/components/header";
import HomeScreen from "@/components/home-screen";
import LibraryScreen from "@/components/library-screen";
import ProfileScreen from "@/components/profile-screen";
import QuizScreen from "@/components/quiz-screen";
import StoryScreen from "@/components/story-screen";
import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { WordEntry, WORDS } from "@/constants/words";
import { useGameState } from "@/hooks/use-game-state";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  BackHandler,
  Modal,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import BlitzGame from "@/components/blitz-game";
import RandomGame from "@/components/random-game";
import OnboardingScreen from "@/components/onboarding-screen";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { Feather } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import * as Linking from "expo-linking";
import { requestWidgetUpdate } from "react-native-android-widget";
import { WordOfTheDayWidget } from "../../widget/WordOfTheDayWidget";

const ONBOARDING_KEY = "@has_seen_onboarding";

const useSafeLastNotificationResponse =
  Platform.OS === "web"
    ? () => null
    : Notifications.useLastNotificationResponse;

function AppContent() {
  const [activeTab, setActiveTab] = useState<
    "game" | "library" | "graph" | "profile"
  >("game");
  const [isPlaying, setIsPlaying] = useState(false);
  const [showBlitz, setShowBlitz] = useState(false);
  const [showRandomGame, setShowRandomGame] = useState(false);
  const [libraryTab, setLibraryTab] = useState<"archive" | "academy">("archive");
  const [showOnboarding, setShowOnboarding] = useState<boolean | null>(null);

  const { colors, isDark } = useTheme();
  const { session, user, loading: authLoading } = useAuth();

  const {
    wordsList,
    currentWord,
    phase,
    selectedAnswer,
    isCorrect,
    streak,
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
    dailyWordsCount,
    dailyBlitzCount,
    incrementBlitzCount,
    newBadge,
    clearNewBadge,
    exportBackup,
    importBackup,
  } = useGameState(user);

  const handleStartDaily = () => {
    setIsPlaying(true);
    resetGame(false);
  };

  const handleHome = () => {
    setIsPlaying(false);
    setShowBlitz(false);
    resetGame(false);
  };

  const handleSelectWord = (word: WordEntry) => {
    setIsPlaying(true);
    showWordStory(word);
  };

  const handleStartSpecial = (mode: "bookmarks" | "random" | "blitz" | "srs") => {
    setLibraryTab("academy");
    if (mode === "blitz") {
      setShowBlitz(true);
      return;
    }
    if (mode === "random") {
      setShowRandomGame(true);
      return;
    }
    setIsPlaying(true);
    if (mode === "srs") {
      startSrsReview();
    } else if (mode === "bookmarks") {
      startSpecialQuiz(bookmarkedWords);
    } else {
      resetGame(true);
    }
  };

  const checkOnboarding = async () => {
    try {
      const value = await AsyncStorage.getItem(ONBOARDING_KEY);
      setShowOnboarding(value === null);
    } catch {
      setShowOnboarding(false);
    }
  };

  const handleOnboardingComplete = async () => {
    try {
      await AsyncStorage.setItem(ONBOARDING_KEY, "true");
      setShowOnboarding(false);
    } catch {
      setShowOnboarding(false);
    }
  };

  const lastNotificationResponse = useSafeLastNotificationResponse();

  useEffect(() => {
    checkOnboarding();
  }, []);

  useEffect(() => {
    if (
      lastNotificationResponse &&
      lastNotificationResponse.actionIdentifier ===
        Notifications.DEFAULT_ACTION_IDENTIFIER
    ) {
      const data = lastNotificationResponse.notification.request.content.data;
      if (data?.wordId) {
        const found = wordsList.find(
          (w) =>
            w.id.toLowerCase() === String(data.wordId).toLowerCase() ||
            w.word.toLowerCase() === String(data.wordId).toLowerCase(),
        );
        if (found) {
          setIsPlaying(true);
          showWordStory(found);
          return;
        }
      }
      if (data?.screen === "game") {
        handleStartDaily();
      }
    }
  }, [lastNotificationResponse, wordsList]);

  useEffect(() => {
    const backAction = () => {
      if (showBlitz) {
        setShowBlitz(false);
        return true;
      }
      if (showRandomGame) {
        setShowRandomGame(false);
        return true;
      }
      if (isPlaying) {
        setIsPlaying(false);
        return true;
      }
      if (activeTab !== "game") {
        setActiveTab("game");
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction,
    );
    return () => backHandler.remove();
  }, [showBlitz, showRandomGame, isPlaying, activeTab]);

  useEffect(() => {
    if (Platform.OS === "android" && wordsList && wordsList.length > 0) {
      const today = new Date();
      const dateHash = today.getFullYear() * 1000 + today.getMonth() * 100 + today.getDate();
      const index = dateHash % wordsList.length;
      const wordOfTheDay = wordsList[index];

      requestWidgetUpdate({
        widgetName: "WordOfTheDay",
        renderWidget: () => React.createElement(WordOfTheDayWidget as any, { wordEntry: wordOfTheDay }),
      }).catch((err) => console.log("Widget update error:", err));
    }
  }, [wordsList]);

  // ─── Deep Linking Handler ──────────────────────────────────────────────────
  const initialUrl = Linking.useURL();

  const handleDeepLink = (url: string | null) => {
    if (!url) return;
    try {
      const parsed = Linking.parse(url);
      const path = parsed.path || "";
      const queryParams = parsed.queryParams || {};

      let wordId: string | undefined;

      if (path.startsWith("word-story/")) {
        wordId = path.split("/")[1];
      } else if (path === "word-story" && typeof queryParams.wordId === "string") {
        wordId = queryParams.wordId;
      } else if (typeof queryParams.wordId === "string") {
        wordId = queryParams.wordId;
      }

      if (wordId) {
        const decodedWordId = decodeURIComponent(wordId);
        const word = wordsList.find(
          (w) =>
            w.id.toLowerCase() === decodedWordId.toLowerCase() ||
            w.word.toLowerCase() === decodedWordId.toLowerCase()
        );
        if (word) {
          setIsPlaying(true);
          showWordStory(word);
        }
      }
    } catch (e) {
      console.warn("Failed to parse deep link URL:", e);
    }
  };

  useEffect(() => {
    if (initialUrl) {
      const timer = setTimeout(() => {
        handleDeepLink(initialUrl);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [initialUrl]);

  useEffect(() => {
    const subscription = Linking.addEventListener("url", (event) => {
      handleDeepLink(event.url);
    });
    return () => subscription.remove();
  }, []);

  const handleTabPress = (tab: "game" | "library" | "graph" | "profile") => {
    setActiveTab(tab);
    if (isPlaying) setIsPlaying(false);
    if (showBlitz) setShowBlitz(false);
    if (showRandomGame) setShowRandomGame(false);
  };

  // ─── Render ───────────────────────────────────────────────────────────────

  const renderContent = () => {
    if (showOnboarding === null || authLoading) {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      );
    }

    if (showOnboarding) {
      return <OnboardingScreen onComplete={handleOnboardingComplete} />;
    }

    if (showBlitz) {
      return (
        <BlitzGame
          words={
            wordsDiscovered.length >= 3 ? wordsDiscovered : wordsList.slice(0, 10)
          }
          highScore={blitzRecord}
          onFinish={(score) => {
            updateBlitzRecord(score);
            incrementBlitzCount();
          }}
          onClose={() => setShowBlitz(false)}
        />
      );
    }

    if (showRandomGame) {
      return (
        <RandomGame
          words={wordsList}
          highScore={randomRecord}
          onFinish={(score) => {
            updateRandomRecord(score);
          }}
          onClose={() => setShowRandomGame(false)}
        />
      );
    }

    if (isPlaying) {
      if (phase === "story") {
        return (
          <StoryScreen
            word={currentWord}
            isBookmarked={
              !!bookmarkedWords.find((w) => w.id === currentWord.id)
            }
            onToggleBookmark={toggleBookmark}
            onContinue={handleNext}
            onBack={() => {
              setIsPlaying(false);
              resetGame(false);
            }}
            wordsList={wordsList}
          />
        );
      }
      return (
        <QuizScreen
          word={currentWord}
          selectedAnswer={selectedAnswer}
          isCorrect={isCorrect}
          comboMultiplier={1}
          streak={sessionStreak}
          onAnswer={handleAnswer}
          onExit={handleHome}
        />
      );
    }

    switch (activeTab) {
      case "game":
        return (
          <HomeScreen
            streak={streak}
            maxCombo={maxCombo}
            wordsDiscovered={wordsDiscovered}
            dailyWordsCount={dailyWordsCount}
            onStartDaily={handleStartDaily}
            onSelectWord={handleSelectWord}
            wordsList={wordsList}
          />
        );
      case "library":
        return (
          <LibraryScreen
            bookmarkedWords={bookmarkedWords}
            wordsDiscovered={wordsDiscovered}
            wordsList={wordsList}
            wordMastery={wordMastery}
            blitzRecord={blitzRecord}
            randomRecord={randomRecord}
            onSelectWord={handleSelectWord}
            onStartGame={handleStartSpecial}
            toggleBookmark={toggleBookmark}
            onUpdateMastery={updateWordMastery}
            activeSubTab={libraryTab}
            onSubTabChange={setLibraryTab}
          />
        );
      case "profile":
        return (
          <ProfileScreen
            streak={streak}
            maxCombo={maxCombo}
            wordsDiscovered={wordsDiscovered}
            bookmarkedWords={bookmarkedWords}
            onSelectWord={handleSelectWord}
            wordMastery={wordMastery}
            onResetOnboarding={async () => {
              await AsyncStorage.removeItem(ONBOARDING_KEY);
              setShowOnboarding(true);
            }}
            wordsList={wordsList}
            onExportBackup={exportBackup}
            onImportBackup={importBackup}
            onResetAllData={resetAllData}
          />
        );
      case "graph":
        return (
          <GraphScreen 
            wordsDiscovered={wordsDiscovered} 
            onSelectWord={handleSelectWord}
            wordsList={wordsList}
          />
        );
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar barStyle={isDark ? "light-content" : "dark-content"} />

      {/* Header can now stay fixed for most tabs or we can show it conditionally */}
      {!isPlaying &&
        !showBlitz &&
        !showRandomGame &&
        activeTab === "game" &&
        !showOnboarding &&
        session && (
          <Header
            streak={streak}
            wordsDiscoveredCount={wordsDiscovered.length}
          />
        )}

      <View style={[styles.content, { backgroundColor: colors.background }]}>
        {renderContent()}
      </View>

      {session && !showOnboarding && (
        <BottomNav activeTab={activeTab} onTabPress={handleTabPress} />
      )}

      {/* ─── Badge unlock modal ────────────────────────────────────────────── */}
      <Modal
        visible={!!newBadge}
        transparent={true}
        animationType="fade"
        onRequestClose={clearNewBadge}
      >
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.badgeModal,
              {
                backgroundColor: colors.surface,
                borderColor: colors.gold,
              },
            ]}
          >
            <View
              style={[
                styles.badgeIconBg,
                { backgroundColor: colors.gold + "20" },
              ]}
            >
              {newBadge?.id === "novizio" ? (
                <Feather name="award" size={40} color={colors.goldDark} />
              ) : newBadge?.id === "archeologo" ? (
                <Feather name="compass" size={40} color={colors.goldDark} />
              ) : newBadge?.id === "guerriero" ? (
                <Feather name="shield" size={40} color={colors.goldDark} />
              ) : (
                <Feather name="award" size={40} color={colors.goldDark} />
              )}
            </View>
            <Text style={[styles.badgeTitle, { color: colors.primary }]}>
              Nuovo Traguardo!
            </Text>
            <Text style={[styles.badgeName, { color: colors.goldDark }]}>
              {newBadge?.name}
            </Text>
            <Text style={[styles.badgeDesc, { color: colors.textSecondary }]}>
              Complimenti! Hai dimostrato grande costanza ed esplorato
              profondamente le radici del nostro linguaggio.
            </Text>
            <TouchableOpacity
              style={[styles.closeBtn, { backgroundColor: colors.gold }]}
              onPress={clearNewBadge}
            >
              <Text style={styles.closeBtnText}>{"Continua l'esplorazione"}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

export default function App() {
  return <AppContent />;
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1 },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.7)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.xl,
  },
  badgeModal: {
    width: "100%",
    borderRadius: RADIUS.xl,
    borderWidth: 2,
    padding: SPACING.xl,
    alignItems: "center",
    gap: SPACING.md,
    ...SHADOWS.lg,
  },
  badgeIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: SPACING.sm,
  },
  badgeEmoji: { fontSize: 50 },
  badgeTitle: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
  },
  badgeName: {
    fontFamily: FONTS.sans,
    fontSize: 18,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  badgeDesc: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    paddingHorizontal: SPACING.md,
  },
  closeBtn: {
    marginTop: SPACING.lg,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    width: "100%",
    alignItems: "center",
    ...SHADOWS.md,
  },
  closeBtnText: {
    color: "#322214",
    fontFamily: FONTS.sans,
    fontSize: 16,
    fontWeight: "700",
  },
});
