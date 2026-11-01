import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { WordEntry } from "@/constants/words";
import { useTheme } from "@/context/theme-context";
import React from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  bookmarkedWords: WordEntry[];
  wordsDiscovered: WordEntry[];
  onSelectWord: (word: WordEntry) => void;
  onStartGame: (mode: "bookmarks" | "random" | "blitz") => void;
};

export default function LibraryScreen({
  bookmarkedWords,
  wordsDiscovered,
  onSelectWord,
  onStartGame,
}: Props) {
  const { colors, isDark } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>La tua Biblioteca</Text>
        <Text style={[styles.subtitle, { color: colors.textTertiary }]}>
          Ripassa le parole che ti hanno affascinato
        </Text>
      </View>

      {/* Minigames Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>Minigiochi di Ripasso</Text>
        <View style={styles.gamesGrid}>
          <TouchableOpacity 
            style={[styles.gameCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
            onPress={() => onStartGame("bookmarks")}
            disabled={bookmarkedWords.length < 2}
          >
            <Text style={styles.gameIcon}>📚</Text>
            <Text style={[styles.gameTitle, { color: colors.primary }]}>Quiz Preferiti</Text>
            <Text style={[styles.gameSub, { color: colors.textTertiary }]}>
              {bookmarkedWords.length < 2 
                ? "Salva almeno 2 parole" 
                : `${bookmarkedWords.length} parole pronte`}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.gameCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
            onPress={() => onStartGame("random")}
          >
            <Text style={styles.gameIcon}>🎲</Text>
            <Text style={[styles.gameTitle, { color: colors.primary }]}>Sfida Casuale</Text>
            <Text style={[styles.gameSub, { color: colors.textTertiary }]}>Tutto il dizionario</Text>
          </TouchableOpacity>
        </View>

        {/* Arcade Blitz */}
        <View style={[styles.arcadeSection, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <View style={styles.arcadeHeader}>
            <Text style={[styles.arcadeTitle, { color: colors.primary }]}>Etymo Arcade</Text>
          </View>
          
          <View style={styles.arcadeRow}>
            <TouchableOpacity 
              style={[styles.arcadeBtn, { backgroundColor: colors.primary }]}
              onPress={() => onStartGame("blitz")}
            >
              <Text style={[styles.arcadeBtnText, { color: colors.background }]}>GIOCO BLITZ</Text>
              <Text style={[styles.arcadeBtnSub, { color: colors.background }]}>Sfida il tempo e metti alla prova la tua velocità</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bookmarks Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>Parole Salvate</Text>
          <Text style={[styles.count, { color: colors.goldDark }]}>{bookmarkedWords.length}</Text>
        </View>

        {bookmarkedWords.length > 0 ? (
          <View style={styles.bookmarksList}>
            {bookmarkedWords.map((word) => (
              <TouchableOpacity
                key={word.id}
                style={[
                  styles.bookmarkItem,
                  { backgroundColor: colors.surface, borderColor: colors.borderLight },
                ]}
                onPress={() => onSelectWord(word)}
              >
                <View style={styles.wordInfo}>
                  <Text style={[styles.wordName, { color: colors.primary }]}>{word.word}</Text>
                  <Text style={[styles.wordEtym, { color: colors.textTertiary }]} numberOfLines={1}>
                    {word.shortEtymology}
                  </Text>
                </View>
                <Text style={[styles.wordArrow, { color: colors.gold }]}>›</Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <View style={[styles.emptyContainer, { backgroundColor: colors.surface }]}>
            <Image 
              source={require("@/assets/images/book.png")} 
              style={styles.emptyIcon} 
            />
            <Text style={[styles.emptyText, { color: colors.primary }]}>
              Non hai ancora salvato nessuna parola
            </Text>
            <Text style={[styles.emptySub, { color: colors.textTertiary }]}>
              Usa il tasto stella durante le tue scoperte per aggiungerle qui.
            </Text>
          </View>
        )}
      </View>

      {/* Discovered Collection Section */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>Collezione Parole Scoperte</Text>
          <Text style={[styles.count, { color: colors.goldDark }]}>{wordsDiscovered.length}</Text>
        </View>

        {wordsDiscovered.length > 0 ? (
          <View style={styles.discoveryList}>
            {wordsDiscovered.map((word) => (
              <TouchableOpacity
                key={word.id}
                style={[
                  styles.discoveryItem,
                  { borderBottomColor: colors.borderLight },
                ]}
                onPress={() => onSelectWord(word)}
              >
                <Text style={[styles.discoveryWord, { color: colors.primary }]}>{word.word}</Text>
                <Text style={[styles.discoveryCat, { color: colors.textTertiary, backgroundColor: colors.borderLight }]}>
                  {word.category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ) : (
          <Text style={[styles.emptyTextSimple, { color: colors.textTertiary }]}>
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
    gap: SPACING.xl,
    paddingBottom: 40,
  },
  header: {
    marginTop: SPACING.md,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    marginTop: 4,
  },
  section: {
    gap: SPACING.md,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1.2,
  },
  count: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: "700",
  },
  gamesGrid: {
    flexDirection: "row",
    gap: SPACING.md,
  },
  gameCard: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    gap: 4,
    ...SHADOWS.sm,
  },
  gameIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  gameTitle: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: "700",
  },
  gameSub: {
    fontFamily: FONTS.sans,
    fontSize: 10,
  },
  bookmarksList: {
    gap: SPACING.sm,
  },
  bookmarkItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    justifyContent: "space-between",
    ...SHADOWS.sm,
  },
  wordInfo: {
    flex: 1,
    gap: 2,
  },
  wordName: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: "700",
  },
  wordEtym: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontStyle: "italic",
  },
  wordArrow: {
    fontSize: 24,
    fontFamily: FONTS.serif,
    marginLeft: SPACING.sm,
  },
  emptyContainer: {
    padding: SPACING.xxl,
    borderRadius: RADIUS.lg,
    alignItems: "center",
    gap: SPACING.sm,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#ccc",
  },
  emptyIcon: {
    width: 60,
    height: 60,
    opacity: 0.3,
    marginBottom: SPACING.sm,
  },
  emptyText: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
  emptySub: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    textAlign: "center",
    lineHeight: 18,
  },
  arcadeSection: {
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    gap: SPACING.md,
    ...SHADOWS.sm,
    marginTop: SPACING.sm,
  },
  arcadeHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arcadeTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: "800",
  },
  energyContainer: {
    flexDirection: "row",
    gap: 4,
  },
  energyIcon: {
    fontSize: 18,
  },
  arcadeRow: {
    flexDirection: "row",
    gap: SPACING.md,
    alignItems: "center",
  },
  arcadeBtn: {
    flex: 1,
    padding: SPACING.md,
    borderRadius: RADIUS.md,
    alignItems: "center",
    ...SHADOWS.sm,
  },
  arcadeBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: "800",
  },
  arcadeBtnSub: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    opacity: 0.8,
  },
  refillBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 8,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignItems: "center",
  },
  refillText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "800",
  },
  refillSub: {
    fontFamily: FONTS.sans,
    fontSize: 10,
  },
  discoveryList: {
    gap: 0,
  },
  discoveryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: SPACING.md,
    borderBottomWidth: 1,
  },
  discoveryWord: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: "700",
  },
  discoveryCat: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    textTransform: "uppercase",
  },
  emptyTextSimple: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 10,
  },
});
