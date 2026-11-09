import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./supabase";
import { WORDS, WordEntry } from "@/constants/words";
import { buildOptimizedGraph } from "./graph-engine";

const WORDS_CACHE_KEY = "@etymo_words_cache_v4";
const LEGACY_CACHE_KEYS = [
  "@etymo_dynamic_words_cache",
  "@etymo_words_cache_v2",
  "@etymo_words_cache_v3",
];

/**
 * Normalizza la categoria per assicurare la versione italiana canonica
 */
function normalizeCategory(category: any): any {
  const map: Record<string, string> = {
    society: "societa",
    food: "cucina",
    body: "corpo",
    nature: "natura",
    religion: "religione",
    history: "storia",
    science: "scienza",
    art: "arte",
    tech: "tecnologia",
    travel: "viaggio",
    objects: "oggetti",
    war: "guerra",
    trade: "commercio",
  };
  return map[category] || category || "societa";
}

/**
 * Maps database snake_case columns back to camelCase WordEntry structure
 */
function mapDbToWordEntry(dbWord: any): WordEntry {
  return {
    id: dbWord.id,
    word: dbWord.word,
    correctAnswer: dbWord.correct_answer,
    options: dbWord.options as [string, string, string],
    story: dbWord.story,
    shortEtymology: dbWord.short_etymology,
    category: normalizeCategory(dbWord.category),
    relatedWords: dbWord.related_words || [],
    difficulty: dbWord.difficulty as 1 | 2 | 3,
  };
}

/**
 * Pulisce vecchie cache non sincronizzate con il dataset attuale
 */
async function cleanupLegacyCaches() {
  try {
    await AsyncStorage.multiRemove(LEGACY_CACHE_KEYS);
  } catch {}
}

/**
 * Returns cached words from AsyncStorage, falling back to static WORDS.
 * Garantisce che WORDS sia sempre la fonte primaria di verità se la cache è obsoleta.
 */
export async function getCachedWords(): Promise<WordEntry[]> {
  try {
    cleanupLegacyCaches().catch(() => {});

    const cached = await AsyncStorage.getItem(WORDS_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length >= WORDS.length) {
        // Verifica che contenga TUTTE le parole locali attuali
        const parsedIds = new Set(parsed.map((p: any) => p?.id));
        const hasAllLocalWords = WORDS.every((w) => parsedIds.has(w.id));
        if (hasAllLocalWords) {
          return buildOptimizedGraph(parsed);
        } else {
          // Cache non allineata o incompleta: rimuovila
          AsyncStorage.removeItem(WORDS_CACHE_KEY).catch(() => {});
        }
      }
    }
  } catch (e) {
    console.warn("[WordsDB] Error reading cached words:", e);
  }
  return WORDS; // Fallback alla lista statica compilata e verificata
}

/**
 * Fetches latest words from Supabase and caches them in AsyncStorage.
 * Accetta l'aggiornamento solo se contiene un dataset valido e completo con tutte le parole locali.
 */
export async function syncWordsFromDb(): Promise<WordEntry[] | null> {
  try {
    console.log("[WordsDB] Syncing words from Supabase database...");
    const { data, error } = await supabase
      .from("words")
      .select("*")
      .order("id", { ascending: true });

    if (error) {
      console.warn("[WordsDB] Failed to fetch words from database:", error.message);
      return null;
    }

    if (data && data.length > 0) {
      const mappedWords = data.map(mapDbToWordEntry);
      const remoteIds = new Set(mappedWords.map((w) => w.id));

      // Verifica che il database remoto contenga tutte le parole del dataset curato locale
      const missingCount = WORDS.filter((w) => !remoteIds.has(w.id)).length;
      if (missingCount > 0) {
        console.log(
          `[WordsDB] Remote words lack local curated entries (${missingCount} missing). Keeping local WORDS as source of truth.`
        );
        return null;
      }

      if (mappedWords.length >= WORDS.length) {
        const connectedWords = buildOptimizedGraph(mappedWords);
        await AsyncStorage.setItem(WORDS_CACHE_KEY, JSON.stringify(connectedWords));
        console.log(`[WordsDB] Successfully synchronized and connected ${connectedWords.length} words.`);
        return connectedWords;
      }
    }
  } catch (e) {
    console.warn("[WordsDB] Exception syncing words from database:", e);
  }
  return null;
}
