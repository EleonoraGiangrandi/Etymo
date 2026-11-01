import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { WordEntry, WORDS } from "@/constants/words";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  streak: number;
  maxCombo: number;
  wordsDiscovered: WordEntry[];
  dailyWordsCount: number;
  onStartDaily: () => void;
  onSelectWord: (word: WordEntry) => void;
  wordsList?: WordEntry[];
};

const QUOTES = [
  {
    text: "Il cambiamento è anche nelle parole, nella costruzione delle frasi, nella sintassi. Tutto passa attraverso il linguaggio.",
    author: "G. Casaleggio",
  },
  {
    text: "Il linguaggio, prima di significare qualcosa, significa per qualcuno.",
    author: "J. Lacan",
  },
  {
    text: "Il linguaggio è l'abbigliamento nel quale i tuoi pensieri sfilano in pubblico. Non vestirli mai con abiti volgari o scadenti.",
    author: "G. W. Crane",
  },
  {
    text: "Il linguaggio e l'immaginazione non possono essere imprigionati.",
    author: "S. Rushdie",
  },
  {
    text: "Il linguaggio è la casa della verità dell'essere.",
    author: "M. Heidegger",
  },
  {
    text: "Senza linguaggio non esiste conoscenza.",
    author: "G. Carofiglio",
  },
  {
    text: "C'è qualcosa di più bello per un popolo che la lingua dei suoi avi?",
    author: "J. G. von Herder",
  },
  {
    text: "Un nuovo vocabolo è come un seme fresco gettato nel terreno della discussione.",
    author: "L. Wittgenstein",
  },
  {
    text: "I limiti del mio linguaggio sono i confini del mio pensiero. Tutto ciò che io conosco è ciò per cui ho delle parole.",
    author: "L. Wittgenstein",
  },
  {
    text: "Il primo passo non ti porta dove vuoi, ma ti toglie da dove sei.",
    author: "A. Jodorowsky",
  }
];

