import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "./supabase";
import { WORDS, WordEntry } from "@/constants/words";
import { buildOptimizedGraph } from "./graph-engine";

const WORDS_CACHE_KEY = "@etymo_dynamic_words_cache";

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
 * Returns cached words from AsyncStorage, falling back to static WORDS
 */
export async function getCachedWords(): Promise<WordEntry[]> {
  try {
    const cached = await AsyncStorage.getItem(WORDS_CACHE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (Array.isArray(parsed) && parsed.length > 0) {
        // Garantisce che il grafo sia sempre integro e collegato
        return buildOptimizedGraph(parsed);
      }
    }
  } catch (e) {
    console.warn("[WordsDB] Error reading cached words:", e);
  }
  return WORDS; // Fallback to compiled static list
}

/**
 * Fetches latest words from Supabase and caches them in AsyncStorage
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
      // Auto-collega dinamicamente le nuove parole al grafo
      const connectedWords = buildOptimizedGraph(mappedWords);
      await AsyncStorage.setItem(WORDS_CACHE_KEY, JSON.stringify(connectedWords));
      console.log(`[WordsDB] Successfully synchronized and connected ${connectedWords.length} words.`);
      return connectedWords;
    }
  } catch (e) {
    console.warn("[WordsDB] Exception syncing words from database:", e);
  }
  return null;
}
