import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { WordEntry, getCategoryColor, getCategoryLabel } from "@/constants/words";
import { useTheme } from "@/context/theme-context";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Confetti } from "./confetti";

const { width } = Dimensions.get("window");

type Props = {
  visible: boolean;
  words: WordEntry[];
  wordMastery: Record<string, number>;
  onClose: () => void;
  onUpdateMastery: (wordId: string, delta: number) => void;
};

export default function FlashcardModal({
  visible,
  words,
  wordMastery,
  onClose,
  onUpdateMastery,
}: Props) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stats, setStats] = useState({ memorized: 0, toReview: 0 });

  const flipAnim = useRef(new Animated.Value(0)).current;

  // Reset session on open/close
  React.useEffect(() => {
    if (visible) {
      setCurrentIndex(0);
      setIsFlipped(false);
      setCompleted(false);
      setStats({ memorized: 0, toReview: 0 });
      flipAnim.setValue(0);
    }
  }, [visible]);

  const currentWord = words[currentIndex] as WordEntry | undefined;

  const handleFlip = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Animated.spring(flipAnim, {
      toValue: isFlipped ? 0 : 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();
    setIsFlipped(!isFlipped);
  };

  const advanceCard = (memorized: boolean) => {
    if (memorized) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (currentWord) {
        onUpdateMastery(currentWord.id, 1);
      }
      setStats((prev) => ({ ...prev, memorized: prev.memorized + 1 }));
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      setStats((prev) => ({ ...prev, toReview: prev.toReview + 1 }));
    }

    if (currentIndex + 1 >= words.length) {
      setCompleted(true);
      return;
    }

    // Reset flip and go to next
    flipAnim.setValue(0);
    setIsFlipped(false);
    setCurrentIndex((prev) => prev + 1);
  };

  if (!visible) return null;

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [1, 0],
  });

  const backOpacity = flipAnim.interpolate({
    inputRange: [89, 90],
    outputRange: [0, 1],
  });

  const masteryLevel = currentWord ? (wordMastery[currentWord.id] ?? 0) : 0;
  const categoryColor = currentWord ? getCategoryColor(currentWord.category) : colors.gold;

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View
        style={[
          styles.container,
          {
            backgroundColor: colors.background,
            paddingTop: Math.max(insets.top, SPACING.md),
            paddingBottom: Math.max(insets.bottom, SPACING.md),
          },
        ]}
      >
        {completed && <Confetti />}

        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={[styles.closeBtn, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}
            onPress={onClose}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityLabel="Chiudi flashcard"
          >
            <Feather name="x" size={18} color={colors.primary} />
          </TouchableOpacity>
          <View style={styles.headerTitleWrap}>
            <Text style={[styles.headerTitle, { color: colors.primary }]}>Palestra Flashcard</Text>
            <Text style={[styles.headerSub, { color: colors.textTertiary }]}>
              {completed
                ? "Sessione completata"
                : `Parola ${currentIndex + 1} di ${words.length}`}
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        {!completed && words.length > 0 && currentWord ? (
          <View style={styles.content}>
            {/* Progress indicator */}
            <View style={[styles.progressBarTrack, { backgroundColor: colors.borderLight }]}>
              <View
                style={[
                  styles.progressBarFill,
                  {
                    backgroundColor: colors.gold,
                    width: `${((currentIndex + 1) / words.length) * 100}%`,
                  },
                ]}
              />
            </View>

            {/* Flashcard container */}
            <TouchableOpacity
              activeOpacity={0.95}
              onPress={handleFlip}
              style={styles.cardArea}
            >
              {/* Front Face */}
              <Animated.View
                style={[
                  styles.card,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.borderLight,
                    opacity: frontOpacity,
                    transform: [{ rotateY: frontInterpolate }],
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <View
                    style={[
                      styles.categoryBadge,
                      { backgroundColor: `${categoryColor}20`, borderColor: categoryColor },
                    ]}
                  >
                    <Text style={[styles.categoryTxt, { color: categoryColor }]}>
                      {getCategoryLabel(currentWord.category)}
                    </Text>
                  </View>

                  <View style={styles.masteryPills}>
                    {[1, 2, 3].map((lvl) => (
                      <View
                        key={lvl}
                        style={[
                          styles.masteryDot,
                          {
                            backgroundColor:
                              masteryLevel >= lvl ? colors.gold : colors.borderLight,
                          },
                        ]}
                      />
                    ))}
                  </View>
                </View>

                <View style={styles.cardCenter}>
                  <Text style={[styles.wordTitle, { color: colors.primary }]}>
                    {currentWord.word}
                  </Text>
                  <Text style={[styles.promptText, { color: colors.textSecondary }]}>
                    Qual è l&apos;origine segreta di questo vocabolo?
                  </Text>
                </View>

                <View style={[styles.flipHintWrap, { borderColor: colors.borderLight }]}>
                  <Feather name="refresh-cw" size={12} color={colors.goldDark} style={{ marginRight: 6 }} />
                  <Text style={[styles.flipHintText, { color: colors.goldDark }]}>
                    Tocca per girare la carta
                  </Text>
                </View>
              </Animated.View>

              {/* Back Face */}
              <Animated.View
                style={[
                  styles.card,
                  styles.cardBack,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.gold,
                    opacity: backOpacity,
                    transform: [{ rotateY: backInterpolate }],
                  },
                ]}
              >
                <View style={styles.cardHeader}>
                  <Text style={[styles.backWordName, { color: colors.primary }]}>
                    {currentWord.word}
                  </Text>
                  <View
                    style={[
                      styles.categoryBadge,
                      { backgroundColor: `${categoryColor}20`, borderColor: categoryColor },
                    ]}
                  >
                    <Text style={[styles.categoryTxt, { color: categoryColor }]}>
                      {getCategoryLabel(currentWord.category)}
                    </Text>
                  </View>
                </View>

                <View style={styles.backCenter}>
                  <View style={[styles.etymologyBox, { backgroundColor: colors.background, borderColor: colors.borderLight }]}>
                    <Text style={[styles.etymLabel, { color: colors.goldDark }]}>ETIMOLOGIA</Text>
                    <Text style={[styles.etymValue, { color: colors.primary }]}>
                      {currentWord.shortEtymology}
                    </Text>
                  </View>

                  <Text
                    style={[styles.storyText, { color: colors.textSecondary }]}
                    numberOfLines={6}
                  >
                    {currentWord.story}
                  </Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <Feather name="eye-off" size={12} color={colors.textTertiary} />
                  <Text style={[styles.flipHintTextSmall, { color: colors.textTertiary }]}>
                    Tocca la carta per nascondere
                  </Text>
                </View>
              </Animated.View>
            </TouchableOpacity>

            {/* Actions Bar */}
            <View style={styles.actionsBar}>
              <TouchableOpacity
                style={[
                  styles.actionBtn,
                  styles.reviewBtn,
                  { backgroundColor: colors.surface, borderColor: colors.borderLight },
                ]}
                onPress={() => advanceCard(false)}
              >
                <Feather name="rotate-ccw" size={15} color={colors.textSecondary} style={{ marginRight: 6 }} />
                <Text style={[styles.actionBtnText, { color: colors.textSecondary }]}>
                  Da Ripassare
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.actionBtn, styles.memorizedBtn, { backgroundColor: colors.gold }]}
                onPress={() => advanceCard(true)}
              >
                <Feather name="check" size={16} color={colors.primary} style={{ marginRight: 6 }} />
                <Text style={[styles.actionBtnText, { color: colors.primary, fontWeight: "800" }]}>
                  Memorizzata!
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : completed ? (
          <View style={styles.completedContainer}>
            <Image
              source={require("@/assets/images/book.png")}
              style={styles.completedIcon}
              resizeMode="contain"
            />
            <Text style={[styles.completedTitle, { color: colors.primary }]}>
              Sessione Completata!
            </Text>
            <Text style={[styles.completedSub, { color: colors.textSecondary }]}>
              Hai allenato la tua memoria etimologica.
            </Text>

            <View
              style={[
                styles.summaryBox,
                { backgroundColor: colors.surface, borderColor: colors.borderLight },
              ]}
            >
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryVal, { color: colors.goldDark }]}>
                  {stats.memorized}
                </Text>
                <Text style={[styles.summaryLbl, { color: colors.textTertiary }]}>
                  Memorizzate
                </Text>
              </View>
              <View style={[styles.summaryDivider, { backgroundColor: colors.borderLight }]} />
              <View style={styles.summaryItem}>
                <Text style={[styles.summaryVal, { color: colors.textSecondary }]}>
                  {stats.toReview}
                </Text>
                <Text style={[styles.summaryLbl, { color: colors.textTertiary }]}>
                  Da Rivedere
                </Text>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.finishBtn, { backgroundColor: colors.primary }]}
              onPress={onClose}
            >
              <Text style={[styles.finishBtnText, { color: colors.background }]}>
                Torna alla Biblioteca
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textTertiary }]}>
              Nessuna parola disponibile per le flashcard.
            </Text>
            <TouchableOpacity
              style={[styles.finishBtn, { backgroundColor: colors.primary, marginTop: 20 }]}
              onPress={onClose}
            >
              <Text style={[styles.finishBtnText, { color: colors.background }]}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: SPACING.md,
  },
  closeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  closeTxt: {
    fontSize: 16,
    fontWeight: "700",
  },
  headerTitleWrap: {
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: "800",
  },
  headerSub: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    marginTop: 2,
  },
  content: {
    flex: 1,
    justifyContent: "space-between",
    paddingBottom: 12,
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    overflow: "hidden",
    marginVertical: SPACING.sm,
  },
  progressBarFill: {
    height: "100%",
    borderRadius: 3,
  },
  cardArea: {
    flex: 1,
    marginVertical: SPACING.md,
    position: "relative",
  },
  card: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: RADIUS.xl,
    borderWidth: 1.5,
    padding: SPACING.xl,
    justifyContent: "space-between",
    backfaceVisibility: "hidden",
    ...SHADOWS.md,
  },
  cardBack: {
    borderWidth: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  categoryBadge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  categoryTxt: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.8,
  },
  masteryPills: {
    flexDirection: "row",
    gap: 6,
  },
  masteryDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  cardCenter: {
    alignItems: "center",
    gap: SPACING.md,
  },
  wordTitle: {
    fontFamily: FONTS.serif,
    fontSize: 34,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 0.5,
  },
  promptText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    textAlign: "center",
    lineHeight: 20,
    maxWidth: "85%",
  },
  flipHintWrap: {
    alignSelf: "center",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  flipHintText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
  },
  flipHintTextSmall: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    textAlign: "center",
  },
  backWordName: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: "800",
  },
  backCenter: {
    gap: SPACING.md,
  },
  etymologyBox: {
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    gap: 4,
  },
  etymLabel: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1,
  },
  etymValue: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: "700",
    fontStyle: "italic",
    lineHeight: 22,
  },
  storyText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 20,
  },
  actionsBar: {
    flexDirection: "row",
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  actionBtn: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.sm,
  },
  reviewBtn: {
    borderWidth: 1,
  },
  memorizedBtn: {},
  actionBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: "700",
  },
  completedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: SPACING.lg,
    gap: SPACING.md,
  },
  completedIcon: {
    width: 80,
    height: 80,
    marginBottom: SPACING.sm,
  },
  completedTitle: {
    fontFamily: FONTS.serif,
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
  },
  completedSub: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    textAlign: "center",
  },
  summaryBox: {
    flexDirection: "row",
    width: "100%",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    paddingVertical: SPACING.lg,
    marginVertical: SPACING.md,
    ...SHADOWS.sm,
  },
  summaryItem: {
    flex: 1,
    alignItems: "center",
    gap: 4,
  },
  summaryVal: {
    fontFamily: FONTS.serif,
    fontSize: 28,
    fontWeight: "800",
  },
  summaryLbl: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  summaryDivider: {
    width: 1,
    height: "60%",
    alignSelf: "center",
  },
  finishBtn: {
    width: "100%",
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.full,
    alignItems: "center",
    ...SHADOWS.sm,
  },
  finishBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: "800",
  },
  emptyContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontStyle: "italic",
  },
});
