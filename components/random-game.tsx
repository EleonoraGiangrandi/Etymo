import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { WordEntry } from "@/constants/words";
import { useTheme } from "@/context/theme-context";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { Confetti } from "./confetti";
import { Feather, Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

type Props = {
  words: WordEntry[];
  highScore: number;
  onFinish: (score: number) => void;
  onClose: () => void;
};

export default function RandomGame({
  words,
  highScore,
  onFinish,
  onClose,
}: Props) {
  const { colors, isDark } = useTheme();
  const [pool, setPool] = useState<WordEntry[]>(() =>
    [...words].sort(() => 0.5 - Math.random()),
  );
  const [lives, setLives] = useState(3);
  const [score, setScore] = useState(0);
  const [currentWord, setCurrentWord] = useState<WordEntry | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const hasFinishedRef = useRef(false);
  const scoreAnim = useRef(new Animated.Value(0)).current;

  const generateQuestion = useCallback(() => {
    setSelectedOption(null);
    setPool((prevPool) => {
      if (prevPool.length === 0) {
        setIsGameOver(true);
        return prevPool;
      }

      const nextPool = [...prevPool];
      const nextWord = nextPool.pop()!;
      setCurrentWord(nextWord);
      return nextPool;
    });
  }, []);

  useEffect(() => {
    generateQuestion();
  }, []);

  useEffect(() => {
    if (isGameOver && !hasFinishedRef.current) {
      hasFinishedRef.current = true;
      const isRecord = score > highScore;
      if (isRecord) {
        setIsNewRecord(true);
        Vibration.vibrate([0, 100, 100, 200]);
      }
      onFinish(score);
    }
  }, [isGameOver, score, onFinish, highScore]);

  const handleAnswer = (index: number) => {
    if (selectedOption !== null || !currentWord) return;

    setSelectedOption(index);
    const isCorrect = index === currentWord.correctAnswer;

    if (isCorrect) {
      setScore((prev) => prev + 1);

      // Animation
      Animated.sequence([
        Animated.timing(scoreAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scoreAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();

      Vibration.vibrate(50);

      setTimeout(() => {
        generateQuestion();
      }, 800);
    } else {
      Vibration.vibrate(200);
      setLives((prev) => {
        const nextLives = prev - 1;
        if (nextLives <= 0) {
          setIsGameOver(true);
        } else {
          setTimeout(() => {
            generateQuestion();
          }, 800);
        }
        return nextLives;
      });
    }
  };

  const renderHearts = () => {
    const hearts = [];
    for (let i = 1; i <= 3; i++) {
      hearts.push(
        <Ionicons
          key={i}
          name={i <= lives ? "heart" : "heart-outline"}
          size={20}
          color={i <= lives ? "#E53935" : colors.textTertiary}
          style={{ marginHorizontal: 2 }}
        />
      );
    }
    return <View style={styles.heartsContainer}>{hearts}</View>;
  };

  if (isGameOver) {
    return (
      <View style={[styles.gameOverContainer, { backgroundColor: colors.background }]}>
        {isNewRecord && <Confetti />}
        <Text style={[styles.title, { color: colors.primary }]}>
          GIOCO FINITO!
        </Text>
        <View
          style={[
            styles.resultCard,
            {
              backgroundColor: colors.surface,
              borderColor: isNewRecord ? colors.gold : colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.compliments, { color: colors.primary }]}>
            Complimenti!
          </Text>
          <Text style={[styles.resultLabel, { color: colors.textSecondary }]}>
            Hai totalizzato
          </Text>
          <Text style={[styles.resultValue, { color: colors.goldDark }]}>
            {score} {score === 1 ? "punto" : "punti"}
          </Text>

          {isNewRecord && (
            <View style={styles.recordBadge}>
              <Feather name="award" size={18} color={colors.goldDark} />
              <Text style={[styles.recordText, { color: colors.goldDark }]}>
                NUOVO RECORD!
              </Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={[styles.closeBtn, { backgroundColor: colors.primary }]}
          onPress={onClose}
        >
          <Text style={[styles.closeBtnText, { color: colors.background }]}>
            Torna alla Biblioteca
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.gameContent}>
        {currentWord && (
          <>
            {/* Top Bar with Lives (left) and Stats (right) */}
            <View style={styles.topBar}>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
                <TouchableOpacity
                  onPress={onClose}
                  hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                  style={{ padding: 4 }}
                >
                  <Text style={{ fontSize: 18, color: colors.textTertiary, fontWeight: "700" }}>✕</Text>
                </TouchableOpacity>
                {renderHearts()}
              </View>

              <View style={styles.rightStats}>
                <View
                  style={[
                    styles.statBadge,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.borderLight,
                    },
                  ]}
                >
                  <Text style={[styles.statLabelText, { color: colors.textSecondary }]}>
                    Punti:{" "}
                  </Text>
                  <Animated.Text
                    style={[
                      styles.statValueText,
                      {
                        color: colors.goldDark,
                        transform: [
                          {
                            scale: scoreAnim.interpolate({
                              inputRange: [0, 1],
                              outputRange: [1, 1.3],
                            }),
                          },
                        ],
                      },
                    ]}
                  >
                    {score}
                  </Animated.Text>
                </View>

                <View
                  style={[
                    styles.statBadge,
                    {
                      backgroundColor: colors.surface,
                      borderColor: colors.borderLight,
                    },
                  ]}
                >
                  <Text style={[styles.statLabelText, { color: colors.textSecondary }]}>
                    Record:{" "}
                  </Text>
                  <Text style={[styles.statValueText, { color: colors.primary }]}>
                    {highScore}
                  </Text>
                </View>
              </View>
            </View>

            {/* Word Card */}
            <View
              style={[
                styles.wordCard,
                { backgroundColor: colors.surface, borderColor: colors.borderLight },
              ]}
            >
              <Text style={[styles.wordTitle, { color: colors.primary }]}>
                {currentWord.word}
              </Text>
              <View style={[styles.divider, { backgroundColor: colors.gold }]} />
              <Text style={[styles.questionText, { color: colors.textSecondary }]}>
                Qual è l{"'"}origine di questa parola?
              </Text>
            </View>

            {/* Options */}
            <View style={styles.optionsContainer}>
              {currentWord.options.map((option, index) => {
                const isSelected = selectedOption === index;
                const showResult = selectedOption !== null;
                const isCorrectOption = index === currentWord.correctAnswer;
                const wasCorrectAnswer = selectedOption === currentWord.correctAnswer;

                let backgroundColor = colors.surface;
                let borderColor = colors.border;
                let textColor = colors.primary;

                if (showResult) {
                  if (isCorrectOption) {
                    borderColor = "#4A7C59";
                    backgroundColor = isDark ? "#1E3324" : "#EDF5EF";
                    textColor = isDark ? "#81C784" : "#2D4A35";
                  } else if (isSelected && !wasCorrectAnswer) {
                    borderColor = colors.error;
                    backgroundColor = isDark ? "#3A1E1E" : "#FDEAEA";
                    textColor = isDark ? "#E57373" : "#521D1D";
                  }
                } else if (isSelected) {
                  borderColor = colors.gold;
                  backgroundColor = isDark
                    ? "rgba(229,193,88,0.1)"
                    : "rgba(212,175,55,0.05)";
                }

                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.optionCard,
                      { backgroundColor, borderColor },
                      showResult && !isCorrectOption && !isSelected && styles.disabledCard,
                    ]}
                    onPress={() => handleAnswer(index)}
                    disabled={showResult}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.optionLetter, { color: colors.goldDark }]}>
                      {String.fromCharCode(65 + index)}
                    </Text>
                    <Text style={[styles.optionText, { color: textColor }]}>{option}</Text>
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
                    {showResult && isSelected && !wasCorrectAnswer && (
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
          </>
        )}
      </View>

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
    position: "relative",
  },
  gameOverContainer: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  gameContent: {
    flex: 1,
    justifyContent: "center",
    gap: SPACING.xl,
    paddingBottom: 60, // Space for the decoration image
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
    width: "100%",
  },
  heartsContainer: {
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  heart: {
    fontSize: 22,
  },
  rightStats: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  statBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  statLabelText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  statValueText: {
    fontFamily: FONTS.serif,
    fontSize: 14,
    fontWeight: "800",
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
  questionText: {
    fontFamily: FONTS.sans,
    fontSize: 16,
    textAlign: "center",
    fontStyle: "italic",
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
    backgroundColor: "transparent",
  },
  optionText: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "transparent",
  },
  disabledCard: {
    opacity: 0.6,
  },
  resultIcon: {
    fontSize: 20,
    fontWeight: "800",
    backgroundColor: "transparent",
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
    opacity: 0.8,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: 32,
    fontWeight: "900",
    marginBottom: 20,
  },
  resultCard: {
    width: "100%",
    padding: 30,
    borderRadius: RADIUS.xl,
    borderWidth: 3,
    alignItems: "center",
    marginBottom: 30,
    ...SHADOWS.md,
  },
  resultLabel: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  resultValue: {
    fontFamily: FONTS.serif,
    fontSize: 36,
    fontWeight: "900",
  },
  compliments: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: "800",
    marginBottom: 10,
  },
  recordBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(212, 175, 55, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
    marginTop: 15,
    gap: 6,
  },
  recordEmoji: {
    fontSize: 18,
  },
  recordText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "800",
  },
  closeBtn: {
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: RADIUS.full,
    ...SHADOWS.md,
  },
  closeBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 16,
    fontWeight: "800",
  },
});
