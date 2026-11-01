import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import {
  WordEntry,
  getCategoryColor,
  getCategoryLabel,
} from "@/constants/words";
import { useTheme } from "@/context/theme-context";
import React from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Props = {
  word: WordEntry;
  selectedAnswer: number | null;
  isCorrect: boolean;
  comboMultiplier: number;
  streak: number;
  onAnswer: (index: number) => void;
};

const { width } = Dimensions.get("window");

export default function QuizScreen({
  word,
  selectedAnswer,
  isCorrect,
  comboMultiplier,
  streak,
  onAnswer,
}: Props) {
  const { colors, isDark } = useTheme();
  const categoryColor = getCategoryColor(word.category);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Progress & Category */}
      <View style={styles.topBar}>
        <View
          style={[
            styles.categoryBadge,
            {
              backgroundColor: colors.surface,
              borderColor: colors.borderLight,
            },
          ]}
        >
          <View
            style={[styles.categoryDot, { backgroundColor: categoryColor }]}
          />
          <Text style={[styles.categoryText, { color: colors.textSecondary }]}>
            {getCategoryLabel(word.category)}
          </Text>
        </View>
        {comboMultiplier > 1 && (
          <View style={[styles.comboBadge, { backgroundColor: colors.gold }]}>
            <Text
              style={[
                styles.comboText,
                { color: isDark ? "#1A1A1A" : colors.primary },
              ]}
            >
              COMBO x{comboMultiplier}
            </Text>
          </View>
        )}
      </View>

      {/* The Word */}
      <View
        style={[
          styles.wordCard,
          { backgroundColor: colors.surface, borderColor: colors.borderLight },
        ]}
      >
        <Text style={[styles.wordTitle, { color: colors.primary }]}>
          {word.word}
        </Text>
        <View style={[styles.divider, { backgroundColor: colors.gold }]} />
        <Text style={[styles.question, { color: colors.textSecondary }]}>
          Qual è l{"'"}origine di questa parola?
        </Text>
      </View>

      {/* Options */}
      <View style={styles.optionsContainer}>
        {word.options.map((option, index) => {
          const isSelected = selectedAnswer === index;
          const showResult = selectedAnswer !== null;
          const isCorrectOption = index === word.correctAnswer;

          let cardStyle: any[] = [
            styles.optionCard,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ];
          let textStyle: any[] = [styles.optionText, { color: colors.primary }];

          if (showResult) {
            if (isCorrectOption) {
              cardStyle.push({
                borderColor: "#4A7C59",
                backgroundColor: isDark
                  ? "rgba(74,124,89,0.2)"
                  : "rgba(74,124,89,0.1)",
              });
              textStyle.push({ color: isDark ? "#81C784" : "#2D4A35" });
            } else if (isSelected && !isCorrect) {
              cardStyle.push({
                borderColor: colors.error,
                backgroundColor: isDark
                  ? "rgba(229,115,115,0.2)"
                  : "rgba(139,48,48,0.1)",
              });
              textStyle.push({ color: isDark ? "#E57373" : "#521D1D" });
            } else {
              cardStyle.push(styles.disabledCard);
            }
          } else if (isSelected) {
            cardStyle.push({
              borderColor: colors.gold,
              backgroundColor: isDark
                ? "rgba(229,193,88,0.1)"
                : "rgba(212,175,55,0.05)",
            });
          }

          return (
            <TouchableOpacity
              key={index}
              style={cardStyle}
              onPress={() => onAnswer(index)}
              disabled={showResult}
              activeOpacity={0.7}
            >
              <Text style={[styles.optionLetter, { color: colors.goldDark }]}>
                {String.fromCharCode(65 + index)}
              </Text>
              <Text style={textStyle}>{option}</Text>
              {showResult && isCorrectOption && (
                <Text
                  style={[
                    styles.resultIcon,
                    { color: isDark ? "#81C784" : "#4A7C59" },
                  ]}
                >
                  ✓
                </Text>
              )}
              {showResult && isSelected && !isCorrect && (
                <Text
                  style={[
                    styles.resultIcon,
                    { color: isDark ? "#E57373" : "#8B3030" },
                  ]}
                >
                  ✕
                </Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>

      {/* Hint/Footer */}
      {/*
      <View style={styles.footer}>
        <Text style={[styles.hintText, { color: colors.textTertiary }]}>
          {selectedAnswer === null
            ? "Rifletti sulla radice..."
            : isCorrect
              ? "Incredibile! La tua conoscenza cresce."
              : "Non temere, l'errore è parte del cammino."}
        </Text>
      </View> */}

      {/* Decoration Image */}
      <View style={styles.decorationContainer} pointerEvents="none">
        <Image
          source={require("@/assets/images/question.png")}
          style={styles.decorationImage}
          resizeMode="contain"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.lg,
    gap: SPACING.xl,
    position: "relative",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  categoryBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    gap: 8,
  },
  categoryDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  categoryText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  comboBadge: {
    paddingHorizontal: SPACING.sm,
    paddingVertical: 4,
    borderRadius: RADIUS.sm,
    ...SHADOWS.sm,
  },
  comboText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "900",
  },
  wordCard: {
    borderRadius: RADIUS.lg,
    padding: SPACING.xl,
    alignItems: "center",
    borderWidth: 1,
    ...SHADOWS.md,
    zIndex: 1,
  },
  wordTitle: {
    fontFamily: FONTS.serif,
    fontSize: 42,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: SPACING.md,
  },
  divider: {
    width: 40,
    height: 3,
    borderRadius: 2,
    marginBottom: SPACING.md,
  },
  question: {
    fontFamily: FONTS.sans,
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
  },
  footer: {
    alignItems: "center",
    zIndex: 1,
  },
  hintText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    textAlign: "center",
  },
  optionsContainer: {
    gap: SPACING.md,
    zIndex: 1,
  },
  optionCard: {
    borderRadius: RADIUS.md,
    padding: SPACING.lg,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    gap: SPACING.md,
  },
  optionLetter: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: "800",
    width: 24,
  },
  optionText: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 16,
    fontWeight: "600",
  },
  disabledCard: {
    opacity: 0.6,
  },
  resultIcon: {
    fontSize: 20,
    fontWeight: "800",
  },
  decorationContainer: {
    position: "absolute",
    bottom: 0,
    right: -50,
    width: 150,
    height: 150,
    zIndex: 10,
  },
  decorationImage: {
    width: "100%",
    height: "100%",
    opacity: 1,
  },
});
