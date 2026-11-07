import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import { requestPermissions, scheduleDailyNotification } from "@/lib/notifications";
import { Feather, Ionicons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get("window");
const TOTAL_SLIDES = 4;

type Props = {
  onComplete: () => void;
};

export default function OnboardingScreen({ onComplete }: Props) {
  const { colors, isDark } = useTheme();
  const insets = useSafeAreaInsets();
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef<ScrollView>(null);

  // Slide 2: Interactive Aha-Moment Quiz State
  const [selectedQuizOption, setSelectedQuizOption] = useState<number | null>(null);

  // Slide 4: Notification toggle state
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notifLoading, setNotifLoading] = useState(false);

  // Floating animation for mascot in Slide 1
  const floatAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -6,
          duration: 1800,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 1800,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, [floatAnim]);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    if (slideIndex !== currentSlide && slideIndex >= 0 && slideIndex < TOTAL_SLIDES) {
      setCurrentSlide(slideIndex);
    }
  };

  const goToSlide = (index: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    scrollRef.current?.scrollTo({ x: index * width, animated: true });
    setCurrentSlide(index);
  };

  const handleNext = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      goToSlide(currentSlide + 1);
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    onComplete();
  };

  const handleQuizSelect = (index: number) => {
    if (selectedQuizOption !== null) return;
    Haptics.impactAsync(
      index === 1
        ? Haptics.ImpactFeedbackStyle.Medium
        : Haptics.ImpactFeedbackStyle.Light,
    );
    setSelectedQuizOption(index);
  };

  const handleToggleNotifications = async () => {
    if (notificationsEnabled) return;
    setNotifLoading(true);
    try {
      const granted = await requestPermissions();
      if (granted) {
        await scheduleDailyNotification(9, 0);
        setNotificationsEnabled(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }
    } catch (e) {
      console.warn("Notification permission error:", e);
    } finally {
      setNotifLoading(false);
    }
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: Math.max(insets.top, 10),
        },
      ]}
    >
      {/* Top Bar with Step indicator and Skip Button */}
      <View style={styles.topBar}>
        <View style={styles.stepBadge}>
          <Text style={[styles.stepText, { color: colors.goldDark }]}>
            {currentSlide + 1} di {TOTAL_SLIDES}
          </Text>
        </View>

        {currentSlide < TOTAL_SLIDES - 1 ? (
          <TouchableOpacity
            onPress={handleFinish}
            hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
            activeOpacity={0.7}
          >
            <Text style={[styles.skipText, { color: colors.textTertiary }]}>Salta</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 40 }} />
        )}
      </View>

      {/* Horizontal Slides */}
      <ScrollView
        ref={scrollRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        style={styles.scrollArea}
      >
        {/* ─── SLIDE 1: LA PROMESSA ────────────────────────────────────────── */}
        <View style={[styles.slide, { width }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.slideScrollContent}
          >
            <Animated.View
              style={[
                styles.mascotWrapper,
                { transform: [{ translateY: floatAnim }] },
              ]}
            >
              <Image
                source={require("@/assets/images/mascotte.png")}
                style={styles.mascotImage}
                resizeMode="contain"
              />
            </Animated.View>

            <View
              style={[
                styles.pillTag,
                { backgroundColor: `${colors.gold}20`, borderColor: colors.gold },
              ]}
            >
              <Feather name="compass" size={12} color={colors.goldDark} />
              <Text style={[styles.pillTagText, { color: colors.goldDark }]}>
                BENVENUTO IN ETYMO
              </Text>
            </View>

            <Text style={[styles.heroTitle, { color: colors.primary }]}>
              Le parole che usi hanno una storia segreta
            </Text>

            <Text style={[styles.heroSubtitle, { color: colors.textSecondary }]}>
              Dalle legioni dell&apos;antica Roma ai marinai arabi: scopri come ogni vocabolo quotidiano è un piccolo capolavoro di storia e avventura.
            </Text>

            <View
              style={[
                styles.statBar,
                { backgroundColor: colors.surface, borderColor: colors.borderLight },
              ]}
            >
              <View style={styles.statCol}>
                <Feather name="book-open" size={16} color={colors.primary} />
                <Text style={[styles.statVal, { color: colors.primary }]}>200+</Text>
                <Text style={[styles.statLbl, { color: colors.textTertiary }]}>Parole</Text>
              </View>
              <View style={[styles.statDivider, { backgroundColor: colors.borderLight }]} />
              <View style={styles.statCol}>
                <Ionicons name="flame" size={16} color="#E55A2B" />
                <Text style={[styles.statVal, { color: colors.primary }]}>Rituale</Text>
                <Text style={[styles.statLbl, { color: colors.textTertiary }]}>Quotidiano</Text>
              </View>
              <View style={[styles.statDivider, { backgroundColor: colors.borderLight }]} />
              <View style={styles.statCol}>
                <Feather name="shield" size={16} color="#4A7C59" />
                <Text style={[styles.statVal, { color: colors.primary }]}>100%</Text>
                <Text style={[styles.statLbl, { color: colors.textTertiary }]}>Offline</Text>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* ─── SLIDE 2: AHA-MOMENT INTERATTIVO ─────────────────────────────── */}
        <View style={[styles.slide, { width }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.slideScrollContent}
          >
            <View
              style={[
                styles.pillTag,
                { backgroundColor: `${colors.gold}20`, borderColor: colors.gold },
              ]}
            >
              <Feather name="zap" size={12} color={colors.goldDark} />
              <Text style={[styles.pillTagText, { color: colors.goldDark }]}>
                METTITI SUBITO ALLA PROVA
              </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.primary }]}>
              Sai da dove deriva?
            </Text>
            <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
              Tocca la risposta corretta e svela il segreto.
            </Text>

            {/* Micro-Quiz Card */}
            <View
              style={[
                styles.quizBox,
                { backgroundColor: colors.surface, borderColor: colors.borderLight },
              ]}
            >
              <View style={styles.quizHeaderRow}>
                <Text style={[styles.targetWord, { color: colors.primary }]}>
                  CANDIDATO
                </Text>
              </View>
              <Text style={[styles.quizPrompt, { color: colors.textSecondary }]}>
                Da cosa trae origine questo vocabolo?
              </Text>

              <View style={styles.optionsList}>
                {[
                  { text: "Da chi cantava in pubblico nelle piazze", isCorrect: false },
                  { text: "Dalla toga bianca candida nell'antica Roma", isCorrect: true },
                  { text: "Da un antico dolce zuccherato medievale", isCorrect: false },
                ].map((opt, i) => {
                  const isSelected = selectedQuizOption === i;
                  const showResult = selectedQuizOption !== null;

                  let optBg = colors.background;
                  let optBorder = colors.borderLight;
                  let textColor = colors.primary;

                  if (showResult) {
                    if (opt.isCorrect) {
                      optBg = isDark ? "#1E3324" : "#EDF5EF";
                      optBorder = "#4A7C59";
                      textColor = isDark ? "#81C784" : "#2D4A35";
                    } else if (isSelected && !opt.isCorrect) {
                      optBg = isDark ? "#3A1E1E" : "#FDEAEA";
                      optBorder = colors.error;
                      textColor = isDark ? "#E57373" : "#521D1D";
                    } else {
                      optBorder = colors.borderLight;
                      textColor = colors.textTertiary;
                    }
                  }

                  return (
                    <TouchableOpacity
                      key={i}
                      activeOpacity={0.8}
                      onPress={() => handleQuizSelect(i)}
                      disabled={showResult}
                      style={[
                        styles.quizOptionBtn,
                        { backgroundColor: optBg, borderColor: optBorder },
                      ]}
                    >
                      <Text style={[styles.optLetter, { color: colors.goldDark }]}>
                        {String.fromCharCode(65 + i)}
                      </Text>
                      <Text style={[styles.optText, { color: textColor }]}>
                        {opt.text}
                      </Text>
                      {showResult && opt.isCorrect && (
                        <Feather name="check" size={16} color={isDark ? "#81C784" : "#4A7C59"} />
                      )}
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Instant Explanation Box */}
              {selectedQuizOption !== null && (
                <View
                  style={[
                    styles.explanationBox,
                    {
                      backgroundColor: isDark
                        ? "rgba(212,175,55,0.12)"
                        : "rgba(212,175,55,0.08)",
                      borderColor: colors.gold,
                    },
                  ]}
                >
                  <Text style={[styles.explanationTitle, { color: colors.goldDark }]}>
                    {selectedQuizOption === 1 ? "Esatto! Ecco la storia:" : "Ecco l'origine reale:"}
                  </Text>
                  <Text style={[styles.explanationText, { color: colors.primary }]}>
                    A Roma, chi aspirava a una carica indossava una toga sbiancata con gesso (<Text style={{ fontStyle: "italic", fontWeight: "700" }}>toga candida</Text>) per simboleggiare purezza morale e trasparenza.
                  </Text>
                </View>
              )}
            </View>
          </ScrollView>
        </View>

        {/* ─── SLIDE 3: I 3 PILASTRI DELL'APP ──────────────────────────────── */}
        <View style={[styles.slide, { width }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.slideScrollContent}
          >
            <View
              style={[
                styles.pillTag,
                { backgroundColor: `${colors.gold}20`, borderColor: colors.gold },
              ]}
            >
              <Feather name="layers" size={12} color={colors.goldDark} />
              <Text style={[styles.pillTagText, { color: colors.goldDark }]}>
                COME FUNZIONA ETYMO
              </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.primary }]}>
              Un rituale di 2 minuti al giorno
            </Text>
            <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
              Tre strumenti potenti per esplorare e ricordare le origini della lingua.
            </Text>

            <View style={styles.featuresStack}>
              {/* Feature 1 */}
              <View
                style={[
                  styles.featureCard,
                  { backgroundColor: colors.surface, borderColor: colors.borderLight },
                ]}
              >
                <View
                  style={[
                    styles.featureIconWrap,
                    { backgroundColor: `${colors.gold}20`, borderColor: colors.gold },
                  ]}
                >
                  <Feather name="sun" size={18} color={colors.goldDark} />
                </View>
                <View style={styles.featureTextCol}>
                  <Text style={[styles.featureCardTitle, { color: colors.primary }]}>
                    1 Parola al Giorno
                  </Text>
                  <Text style={[styles.featureCardDesc, { color: colors.textTertiary }]}>
                    Un breve quiz quotidiano con aneddoti storici per stimolare la mente.
                  </Text>
                </View>
              </View>

              {/* Feature 2 */}
              <View
                style={[
                  styles.featureCard,
                  { backgroundColor: colors.surface, borderColor: colors.borderLight },
                ]}
              >
                <View
                  style={[
                    styles.featureIconWrap,
                    { backgroundColor: "#E3F2FD", borderColor: "#2196F3" },
                  ]}
                >
                  <Feather name="share-2" size={18} color="#1976D2" />
                </View>
                <View style={styles.featureTextCol}>
                  <Text style={[styles.featureCardTitle, { color: colors.primary }]}>
                    Mappa delle Connessioni
                  </Text>
                  <Text style={[styles.featureCardDesc, { color: colors.textTertiary }]}>
                    Un grafico interattivo per viaggiare tra parole nate dalla stessa radice.
                  </Text>
                </View>
              </View>

              {/* Feature 3 */}
              <View
                style={[
                  styles.featureCard,
                  { backgroundColor: colors.surface, borderColor: colors.borderLight },
                ]}
              >
                <View
                  style={[
                    styles.featureIconWrap,
                    { backgroundColor: "#E8F5E9", borderColor: "#4CAF50" },
                  ]}
                >
                  <Feather name="cpu" size={18} color="#388E3C" />
                </View>
                <View style={styles.featureTextCol}>
                  <Text style={[styles.featureCardTitle, { color: colors.primary }]}>
                    Palestra & Flashcard SRS
                  </Text>
                  <Text style={[styles.featureCardDesc, { color: colors.textTertiary }]}>
                    Ripasso scientifico intelligente per consolidare le parole nel tempo.
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>
        </View>

        {/* ─── SLIDE 4: ROUTINE & PARTENZA ─────────────────────────────────── */}
        <View style={[styles.slide, { width }]}>
          <ScrollView
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={styles.slideScrollContent}
          >
            <View
              style={[
                styles.pillTag,
                { backgroundColor: `${colors.gold}20`, borderColor: colors.gold },
              ]}
            >
              <Feather name="award" size={12} color={colors.goldDark} />
              <Text style={[styles.pillTagText, { color: colors.goldDark }]}>
                PRONTO A PARTIRE
              </Text>
            </View>

            <Text style={[styles.sectionTitle, { color: colors.primary }]}>
              Fai spazio alla curiosità
            </Text>
            <Text style={[styles.sectionSub, { color: colors.textSecondary }]}>
              La costanza è il segreto per svelare l&apos;intero tesoro della lingua italiana.
            </Text>

            {/* Notification Card */}
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleToggleNotifications}
              style={[
                styles.notifCard,
                {
                  backgroundColor: colors.surface,
                  borderColor: notificationsEnabled ? "#4A7C59" : colors.borderLight,
                },
              ]}
            >
              <View
                style={[
                  styles.notifIconWrap,
                  {
                    backgroundColor: notificationsEnabled
                      ? "rgba(74,124,89,0.2)"
                      : `${colors.gold}20`,
                  },
                ]}
              >
                <Feather
                  name={notificationsEnabled ? "check" : "bell"}
                  size={20}
                  color={notificationsEnabled ? "#4A7C59" : colors.goldDark}
                />
              </View>

              <View style={styles.notifTextWrap}>
                <Text style={[styles.notifTitle, { color: colors.primary }]}>
                  {notificationsEnabled
                    ? "Promemoria attivo alle 09:00"
                    : "Notifica Parola del Giorno"}
                </Text>
                <Text style={[styles.notifSubtitle, { color: colors.textTertiary }]}>
                  {notificationsEnabled
                    ? "Riceverai ogni mattina un vocabolo da scoprire."
                    : "Tocca per ricevere un promemoria discreto alle 09:00."}
                </Text>
              </View>

              <View
                style={[
                  styles.notifActionBadge,
                  {
                    backgroundColor: notificationsEnabled
                      ? "#4A7C59"
                      : colors.gold,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.notifActionText,
                    { color: notificationsEnabled ? "#FFF" : "#322214" },
                  ]}
                >
                  {notificationsEnabled ? "Attivo" : "Attiva"}
                </Text>
              </View>
            </TouchableOpacity>

            {/* Privacy Guarantee Pill */}
            <View
              style={[
                styles.privacyGuaranteeCard,
                { backgroundColor: colors.surface, borderColor: colors.borderLight },
              ]}
            >
              <Feather name="lock" size={14} color={colors.goldDark} />
              <Text style={[styles.privacyGuaranteeText, { color: colors.textSecondary }]}>
                100% Offline • Nessun account • Rispetto totale dati
              </Text>
            </View>
          </ScrollView>
        </View>
      </ScrollView>

      {/* Bottom Navigation: Pagination Dots + Action Button */}
      <View style={[styles.bottomNav, { paddingBottom: Math.max(insets.bottom, 12) }]}>
        {/* Pagination Dots */}
        <View style={styles.paginationRow}>
          {[0, 1, 2, 3].map((idx) => {
            const isActive = idx === currentSlide;
            return (
              <TouchableOpacity
                key={idx}
                onPress={() => goToSlide(idx)}
                hitSlop={{ top: 8, bottom: 8, left: 6, right: 6 }}
                style={[
                  styles.dot,
                  {
                    backgroundColor: isActive ? colors.gold : colors.borderLight,
                    width: isActive ? 22 : 6,
                  },
                ]}
              />
            );
          })}
        </View>

        {/* Next / Start Button */}
        <TouchableOpacity
          style={[
            styles.primaryBtn,
            { backgroundColor: currentSlide === TOTAL_SLIDES - 1 ? colors.gold : colors.primary },
          ]}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text
            style={[
              styles.primaryBtnText,
              {
                color:
                  currentSlide === TOTAL_SLIDES - 1
                    ? "#322214"
                    : isDark
                    ? "#1A1A1A"
                    : colors.background,
              },
            ]}
          >
            {currentSlide === TOTAL_SLIDES - 1
              ? "Inizia l'Esplorazione"
              : "Continua"}
          </Text>
          <Feather
            name={currentSlide === TOTAL_SLIDES - 1 ? "compass" : "arrow-right"}
            size={18}
            color={
              currentSlide === TOTAL_SLIDES - 1
                ? "#322214"
                : isDark
                ? "#1A1A1A"
                : colors.background
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xs,
  },
  stepBadge: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  stepText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
  skipText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: "700",
  },
  scrollArea: {
    flex: 1,
  },
  slide: {
    flex: 1,
  },
  slideScrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.md,
    gap: 16,
  },
  mascotWrapper: {
    width: 140,
    height: 140,
    alignItems: "center",
    justifyContent: "center",
  },
  mascotImage: {
    width: "100%",
    height: "100%",
  },
  pillTag: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  pillTagText: {
    fontFamily: FONTS.sans,
    fontSize: 10.5,
    fontWeight: "800",
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 31,
    paddingHorizontal: SPACING.xs,
  },
  heroSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 20,
    textAlign: "center",
    maxWidth: "92%",
  },
  statBar: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: SPACING.md,
    marginTop: 8,
    ...SHADOWS.sm,
  },
  statCol: {
    flex: 1,
    alignItems: "center",
    gap: 3,
  },
  statVal: {
    fontFamily: FONTS.serif,
    fontSize: 16,
    fontWeight: "800",
  },
  statLbl: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  statDivider: {
    width: 1,
    height: 26,
  },
  sectionTitle: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 30,
  },
  sectionSub: {
    fontFamily: FONTS.sans,
    fontSize: 13.5,
    lineHeight: 19,
    textAlign: "center",
    maxWidth: "90%",
  },
  quizBox: {
    width: "100%",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: 16,
    gap: 10,
    ...SHADOWS.sm,
  },
  quizHeaderRow: {
    alignItems: "center",
  },
  targetWord: {
    fontFamily: FONTS.serif,
    fontSize: 23,
    fontWeight: "900",
    letterSpacing: 1.5,
    textAlign: "center",
  },
  quizPrompt: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    textAlign: "center",
    marginBottom: 2,
  },
  optionsList: {
    gap: 8,
  },
  quizOptionBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 11,
    paddingHorizontal: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1.5,
    gap: 10,
  },
  optLetter: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: "800",
    width: 18,
  },
  optText: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: "600",
  },
  explanationBox: {
    marginTop: 8,
    padding: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    gap: 4,
  },
  explanationTitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "800",
  },
  explanationText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    lineHeight: 17,
  },
  featuresStack: {
    width: "100%",
    gap: 10,
    marginTop: 4,
  },
  featureCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    gap: 12,
    ...SHADOWS.sm,
  },
  featureIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  featureTextCol: {
    flex: 1,
    gap: 2,
  },
  featureCardTitle: {
    fontFamily: FONTS.serif,
    fontSize: 15,
    fontWeight: "700",
  },
  featureCardDesc: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    lineHeight: 16,
  },
  notifCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 14,
    borderRadius: RADIUS.lg,
    borderWidth: 1.5,
    gap: 12,
    width: "100%",
    ...SHADOWS.sm,
  },
  notifIconWrap: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  notifTextWrap: {
    flex: 1,
    gap: 2,
  },
  notifTitle: {
    fontFamily: FONTS.sans,
    fontSize: 13.5,
    fontWeight: "700",
  },
  notifSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 11.5,
    lineHeight: 15,
  },
  notifActionBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  notifActionText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "800",
  },
  privacyGuaranteeCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: SPACING.md,
    paddingVertical: 12,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    width: "100%",
    justifyContent: "center",
  },
  privacyGuaranteeText: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: "600",
    textAlign: "center",
  },
  bottomNav: {
    paddingHorizontal: SPACING.xl,
    paddingTop: 8,
    gap: 12,
  },
  paginationRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    paddingVertical: 2,
  },
  dot: {
    height: 6,
    borderRadius: 3,
  },
  primaryBtn: {
    height: 52,
    borderRadius: RADIUS.full,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: SPACING.sm,
    ...SHADOWS.md,
  },
  primaryBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.5,
  },
});