export default function HomeScreen({
  streak,
  maxCombo,
  wordsDiscovered,
  dailyWordsCount,
  onStartDaily,
  onSelectWord,
  wordsList,
}: Props) {
  const { colors, isDark } = useTheme();
  const { user } = useAuth();
  const userName = user?.user_metadata?.full_name || "Studioso";
  const recentDiscoveries = wordsDiscovered.slice(0, 3);

  // ── Search with debounce ──────────────────────────────────────────────────
  // Without debounce, every keystroke triggered a full filter over 200+ words.
  const [searchQuery, setSearchQuery] = React.useState("");
  const [debouncedQuery, setDebouncedQuery] = React.useState("");
  const [showResults, setShowResults] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 280); // ~3 frames at 60fps — feels instant but batches rapid typing
    return () => clearTimeout(timer);
  }, [searchQuery]);

  const filteredWords = React.useMemo(() => {
    if (debouncedQuery.trim().length < 1) return [];
    const q = debouncedQuery.toLowerCase();
    const list = wordsList || WORDS;
    return list.filter((w) => w.word.toLowerCase().includes(q)).slice(0, 8);
  }, [debouncedQuery, wordsList]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setShowResults(query.trim().length > 0);
  };

  const handleSelectSearchResult = (word: WordEntry) => {
    setSearchQuery("");
    setDebouncedQuery("");
    setShowResults(false);
    onSelectWord(word);
  };

  const quote = React.useMemo(() => {
    return QUOTES[Math.floor(Math.random() * QUOTES.length)];
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Buongiorno";
    if (hour >= 12 && hour < 18) return "Buon pomeriggio";
    if (hour >= 18 && hour < 22) return "Buonasera";
    return "Buonanotte";
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View
          style={[
            styles.searchBar,
            {
              backgroundColor: colors.surface,
              borderColor: showResults ? colors.gold : colors.borderLight,
            },
          ]}
        >
          <Image
            source={require("@/assets/images/lens-icon.png")}
            style={styles.searchIconImage}
          />
          <TextInput
            style={[styles.searchInput, { color: colors.primary }]}
            placeholder="Cerca un'etimologia..."
            placeholderTextColor={colors.textTertiary}
            value={searchQuery}
            onChangeText={handleSearch}
            autoCapitalize="none"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch("")}>
              <Text style={[styles.clearIcon, { color: colors.textTertiary }]}>
                ✕
              </Text>
            </TouchableOpacity>
          )}
        </View>

        {showResults && (
          <View
            style={[
              styles.resultsDropdown,
              {
                backgroundColor: colors.surface,
                borderColor: colors.borderLight,
              },
            ]}
          >
            {filteredWords.length > 0 ? (
              filteredWords.map((word) => (
                <TouchableOpacity
                  key={word.id}
                  style={[
                    styles.resultItem,
                    { borderBottomColor: colors.borderLight },
                  ]}
                  onPress={() => handleSelectSearchResult(word)}
                >
                  <View>
                    <Text
                      style={[styles.resultWord, { color: colors.primary }]}
                    >
                      {word.word}
                    </Text>
                    <Text
                      style={[
                        styles.resultCategory,
                        { color: colors.textTertiary },
                      ]}
                    >
                      {word.category}
                    </Text>
                  </View>
                  <Text
                    style={[styles.resultArrow, { color: colors.textTertiary }]}
                  >
                    ›
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              // Only show "not found" once the debounce has settled
              debouncedQuery.trim().length > 0 && (
                <View style={styles.noResult}>
                  <Text style={[styles.noResultText, { color: colors.error }]}>
                    Parola non disponibile
                  </Text>
                  <Text
                    style={[styles.noResultSub, { color: colors.textTertiary }]}
                  >
                    Prova con un{"'"}altra parola o esplora il grafico.
                  </Text>
                </View>
              )
            )}
          </View>
        )}
      </View>

      {/* Hero greeting */}
      <View style={styles.hero}>
        {dailyWordsCount > 0 && (
          <View style={[styles.dailyBadge, { backgroundColor: colors.gold + "15", borderColor: colors.gold }]}>
            <Text style={[styles.dailyBadgeLabel, { color: colors.textTertiary }]}>Oggi:</Text>
            <Text style={[styles.dailyBadgeValue, { color: colors.goldDark }]}>{dailyWordsCount}</Text>
          </View>
        )}
        <Image
          source={require("@/assets/images/mascotte.png")}
          style={styles.heroMascotte}
        />
        <Text
          numberOfLines={1}
          adjustsFontSizeToFit
          minimumFontScale={0.7}
          style={[styles.heroTitle, { color: colors.primary }]}
        >
          {getGreeting()}, {userName}
        </Text>
        <Text style={[styles.heroSub, { color: colors.textSecondary }]}>
          Ogni parola nasconde un segreto. Scoprilo.
        </Text>
      </View>

      {/* CTA Button */}
      <TouchableOpacity
        style={[
          styles.ctaBtn,
          { backgroundColor: colors.gold, borderColor: colors.goldDark },
        ]}
        onPress={onStartDaily}
        activeOpacity={0.85}
      >
        <View style={styles.ctaInner}>
          <Text
            style={[styles.ctaIcon, { color: isDark ? "#1A1A1A" : "#322214" }]}
          >
            ▶
          </Text>
          <View>
            <Text
              style={[
                styles.ctaTitle,
                { color: isDark ? "#1A1A1A" : "#322214" },
              ]}
            >
              Impara una nuova parola
            </Text>
            <Text
              style={[
                styles.ctaSub,
                { color: isDark ? "rgba(0,0,0,0.6)" : "rgba(50,34,20,0.6)" },
              ]}
            >
              Inizia la sessione
            </Text>
          </View>
        </View>
      </TouchableOpacity>

      {/* Bottom quote */}
      <View
        style={[
          styles.quoteBox,
          {
            borderLeftColor: colors.goldDark,
            backgroundColor: isDark
              ? "rgba(255,255,255,0.05)"
              : "rgba(50,34,20,0.04)",
          },
        ]}
      >
        <Text style={[styles.quoteText, { color: colors.textSecondary }]}>
          {'"'}
          {quote.text}
          {'"'}
        </Text>
        <Text style={[styles.quoteAuthor, { color: colors.textTertiary }]}>
          — {quote.author}
        </Text>
      </View>

      {/* Stats row */}
      <View style={styles.statsRow}>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {streak}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
            Giorni di fila
          </Text>
          <Text style={styles.statEmoji}>🔥</Text>
        </View>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {wordsDiscovered.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
            Parole Scoperte
          </Text>
          <Text style={styles.statEmoji}>💡</Text>
        </View>
        <View
          style={[
            styles.statCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.statValue, { color: colors.primary }]}>
            {maxCombo}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
            Parole Corrette Consecutive
          </Text>
          <Text style={styles.statEmoji}>🏆</Text>
        </View>
      </View>

      {/* Recent discoveries */}
      <View
        style={[
          styles.section,
          { backgroundColor: colors.surface, borderColor: colors.borderLight },
        ]}
      >
        <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>
          Ultime Scoperte
        </Text>
        {recentDiscoveries.length > 0 ? (
          recentDiscoveries.map((word, i) => (
            <TouchableOpacity
              key={i}
              style={[styles.wordRow, { borderTopColor: colors.borderLight }]}
              onPress={() => onSelectWord(word)}
              activeOpacity={0.6}
            >
              <View
                style={[styles.wordDot, { backgroundColor: colors.goldDark }]}
              />
              <Text style={[styles.wordText, { color: colors.primary }]}>
                {word.word}
              </Text>
              <Text style={[styles.wordArrow, { color: colors.textTertiary }]}>
                ›
              </Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text
            style={[
              styles.wordText,
              {
                color: colors.primary,
                opacity: 0.5,
                fontStyle: "italic",
                paddingVertical: 10,
              },
            ]}
          >
            Inizia ad esplorare per scoprire nuove parole!
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: SPACING.lg,
    paddingBottom: SPACING.xxl,
    gap: SPACING.md,
  },
  hero: {
    alignItems: "center",
    paddingVertical: SPACING.md,
    gap: SPACING.xs,
  },
  heroMascotte: {
    width: 350,
    height: 350,
    resizeMode: "contain",
    marginTop: -SPACING.md,
    marginBottom: SPACING.md,
  },
  heroTitle: {
    fontFamily: FONTS.serif,
    fontSize: 28,
    fontWeight: "800",
    textAlign: "center",
    width: "100%",
    paddingHorizontal: SPACING.sm,
  },
  heroSub: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    textAlign: "center",
    fontStyle: "italic",
  },
  statsRow: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  statCard: {
    flex: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    alignItems: "center",
    borderWidth: 1,
    gap: 2,
    ...SHADOWS.sm,
  },
  statValue: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: "800",
  },
  statLabel: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    textAlign: "center",
  },
  statEmoji: {
    fontSize: 16,
  },
  ctaBtn: {
    borderRadius: RADIUS.full,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 2,
    ...SHADOWS.md,
  },
  ctaInner: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  ctaIcon: {
    fontSize: 20,
  },
  ctaTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: "800",
  },
  ctaSub: {
    fontFamily: FONTS.sans,
    fontSize: 12,
  },
  section: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    borderWidth: 1,
    gap: SPACING.xs,
    ...SHADOWS.sm,
  },
  sectionTitle: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    marginBottom: SPACING.xs,
  },
  wordRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.sm,
    borderTopWidth: 1,
    gap: SPACING.sm,
  },
  wordDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  wordText: {
    flex: 1,
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: "700",
  },
  wordArrow: {
    fontFamily: FONTS.serif,
    fontSize: 20,
  },
  quoteBox: {
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    borderLeftWidth: 3,
    gap: SPACING.xs,
  },
  quoteText: {
    fontFamily: FONTS.serif,
    fontSize: 14,
    fontStyle: "italic",
    lineHeight: 22,
  },
  quoteAuthor: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "600",
    textAlign: "right",
  },
  searchContainer: {
    zIndex: 10,
    marginBottom: SPACING.xs,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    paddingHorizontal: SPACING.md,
    gap: SPACING.sm,
    ...SHADOWS.md,
  },
  searchIconImage: {
    width: 20,
    height: 20,
    resizeMode: "contain",
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 16,
  },
  clearIcon: {
    fontSize: 18,
    padding: 4,
  },
  resultsDropdown: {
    position: "absolute",
    top: 60,
    left: 0,
    right: 0,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.sm,
    maxHeight: 300,
    ...SHADOWS.md,
    zIndex: 20,
  },
  resultItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderBottomWidth: 1,
  },
  resultWord: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: "700",
  },
  resultCategory: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
    marginTop: 2,
  },
  resultArrow: {
    fontSize: 20,
    fontFamily: FONTS.serif,
  },
  noResult: {
    padding: SPACING.lg,
    alignItems: "center",
    gap: 4,
  },
  noResultText: {
    fontFamily: FONTS.sans,
    fontSize: 16,
    fontWeight: "700",
  },
  noResultSub: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    textAlign: "center",
  },
  dailyBadge: {
    position: "absolute",
    top: 0,
    right: 0,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    zIndex: 5,
  },
  dailyBadgeLabel: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  dailyBadgeValue: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: "800",
  },
});