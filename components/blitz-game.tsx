import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { WordEntry } from "@/constants/words";
import { useTheme } from "@/context/theme-context";
import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { Confetti } from "./confetti";
import { Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

type Props = {
  words: WordEntry[];
  highScore: number;
  onFinish: (score: number) => void;
  onClose: () => void;
};

export default function BlitzGame({
  words,
  highScore,
  onFinish,
  onClose,
}: Props) {
  const { colors, isDark } = useTheme();
  const [pool, setPool] = useState<WordEntry[]>(() =>
    [...words].sort(() => 0.5 - Math.random()),
  );
  const [timeLeft, setTimeLeft] = useState(30);
  const [score, setScore] = useState(0);
  const [combo, setCombo] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState<{
    etymology: string;
    options: WordEntry[];
    correct: number;
  } | null>(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [isNewRecord, setIsNewRecord] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const hasFinishedRef = useRef(false);
  const timerAnim = useRef(new Animated.Value(1)).current;
  const scoreAnim = useRef(new Animated.Value(0)).current;

  const generateQuestion = useCallback(() => {
    setSelectedOption(null);
    setPool((prevPool) => {
      if (prevPool.length === 0) {
        setIsGameOver(true);
        return prevPool;
      }

      const nextPool = [...prevPool];
      const correctWord = nextPool.pop()!;

      // Pick 2 random distractors from all words (excluding the correct one)
      const distractors = words
        .filter((w) => w.id !== correctWord.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 2);

      const options = [correctWord, ...distractors].sort(
        () => 0.5 - Math.random(),
      );
      const correctIndex = options.findIndex((o) => o.id === correctWord.id);

      setCurrentQuestion({
        etymology: correctWord.shortEtymology,
        options,
        correct: correctIndex,
      });

      return nextPool;
    });
  }, [words]);

  const timerRef = useRef<any>(null);

  useEffect(() => {
    generateQuestion();
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          if (timerRef.current) clearInterval(timerRef.current);
          setIsGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    if (isGameOver && timerRef.current) {
      clearInterval(timerRef.current);
    }
  }, [isGameOver]);

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
    if (selectedOption !== null || !currentQuestion) return;
    
    setSelectedOption(index);
    const isCorrect = index === currentQuestion.correct;

    if (isCorrect) {
      const points = 10;
      setScore((prev) => prev + points);
      setCombo((prev) => prev + 1);

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
    } else {
      setCombo(0);
      Vibration.vibrate(200);
    }

    setTimeout(() => {
      generateQuestion();
    }, 600);
  };

  if (isGameOver) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        {isNewRecord && <Confetti />}
        <Text style={[styles.title, { color: colors.primary }]}>
          TEMPO SCADUTO!
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
            {score} punti
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
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.headerCloseBtn}
          onPress={onClose}
          hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
        >
          <Text style={[styles.headerCloseText, { color: colors.textTertiary }]}>✕</Text>
        </TouchableOpacity>
        <View style={styles.stat}>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
            TEMPO
          </Text>
          <Text
            style={[
              styles.statValue,
              { color: timeLeft < 10 ? "#E53935" : colors.primary },
            ]}
          >
            {timeLeft}s
          </Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
            SCORE
          </Text>
          <Animated.Text
            style={[
              styles.statValue,
              {
                color: colors.goldDark,
                transform: [
                  {
                    scale: scoreAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [1, 1.5],
                    }),
                  },
                ],
              },
            ]}
          >
            {score}
          </Animated.Text>
        </View>
        <View style={styles.stat}>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
            COMBO
          </Text>
          <Text style={[styles.statValue, { color: colors.primary }]}>
            x{combo}
          </Text>
        </View>
      </View>

      <View style={styles.questionContainer}>
        <Text style={[styles.hint, { color: colors.textTertiary }]}>
          Quale parola deriva da...
        </Text>
        <Text style={[styles.etymology, { color: colors.primary }]}>
          "{currentQuestion?.etymology}"
        </Text>
      </View>

      <View style={styles.optionsContainer}>
        {currentQuestion?.options.map((option, index) => {
          const isSelected = selectedOption === index;
          const isCorrect = index === currentQuestion.correct;
          const showResult = selectedOption !== null;

          let backgroundColor = colors.surface;
          let borderColor = colors.border;
          let textColor = colors.primary;

          if (showResult) {
            if (isCorrect) {
              borderColor = "#4A7C59";
              backgroundColor = isDark ? "#1E3324" : "#EDF5EF";
              textColor = isDark ? "#81C784" : "#2D4A35";
            } else if (isSelected && !isCorrect) {
              borderColor = colors.error;
              backgroundColor = isDark ? "#3A1E1E" : "#FDEAEA";
              textColor = isDark ? "#E57373" : "#521D1D";
            }
          }

          return (
            <TouchableOpacity
              key={`${option.id}-${index}`}
              style={[
                styles.optionCard,
                { backgroundColor, borderColor },
                showResult && !isCorrect && !isSelected && styles.disabledCard,
              ]}
              onPress={() => handleAnswer(index)}
              disabled={selectedOption !== null}
              activeOpacity={0.7}
            >
              <Text style={[styles.optionLetter, { color: colors.goldDark }]}>
                {String.fromCharCode(65 + index)}
              </Text>
              <Text style={[styles.optionText, { color: textColor }]}>
                {option.word}
              </Text>
              {showResult && isCorrect && (
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.xl,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    position: "absolute",
    top: 50,
    paddingHorizontal: SPACING.xl,
  },
  headerCloseBtn: {
    padding: 6,
    borderRadius: RADIUS.full,
  },
  headerCloseText: {
    fontSize: 20,
    fontWeight: "700",
  },
  stat: {
    alignItems: "center",
  },
  statLabel: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  statValue: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: "900",
  },
  questionContainer: {
    alignItems: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  hint: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontStyle: "italic",
    marginBottom: 8,
  },
  etymology: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 32,
  },
  optionsContainer: {
    width: "100%",
    gap: 12,
  },
  optionCard: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 14,
    paddingHorizontal: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    gap: SPACING.md,
    overflow: "hidden",
  },
  optionLetter: {
    fontFamily: FONTS.sans,
    fontSize: 16,
    fontWeight: "700",
    width: 24,
    backgroundColor: "transparent",
  },
  optionText: {
    flex: 1,
    fontFamily: FONTS.serif,
    fontSize: 17,
    fontWeight: "700",
    backgroundColor: "transparent",
  },
  resultIcon: {
    fontSize: 18,
    fontWeight: "700",
    backgroundColor: "transparent",
  },
  disabledCard: {
    opacity: 0.5,
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
