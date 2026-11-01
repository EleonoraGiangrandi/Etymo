import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { WORDS, WordEntry, getCategoryColor } from "@/constants/words";
import { useTheme } from "@/context/theme-context";
import React, { useMemo } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  word: WordEntry;
  isBookmarked: boolean;
  onToggleBookmark: (word: WordEntry) => void;
  onContinue: (relatedWordId?: string) => void;
  wordsList?: WordEntry[];
  onBack?: () => void;
};

export default function StoryScreen({
  word,
  isBookmarked,
  onToggleBookmark,
  onContinue,
  wordsList,
}: Props) {
  const { colors, isDark } = useTheme();
  const categoryColor = getCategoryColor(word.category);

  // Resolve all related word display names once per word change
  const resolvedRelated = useMemo(() => {
    const list = wordsList || WORDS;
    const wordById = new Map(list.map((w) => [w.id.toLowerCase(), w]));
    const wordByName = new Map(list.map((w) => [w.word.toLowerCase(), w]));

    function resolveRelatedWord(id: string): { display: string; found: boolean } {
      const lower = id.toLowerCase();
      const entry = wordById.get(lower) ?? wordByName.get(lower);
      if (entry) return { display: entry.word, found: true };
      // Fallback: capitalise first letter of each word in the id
      const display = id
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .split(/[-_\s]+/)
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
      return { display, found: false };
    }

    return word.relatedWords.map((id) => ({ id, ...resolveRelatedWord(id) }));
  }, [word.relatedWords, wordsList]);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <Image
        source={require("@/assets/images/lens.png")}
        style={styles.lensDecoration}
        resizeMode="contain"
      />
      <View style={styles.header}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: categoryColor + "30" },
          ]}
        >
          <Text style={[styles.categoryText, { color: categoryColor }]}>
            {word.category.toUpperCase()}
          </Text>
        </View>
        <View style={styles.titleRow}>
          <Text style={[styles.wordTitle, { color: colors.primary }]}>
            {word.word}
          </Text>
          <TouchableOpacity
            onPress={() => onToggleBookmark(word)}
            style={[
              styles.bookmarkBtn,
              {
                backgroundColor: isBookmarked ? colors.gold : colors.surface,
                borderColor: colors.gold,
              },
            ]}
          >
            <Text
              style={[
                styles.bookmarkIcon,
                { color: isBookmarked ? "#fff" : colors.gold },
              ]}
            >
              {isBookmarked ? "★" : "☆"}
            </Text>
          </TouchableOpacity>
        </View>
        <Text style={[styles.etymology, { color: colors.textTertiary }]}>
          {word.shortEtymology}
        </Text>
      </View>

      <View
        style={[
          styles.storyCard,
          { backgroundColor: colors.surface, borderColor: colors.borderLight },
        ]}
      >
        <Text style={[styles.storyTitle, { color: colors.goldDark }]}>
          La Storia
        </Text>
        <Text style={[styles.storyText, { color: colors.primary }]}>
          {word.story}
        </Text>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity
          style={[styles.continueBtn, { backgroundColor: colors.primary }]}
          onPress={() => onContinue()}
          activeOpacity={0.8}
        >
          <Text
            style={[
              styles.continueBtnText,
              { color: isDark ? "#1A1A1A" : colors.background },
            ]}
          >
            Prossima parola
          </Text>
        </TouchableOpacity>
      </View>

      {resolvedRelated.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>
            Esplora connessioni
          </Text>
          <View style={styles.relatedContainer}>
            {resolvedRelated.map(({ id, display }) => (
              <TouchableOpacity
                key={id}
                style={[
                  styles.relatedChip,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => onContinue(id)}
              >
                <Text style={[styles.relatedText, { color: colors.primary }]}>
                  {display}
                </Text>
                <Text style={[styles.relatedArrow, { color: colors.goldDark }]}>
                  →
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      )}
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
    paddingBottom: SPACING.xxl * 2,
  },
  header: {
    alignItems: "center",
    gap: SPACING.xs,
    paddingTop: SPACING.md,
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
  },
  categoryText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  wordTitle: {
    fontFamily: FONTS.serif,
    fontSize: 36,
    fontWeight: "800",
  },
  bookmarkBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 4,
  },
  bookmarkIcon: {
    fontSize: 20,
    fontWeight: "700",
  },
  etymology: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontStyle: "italic",
  },
  storyCard: {
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    borderWidth: 1,
    ...SHADOWS.md,
  },
  storyTitle: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: "700",
    marginBottom: SPACING.md,
  },
  storyText: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    lineHeight: 28,
  },
  section: {
    gap: SPACING.md,
  },
  sectionTitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  relatedContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  relatedChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    gap: 8,
  },
  relatedText: {
    fontFamily: FONTS.serif,
    fontSize: 14,
    fontWeight: "600",
  },
  relatedArrow: {
    fontSize: 14,
  },
  actions: {
    flexDirection: "row",
    gap: SPACING.md,
    marginTop: SPACING.lg,
  },
  continueBtn: {
    flex: 1,
    height: 56,
    borderRadius: RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.sm,
  },
  continueBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: "700",
  },
  lensDecoration: {
    position: "absolute",
    top: -10,
    left: -40,
    width: 150,
    height: 150,
    opacity: 1,
    transform: [{ rotate: "50deg" }],
    zIndex: -1,
  },
});
