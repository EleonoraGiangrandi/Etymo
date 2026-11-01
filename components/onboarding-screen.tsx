import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { useTheme } from "@/context/theme-context";
import React, { useCallback, useRef, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import * as Haptics from "expo-haptics";
import { Feather } from "@expo/vector-icons";
import { requestPermissions, scheduleDailyNotification } from "@/lib/notifications";

const { width, height } = Dimensions.get("window");

type Props = {
  onComplete: () => void;
};

type GoalType = "curiosita" | "vocabolario" | "sfida" | null;

// ─── Slide 1: Hook ────────────────────────────────────────────────────────────
function SlideHook({ colors }: { colors: any }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();

    // Floating loop for the mascot
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={styles.slide}>
      <Animated.View
        style={{
          flex: 1,
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
          alignItems: "center",
          width: "100%",
          justifyContent: "space-around",
        }}
      >
        <Animated.Image
          source={require("@/assets/images/mascotte.png")}
          style={[styles.heroImage, { transform: [{ translateY: floatAnim }] }]}
          resizeMode="contain"
        />
        <View
          style={[
            styles.tagBadge,
            { backgroundColor: colors.gold + "22", borderColor: colors.gold },
          ]}
        >
          <Text style={[styles.tagText, { color: colors.goldDark }]}>
            Benvenuto in Etymo
          </Text>
        </View>
        <Text style={[styles.hookTitle, { color: colors.primary }]}>
          Il tuo italiano{"\n"}ha 2000 anni
        </Text>
        <Text style={[styles.hookSub, { color: colors.textSecondary }]}>
          Ogni parola che usi ogni giorno nasconde storie di imperatori,
          battaglie, commerci e magie. È ora di scoprirle.
        </Text>

        <View
          style={[
            styles.statRow,
            {
              borderColor: colors.borderLight,
              backgroundColor: colors.surface,
            },
          ]}
        >
          {[
            { emoji: "📖", value: "200+", label: "Parole" },
            { emoji: "🔥", value: "∞", label: "Storie" },
            { emoji: "🏆", value: "7", label: "Ranghi" },
          ].map((s, i) => (
            <View
              key={i}
              style={[
                styles.statItem,
                i < 2 && {
                  borderRightWidth: 1,
                  borderColor: colors.borderLight,
                },
              ]}
            >
              <Text style={styles.statEmoji}>{s.emoji}</Text>
              <Text style={[styles.statValue, { color: colors.primary }]}>
                {s.value}
              </Text>
              <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
                {s.label}
              </Text>
            </View>
          ))}
        </View>
      </Animated.View>
    </View>
  );
}

// ─── Slide 2: Aha Moment Interattivo con Flip 3D ─────────────────────────────
type SlideAhaProps = {
  colors: any;
  isDark: boolean;
  onReveal: () => void;
  revealed: boolean;
};

