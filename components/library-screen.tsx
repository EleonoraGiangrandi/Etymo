import { FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import {
  WORDS,
  WordEntry,
  getCategoryColor,
  getCategoryLabel,
} from "@/constants/words";
import { useTheme } from "@/context/theme-context";
import { Feather, Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";
import React, { useMemo, useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FlashcardModal from "./flashcard-modal";

type Props = {
  bookmarkedWords: WordEntry[];
  wordsDiscovered: WordEntry[];
  wordsList?: WordEntry[];
  wordMastery?: Record<string, number>;
  blitzRecord?: number;
  randomRecord?: number;
  onSelectWord: (word: WordEntry) => void;
  onStartGame: (mode: "bookmarks" | "random" | "blitz" | "srs") => void;
  toggleBookmark?: (word: WordEntry) => void;
  onUpdateMastery?: (wordId: string, delta: number) => void;
  activeSubTab?: "archive" | "academy";
  onSubTabChange?: (tab: "archive" | "academy") => void;
};

const ALL_CATEGORIES: WordEntry["category"][] = [
  "societa",
  "cucina",
  "natura",
  "scienza",
  "storia",
  "arte",
  "religione",
  "commercio",
  "viaggio",
  "oggetti",
  "corpo",
  "guerra",
];

export default function LibraryScreen({
  bookmarkedWords,
  wordsDiscovered,
  wordsList = WORDS,
  wordMastery = {},
  blitzRecord = 0,
  randomRecord = 0,
  onSelectWord,
  onStartGame,
  toggleBookmark,
  onUpdateMastery,
  activeSubTab,
  onSubTabChange,
}: Props) {
  const { colors, isDark } = useTheme();

  // Tab switch: "archive" vs "academy" (controlled if props provided, else local)
  const [internalTab, setInternalTab] = useState<"archive" | "academy">("archive");
  const activeTab = activeSubTab ?? internalTab;
  const setActiveTab = onSubTabChange ?? setInternalTab;

  // Scope Filter: "all" | "saved"
  const [scopeFilter, setScopeFilter] = useState<"all" | "saved">("all");

  // Category Multi-Select Filter (empty array or all selected means ALL categories)
  const [selectedCategories, setSelectedCategories] = useState<WordEntry["category"][]>([]);
  const isAllCategoriesActive = selectedCategories.length === 0 || selectedCategories.length === ALL_CATEGORIES.length;
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  // Flashcard modal state
  const [showFlashcards, setShowFlashcards] = useState(false);

  // Set of bookmarked IDs for fast lookup
  const bookmarkedIds = useMemo(
    () => new Set(bookmarkedWords.map((w) => w.id)),
    [bookmarkedWords],
  );

  // Filtered words for Archive
  const filteredWords = useMemo(() => {
    let list = wordsDiscovered;

    // Filter by scope (all vs saved)
    if (scopeFilter === "saved") {
      list = list.filter((w) => bookmarkedIds.has(w.id));
    }

    // Filter by selected categories (multi-select)
    if (!isAllCategoriesActive && selectedCategories.length > 0) {
      const catSet = new Set(selectedCategories);
      list = list.filter((w) => catSet.has(w.category));
    }

    // Filter by search query (prefix matches first)
    if (searchQuery.trim().length > 0) {
      const q = searchQuery.toLowerCase().trim();
      const matched = list.filter(
        (w) =>
          w.word.toLowerCase().includes(q) ||
          w.shortEtymology.toLowerCase().includes(q) ||
          getCategoryLabel(w.category).toLowerCase().includes(q),
      );
      const startsWith = matched.filter((w) => w.word.toLowerCase().startsWith(q));
      const rest = matched.filter((w) => !w.word.toLowerCase().startsWith(q));
      list = [...startsWith, ...rest];
    }

    return list;
  }, [wordsDiscovered, scopeFilter, selectedCategories, isAllCategoriesActive, searchQuery, bookmarkedIds]);

  // Statistics
  const totalDiscovered = wordsDiscovered.length;
  const totalAvailable = wordsList.length;
  const masteredCount = useMemo(() => {
    return Object.values(wordMastery).filter((lvl) => lvl >= 3).length;
  }, [wordMastery]);

  const srsDueCount = useMemo(() => {
    return wordsList.filter((w) => (wordMastery[w.id] ?? 0) < 3).length;
  }, [wordsList, wordMastery]);

  const handleTabChange = (tab: "archive" | "academy") => {
    if (tab !== activeTab) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      setActiveTab(tab);
    }
  };

  const handleBookmarkPress = (word: WordEntry) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    toggleBookmark?.(word);
  };

  // Category selection toggle
  const toggleCategory = (cat: WordEntry["category"]) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const isAllActive = selectedCategories.length === 0 || selectedCategories.length === ALL_CATEGORIES.length;

    if (isAllActive) {
      // Se tutte le caselle erano selezionate, deseleziona solo quella cliccata
      setSelectedCategories(ALL_CATEGORIES.filter((c) => c !== cat));
    } else {
      if (selectedCategories.includes(cat)) {
        const next = selectedCategories.filter((c) => c !== cat);
        setSelectedCategories(next);
      } else {
        const next = [...selectedCategories, cat];
        if (next.length === ALL_CATEGORIES.length) {
          setSelectedCategories([...ALL_CATEGORIES]);
        } else {
          setSelectedCategories(next);
        }
      }
    }
  };

  const selectAllCategories = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategories([...ALL_CATEGORIES]);
  };

  const categoryBtnLabel = useMemo(() => {
    if (isAllCategoriesActive) {
      return "Categorie ▾";
    }
    if (selectedCategories.length === 1) {
      return `${getCategoryLabel(selectedCategories[0])} ▾`;
    }
    return `Categorie (${selectedCategories.length}) ▾`;
  }, [isAllCategoriesActive, selectedCategories]);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Screen Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.primary }]}>La tua Biblioteca</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Il tuo archivio di vocaboli e la palestra della lingua
        </Text>

        {/* Segmented Tab Switcher */}
        <View
          style={[
            styles.tabBar,
            { backgroundColor: colors.surface, borderColor: colors.borderLight },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === "archive" && [
                styles.activeTabBtn,
                { backgroundColor: colors.background, borderColor: colors.gold },
              ],
            ]}
            onPress={() => handleTabChange("archive")}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Feather
                name="book"
                size={13}
                color={activeTab === "archive" ? colors.primary : colors.textTertiary}
              />
              <Text
                style={[
                  styles.tabBtnText,
                  { color: activeTab === "archive" ? colors.primary : colors.textTertiary },
                  activeTab === "archive" && styles.activeTabBtnText,
                ]}
              >
                Archivio ({totalDiscovered})
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.tabBtn,
              activeTab === "academy" && [
                styles.activeTabBtn,
                { backgroundColor: colors.background, borderColor: colors.gold },
              ],
            ]}
            onPress={() => handleTabChange("academy")}
          >
            <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
              <Feather
                name="compass"
                size={13}
                color={activeTab === "academy" ? colors.primary : colors.textTertiary}
              />
              <Text
                style={[
                  styles.tabBtnText,
                  { color: activeTab === "academy" ? colors.primary : colors.textTertiary },
                  activeTab === "academy" && styles.activeTabBtnText,
                ]}
              >
                Accademia & Giochi
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content Area */}
      {activeTab === "archive" ? (
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Summary Stats Row */}
          <View
            style={[
              styles.statsRow,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
            ]}
          >
            <View style={styles.statItem}>
              <Text style={[styles.statVal, { color: colors.goldDark }]}>
                {totalDiscovered}
                <Text style={{ fontSize: 13, color: colors.textTertiary }}>
                  /{totalAvailable}
                </Text>
              </Text>
              <Text style={[styles.statLbl, { color: colors.textTertiary }]}>Scoperte</Text>
            </View>

            <View style={[styles.statDivider, { backgroundColor: colors.borderLight }]} />

            <View style={styles.statItem}>
              <Text style={[styles.statVal, { color: colors.goldDark }]}>
                {bookmarkedWords.length}
              </Text>
              <Text style={[styles.statLbl, { color: colors.textTertiary }]}>Salvate</Text>
            </View>

            <View style={[styles.statDivider, { backgroundColor: colors.borderLight }]} />

            <View style={styles.statItem}>
              <Text style={[styles.statVal, { color: colors.goldDark }]}>
                {masteredCount}
              </Text>
              <Text style={[styles.statLbl, { color: colors.textTertiary }]}>Padroneggiate</Text>
            </View>
          </View>

          {/* Search Bar */}
          <View
            style={[
              styles.searchBar,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
            ]}
          >
            <Image
              source={require("@/assets/images/lens-icon.png")}
              style={styles.searchIcon}
              resizeMode="contain"
            />
            <TextInput
              style={[styles.searchInput, { color: colors.primary }]}
              placeholder="Cerca per parola, etimologia o categoria..."
              placeholderTextColor={colors.textTertiary}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCapitalize="none"
              autoCorrect={false}
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery("")} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                <Feather name="x" size={16} color={colors.textTertiary} />
              </TouchableOpacity>
            )}
          </View>

          {/* Controls Bar: Scope Pill + Category Dropdown Button */}
          <View style={styles.controlsRow}>
            {/* Segmented Scope Pill: Tutte vs Salvate */}
            <View
              style={[
                styles.scopeSegment,
                { backgroundColor: colors.surface, borderColor: colors.borderLight },
              ]}
            >
              <TouchableOpacity
                style={[
                  styles.scopeBtn,
                  scopeFilter === "all" && [
                    styles.scopeBtnActive,
                    { backgroundColor: colors.primary },
                  ],
                ]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setScopeFilter("all");
                }}
              >
                <Text
                  style={[
                    styles.scopeBtnText,
                    {
                      color:
                        scopeFilter === "all"
                          ? colors.background
                          : colors.textSecondary,
                    },
                    scopeFilter === "all" && styles.scopeBtnTextActive,
                  ]}
                >
                  Tutte ({totalDiscovered})
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.scopeBtn,
                  scopeFilter === "saved" && [
                    styles.scopeBtnActive,
                    { backgroundColor: colors.gold },
                  ],
                ]}
                onPress={() => {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  setScopeFilter("saved");
                }}
              >
                <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
                  <Image
                    source={require("@/assets/images/star-icon.png")}
                    style={{ width: 14, height: 14 }}
                    resizeMode="contain"
                  />
                  <Text
                    style={[
                      styles.scopeBtnText,
                      {
                        color:
                          scopeFilter === "saved"
                            ? colors.primary
                            : colors.textSecondary,
                      },
                      scopeFilter === "saved" && styles.scopeBtnTextActive,
                    ]}
                  >
                    Salvate ({bookmarkedWords.length})
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* 🏷️ Menu a Tendina Categorie (Scelta Multipla) */}
            <TouchableOpacity
              style={[
                styles.categoryDropdownBtn,
                {
                  backgroundColor: !isAllCategoriesActive
                    ? `${colors.gold}20`
                    : colors.surface,
                  borderColor: !isAllCategoriesActive
                    ? colors.goldDark
                    : colors.borderLight,
                },
              ]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setIsCategoryModalOpen(true);
              }}
            >
              <Text
                style={[
                  styles.categoryDropdownBtnText,
                  {
                    color: !isAllCategoriesActive
                      ? colors.goldDark
                      : colors.textSecondary,
                    fontWeight: !isAllCategoriesActive ? "800" : "600",
                  },
                ]}
                numberOfLines={1}
              >
                {categoryBtnLabel}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Active category tags row when a subset is selected */}
          {!isAllCategoriesActive && (
            <View style={styles.activeTagsRow}>
              <Text style={[styles.activeTagsLabel, { color: colors.textTertiary }]}>
                Filtro categorie:
              </Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 6 }}>
                {selectedCategories.map((cat) => {
                  const catColor = getCategoryColor(cat);
                  return (
                    <TouchableOpacity
                      key={cat}
                      style={[
                        styles.miniTag,
                        { backgroundColor: `${catColor}15`, borderColor: `${catColor}40` },
                      ]}
                      onPress={() => toggleCategory(cat)}
                    >
                      <Text style={[styles.miniTagText, { color: catColor }]}>
                        {getCategoryLabel(cat)} ✕
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  style={[styles.miniTagReset, { borderColor: colors.borderLight }]}
                  onPress={selectAllCategories}
                >
                  <Text style={[styles.miniTagResetText, { color: colors.textTertiary }]}>
                    Resetta
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          {/* Words List */}
          {filteredWords.length > 0 ? (
            <View style={styles.wordsList}>
              {filteredWords.map((word) => {
                const isBookmarked = bookmarkedIds.has(word.id);
                const mastery = wordMastery[word.id] ?? 0;
                const catColor = getCategoryColor(word.category);

                return (
                  <TouchableOpacity
                    key={word.id}
                    activeOpacity={0.85}
                    style={[
                      styles.wordCard,
                      {
                        backgroundColor: colors.surface,
                        borderColor: colors.borderLight,
                      },
                    ]}
                    onPress={() => onSelectWord(word)}
                  >
                    <View style={styles.wordCardContent}>
                      <View style={styles.wordHeaderRow}>
                        <View
                          style={[
                            styles.catBadge,
                            {
                              backgroundColor: `${catColor}15`,
                              borderColor: `${catColor}40`,
                            },
                          ]}
                        >
                          <Text style={[styles.catBadgeText, { color: catColor }]}>
                            {getCategoryLabel(word.category)}
                          </Text>
                        </View>

                        {/* Mastery level indicator */}
                        <View style={styles.masteryRow}>
                          {[1, 2, 3].map((lvl) => (
                            <View
                              key={lvl}
                              style={[
                                styles.masteryPip,
                                {
                                  backgroundColor:
                                    mastery >= lvl ? colors.gold : colors.borderLight,
                                },
                              ]}
                            />
                          ))}
                        </View>
                      </View>

                      <Text style={[styles.wordCardTitle, { color: colors.primary }]}>
                        {word.word}
                      </Text>

                      <Text
                        style={[styles.wordCardEtym, { color: colors.textSecondary }]}
                        numberOfLines={2}
                      >
                        {word.shortEtymology}
                      </Text>
                    </View>

                    {/* Bookmark Toggle */}
                    <TouchableOpacity
                      hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                      style={styles.bookmarkAction}
                      onPress={() => handleBookmarkPress(word)}
                    >
                      <Image
                        source={require("@/assets/images/star-icon.png")}
                        style={[
                          styles.cardStarIcon,
                          !isBookmarked && { opacity: 0.25 },
                        ]}
                        resizeMode="contain"
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            <View
              style={[
                styles.emptyCard,
                { backgroundColor: colors.surface, borderColor: colors.borderLight },
              ]}
            >
              <Image
                source={require("@/assets/images/book.png")}
                style={styles.emptyIcon}
                resizeMode="contain"
              />
              <Text style={[styles.emptyTitle, { color: colors.primary }]}>
                Nessuna parola trovata
              </Text>
              <Text style={[styles.emptySubtitle, { color: colors.textTertiary }]}>
                {searchQuery.trim().length > 0
                  ? "Prova a modificare i termini di ricerca o a selezionare altre categorie."
                  : scopeFilter === "saved"
                  ? "Non hai ancora salvato nessuna parola. Tocca la stella sulle schede per aggiungerla qui."
                  : !isAllCategoriesActive
                  ? "Nessuna parola scoperta nelle categorie selezionate. Prova ad ampliare la selezione."
                  : "Esplora e gioca per svelare l'origine delle parole e riempire il tuo archivio."}
              </Text>
            </View>
          )}
        </ScrollView>
      ) : (
        /* ACADEMY TAB */
        <ScrollView
          style={styles.scrollArea}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.academyBanner}>
            <Text style={[styles.academyTitle, { color: colors.primary }]}>
              Palestra & Modalità di Studio
            </Text>
            <Text style={[styles.academySubtitle, { color: colors.textSecondary }]}>
              Allena la tua memoria etimologica, sfida i tuoi riflessi e scala i tuoi record personali.
            </Text>
          </View>

          {/* GAME 1: FLASHCARDS (STUDY) */}
          <View
            style={[
              styles.gameCard,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
            ]}
          >
            <View style={styles.gameCardHeader}>
              <View
                style={[
                  styles.gameIconBox,
                  { backgroundColor: isDark ? "rgba(2, 132, 199, 0.18)" : "#E0F2FE", borderColor: "#0284C7" },
                ]}
              >
                <Feather name="layers" size={24} color="#0284C7" />
              </View>
              <View style={styles.gameHeaderText}>
                <Text style={[styles.gameName, { color: colors.primary }]}>
                  Studio Flashcard
                </Text>
                <Text style={[styles.gameTagline, { color: "#0284C7" }]}>
                  Ripasso attivo senza timer
                </Text>
              </View>
            </View>

            <Text style={[styles.gameDesc, { color: colors.textTertiary }]}>
              Gira le carte, richiama alla mente l&apos;origine segreta e consolida il tuo livello di padronanza.
            </Text>

            <View style={styles.gameFooterRow}>
              <View style={styles.pillStat}>
                <Text style={[styles.pillStatText, { color: "#0284C7" }]}>
                  {wordsDiscovered.length > 0
                    ? `${wordsDiscovered.length} parole disponibili`
                    : "Nessuna parola scoperta"}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.playBtn,
                  { backgroundColor: colors.primary },
                  wordsDiscovered.length === 0 && { opacity: 0.5 },
                ]}
                disabled={wordsDiscovered.length === 0}
                onPress={() => setShowFlashcards(true)}
              >
                <Text style={[styles.playBtnText, { color: colors.background }]}>
                  Inizia Studio
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* GAME 2: RIPASSO INTELLIGENTE (SPACED REPETITION SRS) */}
          <View
            style={[
              styles.gameCard,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
            ]}
          >
            <View style={styles.gameCardHeader}>
              <View
                style={[
                  styles.gameIconBox,
                  { backgroundColor: isDark ? "rgba(139, 92, 246, 0.18)" : "#EDE9FE", borderColor: "#8B5CF6" },
                ]}
              >
                <MaterialCommunityIcons name="brain" size={26} color="#8B5CF6" />
              </View>
              <View style={styles.gameHeaderText}>
                <Text style={[styles.gameName, { color: colors.primary }]}>
                  Ripasso Intelligente (SRS)
                </Text>
                <Text style={[styles.gameTagline, { color: "#8B5CF6" }]}>
                  Spaced Repetition • Priorità errori e parole fragili
                </Text>
              </View>
            </View>

            <Text style={[styles.gameDesc, { color: colors.textTertiary }]}>
              Algoritmo scientifico basato sul livello di padronanza. Mette alla prova le parole non ancora consolidate e ripete gli errori a intervalli ottimali.
            </Text>

            <View style={styles.gameFooterRow}>
              <View style={styles.pillStat}>
                <Text style={[styles.pillStatText, { color: "#8B5CF6" }]}>
                  {srsDueCount} parole da consolidare
                </Text>
              </View>

              <TouchableOpacity
                style={[styles.playBtn, { backgroundColor: "#8B5CF6" }]}
                onPress={() => onStartGame("srs")}
              >
                <Text style={[styles.playBtnText, { color: "#FFFFFF", fontWeight: "800" }]}>
                  Avvia Ripasso
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* GAME 3: BLITZ CRONO (SPEED TRIVIA) */}
          <View
            style={[
              styles.gameCard,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
            ]}
          >
            <View style={styles.gameCardHeader}>
              <View
                style={[
                  styles.gameIconBox,
                  { backgroundColor: isDark ? "rgba(234, 88, 12, 0.18)" : "#FFEDD5", borderColor: "#EA580C" },
                ]}
              >
                <Ionicons name="flame" size={24} color="#EA580C" />
              </View>
              <View style={styles.gameHeaderText}>
                <Text style={[styles.gameName, { color: colors.primary }]}>
                  Blitz Crono
                </Text>
                <Text style={[styles.gameTagline, { color: "#EA580C" }]}>
                  30 secondi totali • Moltiplicatore combo
                </Text>
              </View>
            </View>

            <Text style={[styles.gameDesc, { color: colors.textTertiary }]}>
              Sfida la clessidra e rispondi prima che scada il tempo. Pura velocità intellettuale.
            </Text>

            <View style={styles.gameFooterRow}>
              <View style={styles.pillStat}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Feather name="award" size={13} color="#EA580C" />
                  <Text style={[styles.pillStatText, { color: "#EA580C" }]}>
                    Record: {blitzRecord}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.playBtn, { backgroundColor: "#EA580C" }]}
                onPress={() => onStartGame("blitz")}
              >
                <Text style={[styles.playBtnText, { color: "#FFFFFF", fontWeight: "800" }]}>
                  Avvia Blitz
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* GAME 3: RANDOM SURVIVAL */}
          <View
            style={[
              styles.gameCard,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
            ]}
          >
            <View style={styles.gameCardHeader}>
              <View
                style={[
                  styles.gameIconBox,
                  { backgroundColor: isDark ? "rgba(5, 150, 105, 0.18)" : "#D1FAE5", borderColor: "#059669" },
                ]}
              >
                <Feather name="shield" size={24} color="#059669" />
              </View>
              <View style={styles.gameHeaderText}>
                <Text style={[styles.gameName, { color: colors.primary }]}>
                  Sfida Sopravvivenza
                </Text>
                <Text style={[styles.gameTagline, { color: "#059669" }]}>
                  3 vite • Tutto il dizionario
                </Text>
              </View>
            </View>

            <Text style={[styles.gameDesc, { color: colors.textTertiary }]}>
              Metti alla prova la tua cultura etimologica senza limiti di tempo. Ogni errore costa un cuore.
            </Text>

            <View style={styles.gameFooterRow}>
              <View style={styles.pillStat}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                  <Feather name="award" size={13} color="#059669" />
                  <Text style={[styles.pillStatText, { color: "#059669" }]}>
                    Record: {randomRecord}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[styles.playBtn, { backgroundColor: "#059669" }]}
                onPress={() => onStartGame("random")}
              >
                <Text style={[styles.playBtnText, { color: "#FFFFFF" }]}>
                  Gioca
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* GAME 4: BOOKMARKS QUIZ */}
          <View
            style={[
              styles.gameCard,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
            ]}
          >
            <View style={styles.gameCardHeader}>
              <View
                style={[
                  styles.gameIconBox,
                  { backgroundColor: isDark ? "rgba(217, 119, 6, 0.18)" : "#FEF3C7", borderColor: "#D97706" },
                ]}
              >
                <Ionicons name="star" size={22} color="#D97706" />
              </View>
              <View style={styles.gameHeaderText}>
                <Text style={[styles.gameName, { color: colors.primary }]}>
                  Quiz dei Preferiti
                </Text>
                <Text style={[styles.gameTagline, { color: "#D97706" }]}>
                  Sessione mirata sui tuoi segnalibri
                </Text>
              </View>
            </View>

            <Text style={[styles.gameDesc, { color: colors.textTertiary }]}>
              Genera una partita personalizzata attingendo solo dalle parole che hai salvato con la stella.
            </Text>

            <View style={styles.gameFooterRow}>
              <View style={styles.pillStat}>
                <Text style={[styles.pillStatText, { color: "#D97706" }]}>
                  {bookmarkedWords.length < 2
                    ? "Salva almeno 2 parole"
                    : `${bookmarkedWords.length} parole salvate`}
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.playBtn,
                  { backgroundColor: colors.primary },
                  bookmarkedWords.length < 2 && { opacity: 0.4 },
                ]}
                disabled={bookmarkedWords.length < 2}
                onPress={() => onStartGame("bookmarks")}
              >
                <Text style={[styles.playBtnText, { color: colors.background }]}>
                  Avvia Quiz
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}

      {/* CATEGORY MULTI-SELECT DROPDOWN MODAL */}
      <Modal
        visible={isCategoryModalOpen}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setIsCategoryModalOpen(false)}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={styles.modalOverlay}
          onPress={() => setIsCategoryModalOpen(false)}
        >
          <View
            style={[
              styles.modalCard,
              { backgroundColor: colors.surface, borderColor: colors.borderLight },
            ]}
            onStartShouldSetResponder={() => true}
          >
            {/* Modal Header */}
            <View style={styles.modalHeader}>
              <View>
                <Text style={[styles.modalTitle, { color: colors.primary }]}>
                  Filtra Categorie
                </Text>
                <Text style={[styles.modalSubtitle, { color: colors.textTertiary }]}>
                  Scelta multipla • Seleziona una o più categorie
                </Text>
              </View>
              <TouchableOpacity
                style={[styles.modalCloseBtn, { borderColor: colors.borderLight }]}
                onPress={() => setIsCategoryModalOpen(false)}
              >
                <Text style={[styles.modalCloseText, { color: colors.textSecondary }]}>✕</Text>
              </TouchableOpacity>
            </View>

            {/* Modal Body: Category list */}
            <ScrollView style={styles.modalScroll} showsVerticalScrollIndicator={false}>
              {/* Option: TUTTI */}
              <TouchableOpacity
                style={[
                  styles.categoryRow,
                  { borderBottomColor: colors.borderLight },
                ]}
                onPress={selectAllCategories}
              >
                <View style={styles.categoryRowLeft}>
                  <View
                    style={[
                      styles.categoryDot,
                      { backgroundColor: isAllCategoriesActive ? colors.gold : colors.borderLight },
                    ]}
                  />
                  <Text
                    style={[
                      styles.categoryRowName,
                      {
                        color: colors.primary,
                        fontWeight: isAllCategoriesActive ? "800" : "600",
                      },
                    ]}
                  >
                    Tutte le categorie
                  </Text>
                </View>

                <View
                  style={[
                    styles.checkbox,
                    {
                      borderColor: isAllCategoriesActive ? colors.gold : colors.borderLight,
                      backgroundColor: isAllCategoriesActive ? colors.gold : "transparent",
                    },
                  ]}
                >
                  {isAllCategoriesActive && (
                    <Text style={[styles.checkMark, { color: colors.primary }]}>✓</Text>
                  )}
                </View>
              </TouchableOpacity>

              {/* Individual categories */}
              {ALL_CATEGORIES.map((cat) => {
                const count = wordsDiscovered.filter((w) => w.category === cat).length;
                const isSelected = isAllCategoriesActive || selectedCategories.includes(cat);
                const catColor = getCategoryColor(cat);

                return (
                  <TouchableOpacity
                    key={cat}
                    style={[
                      styles.categoryRow,
                      { borderBottomColor: colors.borderLight },
                    ]}
                    onPress={() => toggleCategory(cat)}
                  >
                    <View style={styles.categoryRowLeft}>
                      <View style={[styles.categoryDot, { backgroundColor: catColor }]} />
                      <Text
                        style={[
                          styles.categoryRowName,
                          {
                            color: colors.primary,
                            fontWeight: isSelected ? "700" : "500",
                          },
                        ]}
                      >
                        {getCategoryLabel(cat)}
                      </Text>
                      {count > 0 && (
                        <View style={[styles.countPill, { backgroundColor: `${catColor}15` }]}>
                          <Text style={[styles.countPillText, { color: catColor }]}>{count}</Text>
                        </View>
                      )}
                    </View>

                    <View
                      style={[
                        styles.checkbox,
                        {
                          borderColor: isSelected ? colors.gold : colors.borderLight,
                          backgroundColor: isSelected ? colors.gold : "transparent",
                        },
                      ]}
                    >
                      {isSelected && (
                        <Text style={[styles.checkMark, { color: colors.primary }]}>✓</Text>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            {/* Modal Footer */}
            <View style={[styles.modalFooter, { borderTopColor: colors.borderLight }]}>
              <TouchableOpacity
                style={[styles.modalResetBtn, { borderColor: colors.borderLight }]}
                onPress={selectAllCategories}
              >
                <Text style={[styles.modalResetText, { color: colors.textSecondary }]}>
                  Reimposta
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.modalApplyBtn, { backgroundColor: colors.primary }]}
                onPress={() => setIsCategoryModalOpen(false)}
              >
                <Text style={[styles.modalApplyText, { color: colors.background }]}>
                  Applica Filtri
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* FLASHCARD MODAL */}
      <FlashcardModal
        visible={showFlashcards}
        words={
          filteredWords.length > 0
            ? filteredWords
            : wordsDiscovered.length > 0
            ? wordsDiscovered
            : wordsList.slice(0, 20)
        }
        wordMastery={wordMastery}
        onClose={() => setShowFlashcards(false)}
        onUpdateMastery={(id, delta) => onUpdateMastery?.(id, delta)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: SPACING.lg,
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.sm,
    gap: 4,
  },
  title: {
    fontFamily: FONTS.serif,
    fontSize: 28,
    fontWeight: "800",
  },
  subtitle: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    marginBottom: SPACING.sm,
  },
  tabBar: {
    flexDirection: "row",
    padding: 4,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    marginTop: 4,
  },
  tabBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
  },
  activeTabBtn: {
    borderWidth: 1,
    ...SHADOWS.sm,
  },
  tabBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: "600",
  },
  activeTabBtnText: {
    fontWeight: "800",
  },
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    padding: SPACING.lg,
    gap: SPACING.md,
    paddingBottom: 48,
  },
  statsRow: {
    flexDirection: "row",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    paddingVertical: SPACING.md,
    ...SHADOWS.sm,
  },
  statItem: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statVal: {
    fontFamily: FONTS.sans,
    fontSize: 18,
    fontWeight: "800",
  },
  statLbl: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  statDivider: {
    width: 1,
    height: "60%",
    alignSelf: "center",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RADIUS.full,
    borderWidth: 1,
    paddingHorizontal: SPACING.md,
    paddingVertical: 10,
    gap: SPACING.sm,
    ...SHADOWS.sm,
  },
  searchIcon: {
    width: 16,
    height: 16,
    opacity: 0.6,
  },
  searchInput: {
    flex: 1,
    fontFamily: FONTS.sans,
    fontSize: 14,
    paddingVertical: 0,
  },
  clearText: {
    fontSize: 14,
    paddingHorizontal: 4,
  },
  controlsRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: SPACING.sm,
  },
  scopeSegment: {
    flex: 1.2,
    flexDirection: "row",
    padding: 3,
    borderRadius: RADIUS.full,
    borderWidth: 1,
  },
  scopeBtn: {
    flex: 1,
    paddingVertical: 7,
    paddingHorizontal: 6,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
  },
  scopeBtnActive: {
    ...SHADOWS.sm,
  },
  scopeBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 11.5,
    fontWeight: "600",
  },
  scopeBtnTextActive: {
    fontWeight: "800",
  },
  categoryDropdownBtn: {
    paddingVertical: 9,
    paddingHorizontal: 14,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    maxWidth: 150,
  },
  categoryDropdownBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
  },
  activeTagsRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 2,
  },
  activeTagsLabel: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: "600",
  },
  miniTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  miniTagText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "700",
  },
  miniTagReset: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
    borderWidth: 1,
  },
  miniTagResetText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "600",
  },
  wordsList: {
    gap: SPACING.sm,
    marginTop: 4,
  },
  wordCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: SPACING.md,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    justifyContent: "space-between",
    ...SHADOWS.sm,
  },
  wordCardContent: {
    flex: 1,
    gap: 4,
    paddingRight: SPACING.sm,
  },
  wordHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 2,
  },
  catBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    borderWidth: 1,
  },
  catBadgeText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "800",
    textTransform: "uppercase",
  },
  masteryRow: {
    flexDirection: "row",
    gap: 4,
  },
  masteryPip: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  wordCardTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: "800",
  },
  wordCardEtym: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    lineHeight: 17,
  },
  bookmarkAction: {
    padding: 6,
  },
  cardStarIcon: {
    width: 20,
    height: 20,
  },
  bookmarkIcon: {
    fontSize: 22,
  },
  emptyCard: {
    padding: SPACING.xxl,
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    alignItems: "center",
    gap: SPACING.sm,
    marginTop: SPACING.md,
  },
  emptyIcon: {
    width: 64,
    height: 64,
    opacity: 0.35,
    marginBottom: SPACING.xs,
  },
  emptyTitle: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: "800",
    textAlign: "center",
  },
  emptySubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    textAlign: "center",
    lineHeight: 19,
    maxWidth: "90%",
  },
  academyBanner: {
    gap: 4,
    marginBottom: SPACING.xs,
  },
  academyTitle: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: "800",
  },
  academySubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 18,
  },
  gameCard: {
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: SPACING.lg,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  gameCardHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: SPACING.md,
  },
  gameIconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  gameEmoji: {
    fontSize: 22,
  },
  gameHeaderText: {
    flex: 1,
    gap: 2,
  },
  gameName: {
    fontFamily: FONTS.serif,
    fontSize: 18,
    fontWeight: "800",
  },
  gameTagline: {
    fontFamily: FONTS.sans,
    fontSize: 11,
  },
  gameDesc: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    lineHeight: 19,
  },
  gameFooterRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 2,
  },
  pillStat: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: RADIUS.full,
  },
  pillStatText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
  },
  playBtn: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    ...SHADOWS.sm,
  },
  playBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: "700",
  },
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  modalCard: {
    width: "100%",
    maxHeight: "80%",
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: SPACING.lg,
    ...SHADOWS.lg,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: SPACING.md,
  },
  modalTitle: {
    fontFamily: FONTS.serif,
    fontSize: 20,
    fontWeight: "800",
  },
  modalSubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    marginTop: 2,
  },
  modalCloseBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalCloseText: {
    fontSize: 14,
    fontWeight: "700",
  },
  modalScroll: {
    maxHeight: 340,
  },
  categoryRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  categoryRowLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  categoryDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  categoryRowName: {
    fontFamily: FONTS.sans,
    fontSize: 15,
  },
  countPill: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  countPillText: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: "700",
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },
  checkMark: {
    fontSize: 14,
    fontWeight: "900",
  },
  modalFooter: {
    flexDirection: "row",
    gap: SPACING.md,
    paddingTop: SPACING.md,
    marginTop: SPACING.sm,
    borderTopWidth: 1,
  },
  modalResetBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalResetText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: "700",
  },
  modalApplyBtn: {
    flex: 1.5,
    paddingVertical: 12,
    borderRadius: RADIUS.full,
    alignItems: "center",
    justifyContent: "center",
    ...SHADOWS.sm,
  },
  modalApplyText: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: "800",
  },
});
