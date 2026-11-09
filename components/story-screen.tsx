import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { WORDS, WordEntry, getCategoryColor, getCategoryLabel } from "@/constants/words";
import { calculateWordAffinity } from "@/lib/graph-engine";
import { useTheme } from "@/context/theme-context";
import { Feather } from "@expo/vector-icons";
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
  onBack,
}: Props) {
  const { colors, isDark } = useTheme();
  const categoryColor = getCategoryColor(word.category);

  // Risolve le parole collegate e arricchisce con la motivazione del legame
  const resolvedRelated = useMemo(() => {
    const list = wordsList || WORDS;
    const wordById = new Map(list.map((w) => [w.id.toLowerCase(), w]));
    const wordByName = new Map(list.map((w) => [w.word.toLowerCase(), w]));

    function resolveRelatedWord(id: string): { display: string; found: boolean; reason?: string } {
      const lower = id.toLowerCase();
      const entry = wordById.get(lower) ?? wordByName.get(lower);
      if (entry) {
        const affinity = calculateWordAffinity(word, entry);
        return { display: entry.word, found: true, reason: affinity?.reason };
      }
      const display = id
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .split(/[-_\s]+/)
        .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
        .join(" ");
      return { display, found: false };
    }

    const resolved = (word.relatedWords || []).map((id) => ({ id, ...resolveRelatedWord(id) }));

    // Mescola in ordine casuale (Fisher-Yates)
    const shuffled = [...resolved];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    // Mostra un numero contenuto di collegamenti (3 o 4)
    return shuffled.slice(0, Math.min(shuffled.length, 4));
  }, [word.id, wordsList]);

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
      {onBack && (
        <View style={styles.topNavBar}>
          <View style={{ flex: 1 }} />
          <TouchableOpacity
            style={[
              styles.exitBtn,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
            ]}
            onPress={onBack}
            activeOpacity={0.8}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Chiudi"
            accessibilityRole="button"
          >
            <Text style={[styles.exitBtnText, { color: colors.textTertiary }]}>✕</Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={styles.header}>
        <View
          style={[
            styles.categoryBadge,
            { backgroundColor: categoryColor + "30" },
          ]}
        >
          <Text style={[styles.categoryText, { color: categoryColor }]}>
            {getCategoryLabel(word.category).toUpperCase()}
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
                backgroundColor: isBookmarked ? `${colors.gold}20` : colors.surface,
                borderColor: isBookmarked ? colors.gold : colors.borderLight,
              },
            ]}
          >
            <Image
              source={require("@/assets/images/star-icon.png")}
              style={[
                styles.starIconImage,
                !isBookmarked && { opacity: 0.35 },
              ]}
              resizeMode="contain"
            />
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
            Prossima parola collegata →
          </Text>
        </TouchableOpacity>
      </View>

      {resolvedRelated.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>
              Esplora connessioni
            </Text>
            <View style={styles.sectionSubtitleRow}>
              <Feather name="link-2" size={13} color={colors.goldDark} />
              <Text style={[styles.sectionSubtitle, { color: colors.goldDark }]}>
                Percorsi collegati
              </Text>
            </View>
          </View>
          <View style={styles.relatedContainer}>
            {resolvedRelated.map(({ id, display, reason }) => (
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
                <View style={styles.relatedChipTextCol}>
                  <View style={styles.relatedWordRow}>
                    <Text style={[styles.relatedText, { color: colors.primary }]}>
                      {display}
                    </Text>
                    <Text style={[styles.relatedArrow, { color: colors.goldDark }]}>
                      →
                    </Text>
                  </View>
                  {reason && (
                    <Text
                      style={[styles.relatedReason, { color: colors.textTertiary }]}
                      numberOfLines={1}
                    >
                      {reason}
                    </Text>
                  )}
                </View>
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
  topNavBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    zIndex: 10,
    marginBottom: -SPACING.md,
  },
  exitBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  exitBtnText: {
    fontSize: 14,
    fontWeight: "700",
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
  starIconImage: {
    width: 20,
    height: 20,
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
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  sectionTitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  sectionSubtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  sectionSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "600",
  },
  relatedContainer: {
    flexDirection: "column",
    gap: SPACING.sm,
  },
  relatedChip: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    borderWidth: 1,
  },
  relatedChipTextCol: {
    flex: 1,
    gap: 4,
  },
  relatedWordRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  relatedText: {
    fontFamily: FONTS.serif,
    fontSize: 15,
    fontWeight: "700",
  },
  relatedArrow: {
    fontSize: 16,
    fontWeight: "700",
  },
  relatedReason: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontStyle: "italic",
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