function SlideAhaMoment({ colors, isDark, onReveal, revealed }: SlideAhaProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(revealed);
  
  const flipAnim = useRef(new Animated.Value(revealed ? 180 : 0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const options = [
    { id: 1, text: "Dal latino 'Centum' (cento saluti)", isCorrect: false },
    { id: 2, text: "Dal veneziano 'S-ciào vostro' (schiavo vostro)", isCorrect: true },
    { id: 3, text: "Dal francese antico 'Chapeau' (cappello)", isCorrect: false },
  ];

  React.useEffect(() => {
    if (!revealed && !quizSubmitted) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.04,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    }
  }, [revealed, quizSubmitted]);

  const handleOptionSelect = (optionId: number) => {
    if (quizSubmitted) return;
    
    setSelectedOption(optionId);
    setQuizSubmitted(true);
    
    const correct = optionId === 2;
    if (correct) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Error);
    }
    
    onReveal();

    Animated.spring(flipAnim, {
      toValue: 180,
      friction: 8,
      tension: 45,
      delay: 1500,
      useNativeDriver: true,
    }).start();
  };

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

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
    opacity: frontOpacity,
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
    opacity: backOpacity,
  };

  return (
    <View style={[styles.slide, { justifyContent: "space-around" }]}>
      <View style={[styles.chipRow, { alignSelf: "center", marginBottom: 0 }]}>
        <View
          style={[
            styles.chip,
            { backgroundColor: colors.gold + "22", borderColor: colors.gold },
          ]}
        >
          <Text style={[styles.chipText, { color: colors.goldDark }]}>
            🧪 Prova subito
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.primary, textAlign: "center", alignSelf: "center" }]}>
        Sai davvero{"\n"}cosa significa?
      </Text>

      {/* 3D Card Container */}
      <View style={styles.cardContainer}>
        {/* Front Side */}
        <Animated.View
          pointerEvents={quizSubmitted ? "none" : "auto"}
          style={[
            styles.wordCard,
            styles.cardAbsolute,
            frontAnimatedStyle,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          {!quizSubmitted ? (
            <View style={{ width: "100%", alignItems: "center" }}>
              <Animated.View style={{ transform: [{ scale: pulseAnim }], alignItems: "center", width: "100%" }}>
                <Text style={[styles.wordBig, { color: colors.primary }]}>
                  CIAO
                </Text>
                <View
                  style={[styles.dividerGold, { backgroundColor: colors.gold }]}
                />
                <Text style={[styles.quizQuestion, { color: colors.textSecondary }]}>
                  Da dove pensi che derivi questo saluto?
                </Text>
              </Animated.View>
              
              <View style={styles.quizOptionsContainer}>
                {options.map((opt) => (
                  <TouchableOpacity
                    key={opt.id}
                    style={[
                      styles.quizOptionBtn,
                      {
                        backgroundColor: colors.background,
                        borderColor: colors.borderLight,
                      }
                    ]}
                    onPress={() => handleOptionSelect(opt.id)}
                    activeOpacity={0.7}
                  >
                    <Text style={[styles.quizOptionLetter, { color: colors.goldDark }]}>
                      {opt.id === 1 ? "A" : opt.id === 2 ? "B" : "C"}
                    </Text>
                    <Text style={[styles.quizOptionText, { color: colors.primary }]}>
                      {opt.text}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          ) : (
            <View style={{ width: "100%", alignItems: "center", justifyContent: "center" }}>
              <Text style={[styles.wordBig, { color: colors.primary }]}>
                CIAO
              </Text>
              <View
                style={[styles.dividerGold, { backgroundColor: colors.gold }]}
              />
              <Text style={[styles.feedbackText, { color: selectedOption === 2 ? "#4CAF50" : "#F44336" }]}>
                {selectedOption === 2 ? "🎉 Esatto! Ottimo lavoro!" : "❌ Quasi! Ecco l'origine reale..."}
              </Text>
              
              <View style={styles.quizOptionsContainer}>
                {options.map((opt) => {
                  const isChosen = selectedOption === opt.id;
                  const isOptCorrect = opt.id === 2;
                  let borderCol = colors.borderLight;
                  let bgCol = colors.background;
                  let iconName: "check" | "x" | null = null;
                  
                  if (isOptCorrect) {
                    borderCol = "#4CAF50"; // Green
                    bgCol = isDark ? "#1B3A24" : "#E8F5E9";
                    iconName = "check";
                  } else if (isChosen && !isOptCorrect) {
                    borderCol = "#F44336"; // Red
                    bgCol = isDark ? "#4A1C1C" : "#FFEBEE";
                    iconName = "x";
                  }
                  
                  return (
                    <View
                      key={opt.id}
                      style={[
                        styles.quizOptionBtn,
                        {
                          backgroundColor: bgCol,
                          borderColor: borderCol,
                          borderWidth: isChosen || isOptCorrect ? 2 : 1,
                        }
                      ]}
                    >
                      <Text style={[styles.quizOptionLetter, { color: isOptCorrect ? "#4CAF50" : isChosen ? "#F44336" : colors.goldDark, fontWeight: "700" }]}>
                        {opt.id === 1 ? "A" : opt.id === 2 ? "B" : "C"}
                      </Text>
                      <Text style={[styles.quizOptionText, { color: colors.primary, flex: 1, fontWeight: isChosen || isOptCorrect ? "700" : "400" }]}>
                        {opt.text}
                      </Text>
                      {iconName && (
                        <Feather name={iconName} size={16} color={isOptCorrect ? "#4CAF50" : "#F44336"} />
                      )}
                    </View>
                  );
                })}
              </View>
            </View>
          )}
        </Animated.View>

        {/* Back Side */}
        <Animated.View
          pointerEvents={quizSubmitted ? "auto" : "none"}
          style={[
            styles.wordCard,
            styles.cardAbsolute,
            backAnimatedStyle,
            {
              backgroundColor: isDark ? "#2A2415" : "#FFFAED",
              borderColor: colors.gold,
            },
          ]}
        >
          <View style={{ alignItems: "center", width: "100%" }}>
            <Text style={[styles.wordBig, { color: colors.goldDark }]}>
              CIAO
            </Text>
            <View
              style={[styles.dividerGold, { backgroundColor: colors.gold }]}
            />
            <Text style={[styles.etymLabel, { color: colors.textTertiary }]}>
              Deriva da:
            </Text>
            <Text style={[styles.etymFull, { color: colors.primary }]}>
              «s-ciào vostro»
            </Text>
            <Text
              style={[
                styles.etymTranslation,
                { color: colors.textSecondary },
              ]}
            >
              sono il vostro schiavo
            </Text>
            <Text style={[styles.etymStory, { color: colors.textSecondary }]}>
              A Venezia, i servi salutavano i loro padroni con questa formula.
              Oggi lo diciamo a tutti, senza sapere di offrire la nostra
              schiavitù.
            </Text>
          </View>
        </Animated.View>
      </View>

      {revealed ? (
        <Animated.View
          style={{
            opacity: flipAnim.interpolate({
              inputRange: [0, 180],
              outputRange: [0, 1],
            }),
            alignItems: "center",
          }}
        >
          <Text style={[styles.revealedCTA, { color: colors.goldDark }]}>
            🤯 Ogni parola nasconde qualcosa di simile
          </Text>
        </Animated.View>
      ) : (
        <Text style={[styles.sectionSub, { color: colors.textSecondary, textAlign: "center", alignSelf: "center", marginBottom: 0 }]}>
          Mettiti alla prova ed esplora l'origine nascosta di una parola quotidiana.
        </Text>
      )}
    </View>
  );
}

// ─── Goal Card Sub-component with Animation ──────────────────────────────────
function GoalCard({
  colors,
  goal,
  isSelected,
  onPress,
}: {
  colors: any;
  goal: { id: GoalType; emoji: string; title: string; sub: string };
  isSelected: boolean;
  onPress: () => void;
}) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    
    // Scale spring animation
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.96,
        duration: 80,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1.04,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.spring(scale, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
    ]).start();

    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale }], width: "100%" }}>
      <TouchableOpacity
        onPress={handlePress}
        activeOpacity={0.85}
        style={[
          styles.goalCard,
          {
            backgroundColor: isSelected
              ? colors.gold + "18"
              : colors.surface,
            borderColor: isSelected ? colors.gold : colors.borderLight,
            borderWidth: isSelected ? 2 : 1,
          },
        ]}
      >
        <Text style={styles.goalEmoji}>{goal.emoji}</Text>
        <View style={{ flex: 1 }}>
          <Text style={[styles.goalTitle, { color: colors.primary }]}>
            {goal.title}
          </Text>
          <Text style={[styles.goalSub, { color: colors.textTertiary }]}>
            {goal.sub}
          </Text>
        </View>
        <View
          style={[
            styles.radioOuter,
            { borderColor: isSelected ? colors.gold : colors.border },
          ]}
        >
          {isSelected && (
            <View
              style={[
                styles.radioInner,
                { backgroundColor: colors.gold },
              ]}
            />
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

// ─── Slide 3: Personalizzazione ───────────────────────────────────────────────
function SlideGoal({
  colors,
  selectedGoal,
  onSelectGoal,
}: {
  colors: any;
  selectedGoal: GoalType;
  onSelectGoal: (g: GoalType) => void;
}) {
  const goals: { id: GoalType; emoji: string; title: string; sub: string }[] = [
    {
      id: "curiosita",
      emoji: "🔍",
      title: "Curiosità culturale",
      sub: "Capire le radici della nostra storia",
    },
    {
      id: "vocabolario",
      emoji: "📚",
      title: "Vocabolario ricco",
      sub: "Parlare e scrivere con più precisione",
    },
    {
      id: "sfida",
      emoji: "⚡",
      title: "Sfida quotidiana",
      sub: "Battere i miei record ogni giorno",
    },
  ];

  return (
    <View style={[styles.slide, { justifyContent: "space-around" }]}>
      <View style={[styles.chipRow, { alignSelf: "center", marginBottom: 0 }]}>
        <View
          style={[
            styles.chip,
            {
              backgroundColor: colors.surface,
              borderColor: colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.chipText, { color: colors.textTertiary }]}>
            👤 Solo per te
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.primary, textAlign: "center", alignSelf: "center" }]}>
        Cosa vuoi{"\n"}ottenere?
      </Text>
      <Text style={[styles.sectionSub, { color: colors.textSecondary, textAlign: "center", alignSelf: "center", marginBottom: 0 }]}>
        Scegli il tuo obiettivo principale per personalizzare la tua esperienza.
      </Text>

      <View style={styles.goalsContainer}>
        {goals.map((g) => (
          <GoalCard
            key={g.id}
            colors={colors}
            goal={g}
            isSelected={selectedGoal === g.id}
            onPress={() => onSelectGoal(g.id)}
          />
        ))}
      </View>
    </View>
  );
}

// ─── Slide 4: Gamification Preview con Staggered Dots ──────────────────────────
function SlideStreak({
  colors,
  isDark,
  completed,
  onComplete,
}: {
  colors: any;
  isDark: boolean;
  completed: boolean;
  onComplete: () => void;
}) {
  const streakAnim = useRef(new Animated.Value(0)).current;
  const fireScale = useRef(new Animated.Value(1)).current;
  const pulseSundayAnim = useRef(new Animated.Value(1)).current;
  
  // 7 animations for day dots progress
  const dotScales = useRef(
    Array.from({ length: 7 }, () => new Animated.Value(0))
  ).current;

  React.useEffect(() => {
    Animated.timing(streakAnim, {
      toValue: 1,
      duration: 800,
      delay: 100,
      useNativeDriver: true,
    }).start();

    // Stagger animation for the habit days
    const anims = dotScales.map((scaleVal, index) => {
      const finalScale = index === 5 ? 1.22 : (index === 6 && completed) ? 1.22 : 1;
      return Animated.spring(scaleVal, {
        toValue: finalScale,
        friction: 6,
        tension: 80,
        useNativeDriver: true,
      });
    });

    Animated.stagger(120, anims).start();
  }, []);

  React.useEffect(() => {
    if (!completed) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseSundayAnim, {
            toValue: 1.15,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(pulseSundayAnim, {
            toValue: 1,
            duration: 800,
            useNativeDriver: true,
          }),
        ])
      ).start();
    } else {
      pulseSundayAnim.setValue(1);
    }
  }, [completed]);

  React.useEffect(() => {
    if (completed) {
      Animated.sequence([
        Animated.timing(fireScale, {
          toValue: 1.4,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.spring(fireScale, {
          toValue: 1,
          friction: 4,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [completed]);

  const handleSundayPress = () => {
    if (completed) return;
    onComplete();
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    Animated.spring(dotScales[6], {
      toValue: 1.22,
      friction: 5,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  const badges = [
    { icon: "🎓", name: "Novizio", req: "3 parole", unlocked: completed },
    { icon: "🏺", name: "Archeologo", req: "50%", unlocked: false },
    { icon: "⚔️", name: "Guerriero", req: "80%", unlocked: false },
    { icon: "👑", name: "Maestro", req: "100%", unlocked: false },
  ];

  return (
    <View style={[styles.slide, { justifyContent: "space-around" }]}>
      <View style={[styles.chipRow, { alignSelf: "center", marginBottom: 0 }]}>
        <View
          style={[
            styles.chip,
            {
              backgroundColor: colors.surface,
              borderColor: colors.borderLight,
            },
          ]}
        >
          <Text style={[styles.chipText, { color: colors.textTertiary }]}>
            🔥 Ogni giorno conta
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.primary, textAlign: "center", alignSelf: "center" }]}>
        Scala i ranghi
      </Text>
      <Text style={[styles.sectionSub, { color: colors.textSecondary, textAlign: "center", alignSelf: "center", marginBottom: 0 }]}>
        Una parola al giorno. Una striscia che cresce. Premi che ti aspettano.
      </Text>

      {/* Streak visualizer */}
      <Animated.View
        style={[
          styles.streakCard,
          {
            backgroundColor: colors.surface,
            borderColor: colors.borderLight,
            opacity: streakAnim,
          },
        ]}
      >
        <View style={styles.streakHeader}>
          <Animated.Text style={[styles.fireEmoji, { transform: [{ scale: fireScale }] }]}>
            🔥
          </Animated.Text>
          <View>
            <Text style={[styles.streakValue, { color: colors.primary }]}>
              {completed ? "7" : "6"}
            </Text>
            <Text style={[styles.streakLabel, { color: colors.textTertiary }]}>
              giorni di fila
            </Text>
          </View>
          <View style={{ flex: 1 }} />
          <View
            style={[
              styles.streakBadgePill,
              { backgroundColor: colors.gold + "20" },
            ]}
          >
            <Text style={[styles.streakBadgeTxt, { color: colors.goldDark }]}>
              Record!
            </Text>
          </View>
        </View>

        <View style={styles.dotRow}>
          {["L", "M", "M", "G", "V", "S", "D"].map((day, i) => {
            const isCompleted = i < 6 || completed;
            const isSunday = i === 6;
            
            const dotContent = (
              <Animated.View
                style={[
                  styles.dayDot,
                  {
                    backgroundColor: isCompleted ? colors.gold : colors.borderLight,
                    transform: [{ scale: dotScales[i] }],
                  },
                ]}
              />
            );
            
            return (
              <View key={i} style={styles.dotItem}>
                {isSunday && !completed ? (
                  <TouchableOpacity onPress={handleSundayPress} activeOpacity={0.7}>
                    <Animated.View style={{ transform: [{ scale: pulseSundayAnim }] }}>
                      {dotContent}
                    </Animated.View>
                  </TouchableOpacity>
                ) : (
                  dotContent
                )}
                <Text
                  style={[
                    styles.dayLabel,
                    { color: isCompleted ? colors.primary : colors.textTertiary },
                  ]}
                >
                  {day}
                </Text>
              </View>
            );
          })}
        </View>
      </Animated.View>

      {!completed && (
        <Text style={[styles.streakHint, { color: colors.goldDark, marginBottom: 0 }]}>
          👇 Tocca la 'D' (Domenica) per sbloccare la striscia e il primo rango!
        </Text>
      )}

      {/* Badges row */}
      <View style={styles.badgesRow}>
        {badges.map((b, i) => (
          <View
            key={i}
            style={[
              styles.badgeItem,
              {
                backgroundColor: b.unlocked
                  ? colors.gold + "18"
                  : colors.surface,
                borderColor: b.unlocked ? colors.gold : colors.borderLight,
                opacity: b.unlocked ? 1 : 0.5,
              },
            ]}
          >
            <Text style={styles.badgeIconText}>{b.icon}</Text>
            <Text style={[styles.badgeName, { color: colors.primary }]}>
              {b.name}
            </Text>
            <Text
              style={[
                styles.badgeReq,
                { color: b.unlocked ? colors.goldDark : colors.textTertiary },
              ]}
            >
              {b.unlocked ? "Sbloccato" : b.req}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
}

// ─── Slide 5: Notifiche della Parola del Giorno ───────────────────────────────
function SlideNotifications({
  colors,
  isDark,
  enabled,
  onToggleNotifications,
}: {
  colors: any;
  isDark: boolean;
  enabled: boolean;
  onToggleNotifications: () => Promise<void>;
}) {
  const [loading, setLoading] = useState(false);
  const scale = useRef(new Animated.Value(1)).current;

  const handlePress = async () => {
    setLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    Animated.sequence([
      Animated.timing(scale, { toValue: 0.95, duration: 80, useNativeDriver: true }),
      Animated.spring(scale, { toValue: 1, friction: 4, useNativeDriver: true })
    ]).start();

    try {
      await onToggleNotifications();
    } catch (e) {
      console.warn("Failed to toggle notifications:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={[styles.slide, { justifyContent: "space-around" }]}>
      <View style={[styles.chipRow, { alignSelf: "center", marginBottom: 0 }]}>
        <View
          style={[
            styles.chip,
            { backgroundColor: colors.gold + "22", borderColor: colors.gold },
          ]}
        >
          <Text style={[styles.chipText, { color: colors.goldDark }]}>
            🔔 Parola del giorno
          </Text>
        </View>
      </View>

      <Text style={[styles.sectionTitle, { color: colors.primary, textAlign: "center", alignSelf: "center" }]}>
        Rimani curioso
      </Text>
      <Text style={[styles.sectionSub, { color: colors.textSecondary, textAlign: "center", alignSelf: "center", marginBottom: 0 }]}>
        Ricevi ogni giorno una parola e scopri la sua storia nascosta.
      </Text>

      {/* Notification Card */}
      <View style={[styles.notificationCard, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
        <View style={[styles.notificationIconBg, { backgroundColor: colors.gold + "18" }]}>
          <Feather name="bell" size={28} color={colors.goldDark} />
        </View>
        <Text style={[styles.notificationStatText, { color: colors.primary }]}>
          L' <Text style={{ color: colors.goldDark, fontWeight: "800" }}>88%</Text> degli utenti dice che le notifiche aiutano ad imparare meglio.
        </Text>
      </View>

      <Animated.View style={{ transform: [{ scale }], width: "100%" }}>
        <TouchableOpacity
          onPress={handlePress}
          activeOpacity={0.8}
          style={[
            styles.notifEnableBtn,
            {
              backgroundColor: enabled ? "#4CAF50" : colors.gold,
            }
          ]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#322214" />
          ) : (
            <Text style={[styles.notifEnableBtnText, { color: enabled ? "#fff" : "#322214" }]}>
              {enabled ? "✓ Notifiche attivate" : "Attiva Notifiche"}
            </Text>
          )}
        </TouchableOpacity>
      </Animated.View>

      <Text style={[styles.notifSubtext, { color: colors.textTertiary }]}>
        Puoi modificare questa preferenza in qualsiasi momento dal tuo profilo.
      </Text>
    </View>
  );
}

// ─── Slide 6: CTA Finale con Floating Loop ──────────────────────────────────
function SlideFinal({
  colors,
  isDark,
  goal,
}: {
  colors: any;
  isDark: boolean;
  goal: GoalType;
}) {
  const scaleAnim = useRef(new Animated.Value(0.88)).current;
  const floatAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      tension: 80,
      friction: 8,
    }).start();

    // Floating loop for the mascot
    Animated.loop(
      Animated.sequence([
        Animated.timing(floatAnim, {
          toValue: -8,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(floatAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const goalMessages: Record<
    NonNullable<GoalType>,
    { title: string; sub: string }
  > = {
    curiosita: {
      title: "Il curioso perfetto",
      sub: "Ti aspettano 200+ storie che cambieranno il modo in cui vedi l'italiano.",
    },
    vocabolario: {
      title: "Il vocabolario ti aspetta",
      sub: "Ogni parola scoperta è un mattone in più nella tua espressione.",
    },
    sfida: {
      title: "La sfida comincia ora",
      sub: "Batti i tuoi record quotidiani e scala i ranghi del linguaggio.",
    },
  };

  const msg = goal
    ? goalMessages[goal]
    : {
        title: "L'avventura inizia",
        sub: "Scopri la storia nascosta nelle parole che usi ogni giorno.",
      };

  return (
    <View style={styles.slide}>
      <Animated.View
        style={{
          flex: 1,
          width: "100%",
          alignItems: "center",
          justifyContent: "space-around",
          transform: [{ scale: scaleAnim }],
        }}
      >
        <Animated.Image
          source={require("@/assets/images/mascotte.png")}
          style={[styles.finalMascotte, { transform: [{ translateY: floatAnim }] }]}
          resizeMode="contain"
        />

        <Text style={[styles.finalTitle, { color: colors.primary, textAlign: "center" }]}>
          {msg.title}
        </Text>
        <Text style={[styles.finalSub, { color: colors.textSecondary, textAlign: "center", marginBottom: 0 }]}>
          {msg.sub}
        </Text>

        <View
          style={[
            styles.quoteBox,
            {
              borderLeftColor: colors.goldDark,
              backgroundColor: isDark
                ? "rgba(255,255,255,0.04)"
                : "rgba(50,34,20,0.04)",
            },
          ]}
        >
          <Text style={[styles.quoteText, { color: colors.textSecondary }]}>
            «I limiti del mio linguaggio sono i confini del mio pensiero.»
          </Text>
          <Text style={[styles.quoteAuthor, { color: colors.textTertiary }]}>
            — L. Wittgenstein
          </Text>
        </View>
      </Animated.View>
    </View>
  );
}

// ─── Main Onboarding ──────────────────────────────────────────────────────────
export default function OnboardingScreen({ onComplete }: Props) {
  const { colors, isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedGoal, setSelectedGoal] = useState<GoalType>(null);
  const [hasRevealedAha, setHasRevealedAha] = useState(false);
  const [completedStreak, setCompletedStreak] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  
  const progressAnim = useRef(new Animated.Value(0)).current;
  const slideTranslate = useRef(new Animated.Value(0)).current;

  const TOTAL = 6;

  const isLastSlide = currentIndex === TOTAL - 1;
  const isAhaSlide = currentIndex === 1;
  const isGoalSlide = currentIndex === 2;
  const isStreakSlide = currentIndex === 3;
  const isNotificationSlide = currentIndex === 4;

  const handleEnableNotifications = async () => {
    try {
      const granted = await requestPermissions();
      if (granted) {
        await scheduleDailyNotification(9, 0);
        setNotificationsEnabled(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      } else {
        // If denied, we still mark it so they can proceed and don't get stuck
        setNotificationsEnabled(true);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
      }
    } catch (e) {
      console.warn(e);
      setNotificationsEnabled(true);
    }
  };

  const canProceed = 
    (!isAhaSlide || hasRevealedAha) && 
    (!isGoalSlide || selectedGoal !== null) &&
    (!isStreakSlide || completedStreak) &&
    (!isNotificationSlide || notificationsEnabled);

  React.useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: (currentIndex + 1) / TOTAL,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentIndex]);

  const goNext = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentIndex < TOTAL - 1) {
      // Premium slide out/in animation transition
      Animated.timing(slideTranslate, {
        toValue: -width,
        duration: 220,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((p) => p + 1);
        slideTranslate.setValue(width);
        Animated.spring(slideTranslate, {
          toValue: 0,
          tension: 60,
          friction: 9,
          useNativeDriver: true,
        }).start();
      });
    } else {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      onComplete();
    }
  }, [currentIndex, onComplete]);

  const goBack = useCallback(() => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    if (currentIndex > 0) {
      // Premium slide out/in animation back transition
      Animated.timing(slideTranslate, {
        toValue: width,
        duration: 220,
        useNativeDriver: true,
      }).start(() => {
        setCurrentIndex((p) => p - 1);
        slideTranslate.setValue(-width);
        Animated.spring(slideTranslate, {
          toValue: 0,
          tension: 60,
          friction: 9,
          useNativeDriver: true,
        }).start();
      });
    }
  }, [currentIndex]);

  const handleSkip = useCallback(() => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
    onComplete();
  }, [onComplete]);

  // Keep latest handlers and states in ref to avoid PanResponder stale closure
  const stateRef = useRef({ canProceed, currentIndex, goNext, goBack });
  React.useEffect(() => {
    stateRef.current = { canProceed, currentIndex, goNext, goBack };
  }, [canProceed, currentIndex, goNext, goBack]);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (evt, gestureState) => {
        // Only trigger on horizontal swipes, when movement is significant
        return (
          Math.abs(gestureState.dx) > 30 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
        );
      },
      onPanResponderRelease: (evt, gestureState) => {
        const {
          canProceed: curCanProceed,
          currentIndex: curCurrentIndex,
          goNext: curGoNext,
          goBack: curGoBack,
        } = stateRef.current;

        if (gestureState.dx < -60) {
          // Swipe left -> Go forward
          if (curCanProceed) {
            curGoNext();
          } else {
            Haptics.notificationAsync(Haptics.NotificationFeedbackType.Warning);
          }
        } else if (gestureState.dx > 60) {
          // Swipe right -> Go backward
          if (curCurrentIndex > 0) {
            curGoBack();
          }
        }
      },
    })
  ).current;

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"],
  });

  const slides = [
    <SlideHook key={0} colors={colors} />,
    <SlideAhaMoment 
      key={1}
      colors={colors} 
      isDark={isDark} 
      revealed={hasRevealedAha} 
      onReveal={() => setHasRevealedAha(true)} 
    />,
    <SlideGoal
      key={2}
      colors={colors}
      selectedGoal={selectedGoal}
      onSelectGoal={setSelectedGoal}
    />,
    <SlideStreak 
      key={3} 
      colors={colors} 
      isDark={isDark} 
      completed={completedStreak}
      onComplete={() => setCompletedStreak(true)}
    />,
    <SlideNotifications
      key={4}
      colors={colors}
      isDark={isDark}
      enabled={notificationsEnabled}
      onToggleNotifications={handleEnableNotifications}
    />,
    <SlideFinal key={5} colors={colors} isDark={isDark} goal={selectedGoal} />,
  ];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Progress bar */}
      <View
        style={[styles.progressTrack, { backgroundColor: colors.borderLight }]}
      >
        <Animated.View
          style={[
            styles.progressFill,
            { width: progressWidth, backgroundColor: colors.gold },
          ]}
        />
      </View>

      {/* Top Navigation Header */}
      <View style={styles.topNavHeader}>
        {currentIndex > 0 ? (
          <TouchableOpacity onPress={goBack} style={[styles.topNavBtn, styles.topNavBtnLeft]}>
            <Feather name="arrow-left" size={18} color={colors.textSecondary} />
            <Text style={[styles.topNavBtnLabel, { color: colors.textSecondary }]}>
              Indietro
            </Text>
          </TouchableOpacity>
        ) : (
          <View style={[styles.topNavBtn, styles.topNavBtnLeft]} />
        )}

        {!isLastSlide ? (
          <TouchableOpacity onPress={handleSkip} style={[styles.topNavBtn, styles.topNavBtnRight]}>
            <Text style={[styles.topNavBtnLabel, { color: colors.textSecondary }]}>
              Salta
            </Text>
            <Feather name="chevrons-right" size={14} color={colors.textSecondary} />
          </TouchableOpacity>
        ) : (
          <View style={[styles.topNavBtn, styles.topNavBtnRight]} />
        )}
      </View>

      {/* Slide content */}
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.slideWrapper,
          { transform: [{ translateX: slideTranslate }] },
        ]}
      >
        <View style={{ flex: 1 }}>
          {slides[currentIndex]}
        </View>
      </Animated.View>

      {/* Footer */}
      <View style={styles.footer}>
        {/* Dot indicators */}
        <View style={styles.dotsRow}>
          {Array.from({ length: TOTAL }).map((_, i) => (
            <View
              key={i}
              style={[
                styles.indicatorDot,
                {
                  width: i === currentIndex ? 20 : 8,
                  backgroundColor:
                    i === currentIndex ? colors.gold : colors.borderLight,
                },
              ]}
            />
          ))}
        </View>

        {!canProceed && (
          <Text style={[styles.disabledBtnHint, { color: colors.textTertiary }]}>
            {isAhaSlide 
              ? "Rispondi al quiz per continuare" 
              : isGoalSlide 
              ? "Scegli un obiettivo per continuare" 
              : isStreakSlide 
              ? "Tocca la 'D' per sbloccare la striscia" 
              : isNotificationSlide
              ? "Attiva le notifiche per continuare"
              : ""}
          </Text>
        )}

        {/* CTA button */}
        <TouchableOpacity
          style={[
            styles.ctaBtn,
            {
              backgroundColor: canProceed ? colors.primary : colors.border,
              opacity: canProceed ? 1 : 0.6,
            },
          ]}
          onPress={goNext}
          activeOpacity={0.82}
          disabled={!canProceed}
        >
          <Text
            style={[
              styles.ctaBtnText,
              { color: isDark ? colors.background : "#FDFCF8" },
            ]}
          >
            {isLastSlide ? "Inizia l'Avventura  ✦" : "Continua"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  progressTrack: {
    height: 3,
    width: "100%",
  },
  progressFill: {
    height: 3,
    borderRadius: 2,
  },
  slideWrapper: {
    flex: 1,
  },
  slide: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingTop: SPACING.sm,
    paddingBottom: SPACING.sm,
    alignItems: "center",
    width: "100%",
  },

  // Slide 1 – Hook
  heroImage: {
    width: width * 0.42,
    height: width * 0.42,
    marginBottom: SPACING.sm,
  },
  tagBadge: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    marginBottom: SPACING.sm,
  },
  tagText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 1.2,
    textTransform: "uppercase",
  },
  hookTitle: {
    fontFamily: FONTS.serif,
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    lineHeight: 32,
    marginBottom: SPACING.sm,
  },
  hookSub: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: SPACING.sm,
    marginBottom: SPACING.md,
  },
  statRow: {
    flexDirection: "row",
    borderRadius: RADIUS.md,
    borderWidth: 1,
    overflow: "hidden",
    width: "100%",
    ...SHADOWS.sm,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: SPACING.sm,
    gap: 1,
  },
  statEmoji: { fontSize: 16, marginBottom: 1 },
  statValue: { fontFamily: FONTS.serif, fontSize: 16, fontWeight: "800" },
  statLabel: {
    fontFamily: FONTS.sans,
    fontSize: 9,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },

  // Shared slide headers
  chipRow: {
    alignSelf: "flex-start",
    marginBottom: SPACING.sm,
  },
  chip: {
    paddingHorizontal: SPACING.md,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  chipText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 0.8,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: "800",
    lineHeight: 30,
    marginBottom: SPACING.xs,
    alignSelf: "flex-start",
  },
  sectionSub: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 17,
    marginBottom: SPACING.md,
    alignSelf: "flex-start",
  },

  // Slide 2 – Aha moment & Card Container
  cardContainer: {
    width: width - SPACING.xl * 2,
    height: 300,
    position: "relative",
  },
  cardAbsolute: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backfaceVisibility: "hidden",
  },
  wordCard: {
    borderRadius: RADIUS.lg,
    padding: SPACING.md,
    alignItems: "center",
    borderWidth: 1.5,
    justifyContent: "center",
    ...SHADOWS.md,
    height: "100%",
  },
  quizQuestion: {
    fontFamily: FONTS.sans,
    fontSize: 12.5,
    textAlign: "center",
    lineHeight: 17,
    marginBottom: SPACING.xs,
    paddingHorizontal: SPACING.sm,
  },
  quizOptionsContainer: {
    width: "100%",
    gap: SPACING.xs,
  },
  quizOptionBtn: {
    paddingVertical: 7,
    paddingHorizontal: SPACING.sm,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  quizOptionLetter: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: "700",
    marginRight: SPACING.sm,
  },
  quizOptionText: {
    fontFamily: FONTS.sans,
    fontSize: 12.5,
    lineHeight: 16,
    textAlign: "left",
  },
  feedbackText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  wordBig: {
    fontFamily: FONTS.serif,
    fontSize: 26,
    fontWeight: "800",
    textAlign: "center",
    letterSpacing: 4,
    marginBottom: SPACING.xs,
  },
  dividerGold: {
    width: 30,
    height: 2,
    borderRadius: 1,
    alignSelf: "center",
    marginBottom: SPACING.xs,
  },
  etymLabel: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
    marginBottom: 2,
  },
  etymFull: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
    fontStyle: "italic",
    marginBottom: 2,
  },
  etymTranslation: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: SPACING.sm,
  },
  etymStory: {
    fontFamily: FONTS.serif,
    fontSize: 12.5,
    lineHeight: 18,
    textAlign: "center",
  },
  revealedCTA: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },

  // Slide 3 – Goals
  goalsContainer: {
    width: "100%",
    gap: SPACING.sm,
  },
  goalCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RADIUS.md,
    padding: SPACING.sm,
    gap: SPACING.sm,
    ...SHADOWS.sm,
  },
  goalEmoji: { fontSize: 20 },
  goalTitle: {
    fontFamily: FONTS.sans,
    fontSize: 13.5,
    fontWeight: "700",
    marginBottom: 1,
  },
  goalSub: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    lineHeight: 14,
  },
  radioOuter: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  radioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  // Slide 4 – Streak
  streakCard: {
    width: "100%",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.sm,
    marginBottom: SPACING.sm,
    ...SHADOWS.sm,
  },
  streakHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: SPACING.sm,
    gap: SPACING.sm,
  },
  fireEmoji: { fontSize: 24 },
  streakValue: { fontFamily: FONTS.serif, fontSize: 20, fontWeight: "800" },
  streakLabel: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  streakBadgePill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
  },
  streakBadgeTxt: { fontFamily: FONTS.sans, fontSize: 10, fontWeight: "800" },
  dotRow: { flexDirection: "row", justifyContent: "space-between" },
  dotItem: { alignItems: "center", gap: 3 },
  dayDot: { width: 22, height: 22, borderRadius: 11 },
  dayLabel: { fontFamily: FONTS.sans, fontSize: 9, fontWeight: "700" },
  badgesRow: {
    flexDirection: "row",
    gap: SPACING.xs,
    width: "100%",
  },
  badgeItem: {
    flex: 1,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    padding: 6,
    alignItems: "center",
    gap: 1,
  },
  badgeIconText: { fontSize: 16 },
  badgeName: {
    fontFamily: FONTS.sans,
    fontSize: 8.5,
    fontWeight: "700",
    textAlign: "center",
  },
  badgeReq: {
    fontFamily: FONTS.sans,
    fontSize: 7.5,
    fontWeight: "600",
    textAlign: "center",
  },

  // Slide 5 - Notifications
  notificationCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.md,
    width: "100%",
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  notificationIconBg: {
    width: 54,
    height: 54,
    borderRadius: 27,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationStatText: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 13.5,
    lineHeight: 19,
  },
  notifEnableBtn: {
    height: 52,
    borderRadius: RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    ...SHADOWS.sm,
  },
  notifEnableBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: "700",
  },
  notifSubtext: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    textAlign: "center",
    lineHeight: 15,
    marginTop: SPACING.sm,
    paddingHorizontal: SPACING.md,
  },

  // Slide 6 – Final
  finalMascotte: {
    width: width * 0.35,
    height: width * 0.35,
    marginBottom: SPACING.sm,
  },
  finalTitle: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: "800",
    textAlign: "center",
    marginBottom: SPACING.xs,
  },
  finalSub: {
    fontFamily: FONTS.sans,
    fontSize: 13.5,
    textAlign: "center",
    lineHeight: 19,
    paddingHorizontal: SPACING.md,
    marginBottom: SPACING.sm,
  },
  quoteBox: {
    borderLeftWidth: 3,
    borderRadius: RADIUS.sm,
    padding: SPACING.sm,
    width: "100%",
    gap: 2,
    marginTop: SPACING.sm,
  },
  quoteText: {
    fontFamily: FONTS.serif,
    fontSize: 12.5,
    fontStyle: "italic",
    lineHeight: 18,
  },
  quoteAuthor: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    textAlign: "right",
    fontWeight: "600",
  },

  // Navigation Header at Top
  topNavHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.sm,
    width: "100%",
  },
  topNavBtn: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: SPACING.xs,
    paddingHorizontal: SPACING.sm,
    gap: 4,
    minWidth: 80,
  },
  topNavBtnLeft: {
    justifyContent: "flex-start",
  },
  topNavBtnRight: {
    justifyContent: "flex-end",
  },
  topNavBtnLabel: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: "600",
  },

  // Footer
  footer: {
    paddingHorizontal: SPACING.xl,
    paddingBottom: SPACING.lg,
    paddingTop: SPACING.xs,
    gap: SPACING.sm,
  },
  disabledBtnHint: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontStyle: "italic",
    textAlign: "center",
    marginBottom: 2,
  },
  streakHint: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: "700",
    textAlign: "center",
    marginTop: -SPACING.xs,
    marginBottom: SPACING.xs,
  },
  dotsRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 6,
    marginBottom: 2,
  },
  indicatorDot: {
    height: 8,
    borderRadius: 4,
  },
  ctaBtn: {
    height: 52,
    borderRadius: RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.md,
  },
  ctaBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: 0.3,
  },
});
