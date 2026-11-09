import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { WordEntry, WORDS, getWordOfTheDay } from "@/constants/words";
import { ALL_BADGES, Badge } from "@/constants/badges";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { Feather, Ionicons } from "@expo/vector-icons";
import { formatStat } from "@/lib/format-utils";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
  Linking,
  Modal,
  Platform,
  ScrollView,
  Share,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { requestPermissions, scheduleDailyNotification, cancelNotifications } from "@/lib/notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

const NOTIF_TIME_KEY = "@notification_time";
const NOTIF_ENABLED_KEY = "@notification_enabled";

type Props = {
  streak: number;
  maxCombo: number;
  wordsDiscovered: WordEntry[];
  bookmarkedWords: WordEntry[];
  onSelectWord: (word: WordEntry) => void;
  wordMastery: Record<string, number>;
  wordsList?: WordEntry[];
  blitzRecord?: number;
  onExportBackup?: () => Promise<string>;
  onImportBackup?: (json: string) => Promise<{ success: boolean; error?: string }>;
  onResetAllData?: () => Promise<void>;
};

export default function ProfileScreen({
  streak,
  maxCombo,
  wordsDiscovered,
  bookmarkedWords,
  onSelectWord,
  wordMastery,
  wordsList,
  blitzRecord = 0,
  onExportBackup,
  onImportBackup,
  onResetAllData,
}: Props) {
  const totalWords = wordsList?.length || WORDS.length;
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, updateProfile, resetProfile, reloadProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState(
    user?.user_metadata?.full_name || "Studioso Errante",
  );
  const [loading, setLoading] = useState(false);

  // Settings states
  const [notifications, setNotifications] = useState(true);
  const [notificationTime, setNotificationTime] = useState(new Date(new Date().setHours(9, 0, 0, 0)));
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Backup Modal state
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState("");
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showBadgesModal, setShowBadgesModal] = useState(false);

  useEffect(() => {
    loadNotificationSettings();
  }, []);

  useEffect(() => {
    if (user?.user_metadata?.full_name) {
      setNewName(user.user_metadata.full_name);
    }
  }, [user?.user_metadata?.full_name]);

  const loadNotificationSettings = async () => {
    const enabled = await AsyncStorage.getItem(NOTIF_ENABLED_KEY);
    const time = await AsyncStorage.getItem(NOTIF_TIME_KEY);
    if (enabled !== null) setNotifications(enabled === "true");
    if (time !== null) setNotificationTime(new Date(time));
  };

  const handleToggleNotifications = async (value: boolean) => {
    if (value) {
      const granted = await requestPermissions();
      if (!granted) {
        Alert.alert("Permessi negati", "Abilita le notifiche nelle impostazioni del tuo telefono.");
        return;
      }
      await scheduleDailyNotification(notificationTime.getHours(), notificationTime.getMinutes());
    } else {
      await cancelNotifications();
    }
    setNotifications(value);
    await AsyncStorage.setItem(NOTIF_ENABLED_KEY, value.toString());
  };

  const handleTimeChange = async (event: any, selectedDate?: Date) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedDate) {
      setNotificationTime(selectedDate);
      await AsyncStorage.setItem(NOTIF_TIME_KEY, selectedDate.toISOString());
      if (notifications) {
        await scheduleDailyNotification(selectedDate.getHours(), selectedDate.getMinutes());
      }
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    const { error } = await updateProfile({ full_name: newName.trim() });
    if (error) {
      Alert.alert("Errore", error.message || "Impossibile aggiornare il nome.");
    } else {
      setIsEditing(false);
      Alert.alert("Successo", "Nome aggiornato!");
    }
    setLoading(false);
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets[0]) {
      const asset = result.assets[0];
      setLoading(true);
      await updateProfile({ avatar_url: asset.uri });
      setLoading(false);
      Alert.alert("Successo", "Immagine del profilo aggiornata!");
    }
  };

  const handleExport = async () => {
    if (!onExportBackup) return;
    try {
      setLoading(true);
      const backupJson = await onExportBackup();
      await Share.share({
        title: "Etymo_Backup.json",
        message: backupJson,
      });
    } catch (err: any) {
      Alert.alert("Errore", "Impossibile esportare i dati: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleImport = async () => {
    if (!importText.trim()) {
      Alert.alert("Campo vuoto", "Incolla il codice JSON del backup nell'area di testo.");
      return;
    }
    if (!onImportBackup) return;

    Alert.alert(
      "Conferma Ripristino",
      "I tuoi progressi attuali verranno sostituiti da quelli presenti nel backup. Vuoi continuare?",
      [
        { text: "Annulla", style: "cancel" },
        {
          text: "Ripristina Dati",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            const res = await onImportBackup(importText.trim());
            if (res.success) {
              await reloadProfile();
              setLoading(false);
              setShowImportModal(false);
              setImportText("");
              Alert.alert("Completato!", "I tuoi dati sono stati ripristinati con successo!");
            } else {
              setLoading(false);
              Alert.alert("Errore", res.error || "Impossibile leggere il file di backup.");
            }
          },
        },
      ]
    );
  };

  const handleResetAllData = () => {
    Alert.alert(
      "Azzera Progressi",
      "Sei sicuro di voler cancellare tutti i dati locali (streak, parole scoperte, preferiti)? Questa azione non può essere annullata.",
      [
        { text: "Annulla", style: "cancel" },
        {
          text: "Azzera Tutto",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              if (onResetAllData) {
                await onResetAllData();
              } else {
                await AsyncStorage.clear();
              }
              await resetProfile();
              await reloadProfile();
              Alert.alert("Completato", "Tutti i dati locali sono stati azzerati.");
            } catch (err: any) {
              Alert.alert("Errore", "Impossibile azzerare i dati: " + err.message);
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  };

  const masterCount = Object.values(wordMastery).filter((v) => v >= 3).length;

  const getBadgeStatus = (badge: Badge): { isUnlocked: boolean; label: string } => {
    let isUnlocked = false;
    let label = "";

    switch (badge.category) {
      case "words": {
        const req = badge.id === "maestro" ? totalWords : badge.req;
        isUnlocked = wordsDiscovered.length >= req;
        label = isUnlocked ? "Sbloccato" : `${wordsDiscovered.length}/${req} parole`;
        break;
      }
      case "streak":
        isUnlocked = streak >= badge.req;
        label = isUnlocked ? "Sbloccato" : `${streak}/${badge.req} giorni`;
        break;
      case "combo":
        isUnlocked = maxCombo >= badge.req;
        label = isUnlocked ? "Sbloccato" : `${maxCombo}/${badge.req} combo`;
        break;
      case "blitz":
        isUnlocked = blitzRecord >= badge.req;
        label = isUnlocked ? "Sbloccato" : `${blitzRecord}/${badge.req} punti`;
        break;
      case "bookmarks":
        isUnlocked = bookmarkedWords.length >= badge.req;
        label = isUnlocked ? "Sbloccato" : `${bookmarkedWords.length}/${badge.req} salvate`;
        break;
      case "mastery":
        isUnlocked = masterCount >= badge.req;
        label = isUnlocked ? "Sbloccato" : `${masterCount}/${badge.req} maestrie`;
        break;
    }
    return { isUnlocked, label };
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.content}
    >
      <View style={styles.profileHeader}>
        <TouchableOpacity
          onPress={pickImage}
          disabled={loading}
          style={styles.avatarWrapper}
        >
          <View
            style={[
              styles.avatarContainer,
              { backgroundColor: colors.surface, borderColor: colors.gold },
            ]}
          >
            {loading ? (
              <ActivityIndicator size="large" color={colors.gold} style={{ flex: 1 }} />
            ) : (
              <Image
                source={
                  user?.user_metadata?.avatar_url
                    ? { uri: user.user_metadata.avatar_url }
                    : require("@/assets/images/mascotte.png")
                }
                style={[
                  styles.avatar,
                  !user?.user_metadata?.avatar_url && styles.defaultMascotteAvatar,
                ]}
                resizeMode={user?.user_metadata?.avatar_url ? "cover" : "contain"}
              />
            )}
          </View>
          <View style={[styles.editBadge, { backgroundColor: colors.gold }]}>
            <Feather name="camera" size={13} color="#322214" />
          </View>
        </TouchableOpacity>

        {isEditing ? (
          <View style={styles.editContainer}>
            <TextInput
              style={[
                styles.nameInput,
                {
                  color: colors.primary,
                  borderColor: colors.gold,
                  backgroundColor: colors.surface,
                },
              ]}
              value={newName}
              onChangeText={setNewName}
              placeholder="Inserisci il tuo nome"
              placeholderTextColor={colors.textTertiary}
            />
            <View style={styles.editButtons}>
              <TouchableOpacity
                style={[styles.smallBtn, { backgroundColor: colors.gold }]}
                onPress={handleUpdateProfile}
              >
                <Text style={styles.smallBtnText}>Salva</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.smallBtn, { backgroundColor: colors.border }]}
                onPress={() => {
                  setNewName(user?.user_metadata?.full_name || "Studioso Errante");
                  setIsEditing(false);
                }}
              >
                <Text style={[styles.smallBtnText, { color: colors.primary }]}>
                  Annulla
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ alignItems: "center" }}>
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 8 }}
            >
              <Text style={[styles.userName, { color: colors.primary }]}>
                {user?.user_metadata?.full_name || "Studioso Errante"}
              </Text>
              <TouchableOpacity onPress={() => setIsEditing(true)}>
                <Image
                  source={require("@/assets/images/pencil.png")}
                  style={styles.pencilIcon}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.userRank, { color: colors.textTertiary }]}>
              Esploratore delle Origini
            </Text>
          </View>
        )}
      </View>

      <View
        style={[
          styles.statsRow,
          { backgroundColor: colors.surface, borderColor: colors.borderLight },
        ]}
      >
        <View style={styles.statBox}>
          <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
            <Ionicons name="flame" size={18} color="#E55A2B" />
            <Text style={[styles.statValue, { color: colors.goldDark }]}>
              {streak}
            </Text>
          </View>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
            Streak
          </Text>
        </View>
        <View
          style={[styles.statDivider, { backgroundColor: colors.borderLight }]}
        />
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: colors.goldDark }]}>
            {maxCombo}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
            Max Combo
          </Text>
        </View>
        <View
          style={[styles.statDivider, { backgroundColor: colors.borderLight }]}
        />
        <View style={styles.statBox}>
          <Text style={[styles.statValue, { color: colors.goldDark }]}>
            {wordsDiscovered.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textTertiary }]}>
            Scoperte
          </Text>
        </View>
      </View>

      {/* Badges Section Summary Card */}
      <View style={styles.section}>
        <View style={styles.badgeSectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>
            Traguardi
          </Text>
        </View>

        <TouchableOpacity
          style={[
            styles.badgeSummaryCard,
            { backgroundColor: colors.surface, borderColor: colors.borderLight },
          ]}
          onPress={() => setShowBadgesModal(true)}
          activeOpacity={0.7}
        >
          <View
            style={[
              styles.badgeSummaryIconBox,
              {
                backgroundColor: isDark ? "rgba(212, 175, 55, 0.15)" : "rgba(212, 175, 55, 0.12)",
                borderColor: isDark ? "rgba(212, 175, 55, 0.3)" : colors.gold,
              },
            ]}
          >
            <Ionicons name="trophy" size={26} color={colors.goldDark} />
          </View>

          <View style={styles.badgeSummaryContent}>
            <View style={styles.badgeSummaryHeaderRow}>
              <Text
                style={[styles.badgeSummaryTitle, { color: colors.primary }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                Traguardi & Onorificenze
              </Text>
              <View
                style={[
                  styles.badgePillCount,
                  {
                    backgroundColor: isDark ? "rgba(212, 175, 55, 0.18)" : "rgba(212, 175, 55, 0.12)",
                    borderColor: colors.gold,
                    borderWidth: 1,
                  },
                ]}
              >
                <Text style={[styles.badgePillCountText, { color: colors.goldDark }]}>
                  {ALL_BADGES.filter((b) => getBadgeStatus(b).isUnlocked).length}/{ALL_BADGES.length}
                </Text>
              </View>
            </View>

            <Text style={[styles.badgeSummarySubtitle, { color: colors.textSecondary }]}>
              Tocca per visualizzare la bacheca completa e i progressi
            </Text>

            {/* Mini preview icons */}
            <View style={styles.badgeMiniRow}>
              {ALL_BADGES.slice(0, 5).map((b) => {
                const { isUnlocked } = getBadgeStatus(b);
                return (
                  <View
                    key={b.id}
                    style={[
                      styles.badgeMiniCircle,
                      {
                        backgroundColor: isUnlocked
                          ? isDark
                            ? "rgba(212, 175, 55, 0.18)"
                            : "rgba(212, 175, 55, 0.12)"
                          : isDark
                          ? "rgba(255, 255, 255, 0.05)"
                          : "#F3F4F6",
                        borderColor: isUnlocked ? colors.gold : colors.borderLight,
                      },
                    ]}
                  >
                    {b.iconFamily === "Ionicons" ? (
                      <Ionicons
                        name={b.iconName as any}
                        size={15}
                        color={isUnlocked ? colors.goldDark : colors.textTertiary}
                      />
                    ) : (
                      <Feather
                        name={b.iconName as any}
                        size={15}
                        color={isUnlocked ? colors.goldDark : colors.textTertiary}
                      />
                    )}
                  </View>
                );
              })}
              {ALL_BADGES.length > 5 && (
                <View
                  style={[
                    styles.badgeMiniCircle,
                    {
                      backgroundColor: isDark ? "rgba(255, 255, 255, 0.05)" : "#F3F4F6",
                      borderColor: colors.borderLight,
                    },
                  ]}
                >
                  <Text style={[styles.badgeMiniMoreText, { color: colors.textTertiary }]}>
                    +{ALL_BADGES.length - 5}
                  </Text>
                </View>
              )}
            </View>
          </View>

          <Feather name="chevron-right" size={20} color={colors.textTertiary} />
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>
          Impostazioni App
        </Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <View style={styles.row}>
            <View>
              <Text style={[styles.rowLabel, { color: colors.primary }]}>Notifiche</Text>
              <Text style={[styles.rowSub, { color: colors.textTertiary }]}>Promemoria giornaliero</Text>
            </View>
            <Switch 
              value={notifications} 
              onValueChange={handleToggleNotifications}
              trackColor={{ false: colors.border, true: colors.gold }}
            />
          </View>

          {notifications && (
            <TouchableOpacity 
              style={[styles.row, { borderTopWidth: 1, borderColor: colors.borderLight }]}
              onPress={() => setShowTimePicker(true)}
            >
              <View>
                <Text style={[styles.rowLabel, { color: colors.primary }]}>Orario</Text>
                <Text style={[styles.rowSub, { color: colors.textTertiary }]}>
                  {notificationTime.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </Text>
              </View>
              <Image source={require("@/assets/images/pencil.png")} style={styles.pencilIconSmall} />
            </TouchableOpacity>
          )}

          {showTimePicker && (
            <DateTimePicker
              value={notificationTime}
              mode="time"
              is24Hour={true}
              display="default"
              onChange={handleTimeChange}
            />
          )}

          <View style={[styles.row, { borderTopWidth: 1, borderColor: colors.borderLight }]}>
            <View>
              <Text style={[styles.rowLabel, { color: colors.primary }]}>Tema Scuro</Text>
              <Text style={[styles.rowSub, { color: colors.textTertiary }]}>Passa alla modalità notte</Text>
            </View>
            <Switch 
              value={isDark} 
              onValueChange={toggleTheme}
              trackColor={{ false: colors.border, true: colors.gold }}
            />
          </View>

          <TouchableOpacity 
            style={[styles.row, { borderTopWidth: 1, borderColor: colors.borderLight }]}
            onPress={() => setShowPrivacyModal(true)}
          >
            <View>
              <Text style={[styles.rowLabel, { color: colors.primary }]}>Informativa Privacy & Termini</Text>
              <Text style={[styles.rowSub, { color: colors.textTertiary }]}>100% Offline, rispetto e trasparenza dati</Text>
            </View>
            <Feather name="shield" size={18} color={colors.goldDark} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Data Management & Backup Section (100% Local) */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>
          Dati e Backup (Salvataggio Locale)
        </Text>
        <View style={[styles.card, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
          <TouchableOpacity 
            style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.borderLight }]}
            onPress={handleExport}
            disabled={loading}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, { color: colors.primary }]}>Esporta Backup</Text>
              <Text style={[styles.rowSub, { color: colors.textTertiary }]}>
                Condividi o salva i tuoi progressi in formato JSON
              </Text>
            </View>
            <Feather name="upload" size={18} color={colors.goldDark} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={[styles.row, { borderBottomWidth: 1, borderBottomColor: colors.borderLight }]}
            onPress={() => setShowImportModal(true)}
            disabled={loading}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, { color: colors.primary }]}>Importa Backup</Text>
              <Text style={[styles.rowSub, { color: colors.textTertiary }]}>
                Ripristina i progressi da un testo JSON
              </Text>
            </View>
            <Feather name="download" size={18} color={colors.goldDark} />
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.row}
            onPress={handleResetAllData}
            disabled={loading}
          >
            <View style={{ flex: 1 }}>
              <Text style={[styles.rowLabel, { color: "#E53935" }]}>Azzera Dati Locali</Text>
              <Text style={[styles.rowSub, { color: colors.textTertiary }]}>
                Cancella progressi e parole scoperte da questo dispositivo
              </Text>
            </View>
            <Feather name="trash-2" size={18} color="#E53935" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Import Modal */}
      <Modal
        visible={showImportModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowImportModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface, borderColor: colors.borderLight }]}>
            <Text style={[styles.modalTitle, { color: colors.primary }]}>
              Importa Backup
            </Text>
            <Text style={[styles.modalDesc, { color: colors.textSecondary }]}>
              Incolla di seguito il codice JSON del tuo backup salvato:
            </Text>
            <TextInput
              style={[
                styles.importTextInput,
                {
                  color: colors.primary,
                  borderColor: colors.border,
                  backgroundColor: colors.background,
                },
              ]}
              multiline
              numberOfLines={8}
              value={importText}
              onChangeText={setImportText}
              placeholder='{"app": "Etymo", ...}'
              placeholderTextColor={colors.textTertiary}
              textAlignVertical="top"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: colors.gold }]}
                onPress={handleImport}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="#322214" />
                ) : (
                  <Text style={[styles.modalBtnText, { color: "#322214" }]}>
                    Ripristina
                  </Text>
                )}
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, { backgroundColor: "transparent", borderWidth: 1, borderColor: colors.borderLight }]}
                onPress={() => {
                  setShowImportModal(false);
                  setImportText("");
                }}
              >
                <Text style={[styles.modalBtnText, { color: colors.textSecondary }]}>
                  Annulla
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Privacy Policy Modal */}
      <Modal
        visible={showPrivacyModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowPrivacyModal(false)}
      >
        <View style={styles.modalOverlay}>
          {/* Backdrop tap to close */}
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setShowPrivacyModal(false)}
          />

          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.surface,
                borderColor: colors.borderLight,
                height: "82%",
                maxHeight: "85%",
              },
            ]}
          >
            <View style={styles.modalHeaderRow}>
              <Text style={[styles.modalTitle, { color: colors.primary, flex: 1 }]}>
                Informativa Privacy & Termini
              </Text>
              <TouchableOpacity
                onPress={() => setShowPrivacyModal(false)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                style={[
                  styles.modalCloseCircle,
                  { backgroundColor: colors.background, borderColor: colors.borderLight },
                ]}
                accessibilityLabel="Chiudi informativa"
              >
                <Feather name="x" size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{ flex: 1, marginVertical: 10 }}
              contentContainerStyle={{ paddingBottom: 24 }}
              nestedScrollEnabled={true}
            >
              <Text style={{ fontFamily: FONTS.sans, fontSize: 13, lineHeight: 22, color: colors.textSecondary }}>
                <Text style={{ fontWeight: "700", color: colors.primary }}>1. Filosofia 100% Locale{"\n"}</Text>
                Etymo non richiede registrazione ad account remoti né raccoglie credenziali personali. Tutti i tuoi progressi, streak, parole scoperte e preferiti sono memorizzati unicamente all'interno della memoria sicura del tuo smartphone.{"\n\n"}
                <Text style={{ fontWeight: "700", color: colors.primary }}>2. Nessun Tracciamento o Vendita Dati{"\n"}</Text>
                Non monitoriamo la tua attività e non vendiamo né cediamo dati personali a terze parti o inserzionisti. L'esperienza è concepita per essere pura, didattica e rispettosa della tua privacy.{"\n\n"}
                <Text style={{ fontWeight: "700", color: colors.primary }}>3. Notifiche e Permessi{"\n"}</Text>
                Le notifiche quotidiane per la "Parola del Giorno" sono gestite localmente dal tuo dispositivo e non inviano token di notifica all'esterno. La galleria foto è usata esclusivamente se scegli di caricare un avatar personalizzato, che resta sempre solo sul tuo telefono.{"\n\n"}
                <Text style={{ fontWeight: "700", color: colors.primary }}>4. Esportazione e Cancellazione{"\n"}</Text>
                Puoi esportare un backup JSON completo in qualsiasi momento oppure azzerare i tuoi dati con un solo tocco dalla sezione 'Dati e Backup'.{"\n\n"}
                <Text style={{ fontWeight: "700", color: colors.primary }}>5. Termini di Servizio{"\n"}</Text>
                Etymo è fornita per finalità educative e culturali. I testi e le note etimologiche sono curati a scopo divulgativo. Grazie per far parte di questa avventura linguistica!{"\n\n"}
                <Text style={{ fontWeight: "700", color: colors.primary }}>6. Contatti, Trasparenza & Open Source{"\n"}</Text>
                Etymo è un progetto indipendente e open source, pensato con passione per riscoprire la bellezza e le radici storiche delle parole che usiamo ogni giorno.{"\n\n"}
                • <Text style={{ fontWeight: "700", color: colors.primary }}>Codice Sorgente:</Text> Puoi consultare liberamente il repository, esplorare l&apos;architettura o contribuire al progetto su{" "}
                <Text
                  style={{ color: colors.goldDark, textDecorationLine: "underline", fontWeight: "700" }}
                  onPress={() => Linking.openURL("https://github.com/EleonoraGiangrandi/Etymo").catch(() => {})}
                >
                  GitHub (EleonoraGiangrandi/Etymo)
                </Text>
                .{"\n\n"}
                • <Text style={{ fontWeight: "700", color: colors.primary }}>Feedback & Suggerimenti:</Text> Hai idee per nuovi vocaboli, curiosità storiche o riscontri sull&apos;applicazione? Saremo lieti di leggerti all&apos;indirizzo{" "}
                <Text
                  style={{ color: colors.goldDark, textDecorationLine: "underline", fontWeight: "700" }}
                  onPress={() => Linking.openURL("mailto:app.breasy@gmail.com?subject=Feedback%20Etymo").catch(() => {})}
                >
                  app.breasy@gmail.com
                </Text>
                . Risponderemo con piacere!
              </Text>
            </ScrollView>

            <TouchableOpacity
              style={[styles.privacyCloseBtn, { backgroundColor: colors.gold }]}
              onPress={() => setShowPrivacyModal(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.privacyCloseBtnText, { color: "#322214" }]}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Badges Modal */}
      <Modal
        visible={showBadgesModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setShowBadgesModal(false)}
      >
        <View style={styles.modalOverlay}>
          {/* Backdrop tap to close */}
          <TouchableOpacity
            style={StyleSheet.absoluteFill}
            activeOpacity={1}
            onPress={() => setShowBadgesModal(false)}
          />

          <View
            style={[
              styles.modalContent,
              {
                backgroundColor: colors.surface,
                borderColor: colors.borderLight,
                height: "82%",
                maxHeight: "85%",
              },
            ]}
          >
            <View style={styles.modalHeaderRow}>
              <View style={styles.badgesModalHeaderTitleBox}>
                <Ionicons name="trophy" size={24} color={colors.goldDark} style={{ flexShrink: 0 }} />
                <View style={{ flex: 1, marginRight: SPACING.xs }}>
                  <Text
                    style={[styles.modalTitle, { color: colors.primary, fontSize: 17 }]}
                    numberOfLines={1}
                    ellipsizeMode="tail"
                  >
                    Traguardi & Onorificenze
                  </Text>
                  <Text style={{ fontFamily: FONTS.sans, fontSize: 12, color: colors.textSecondary }} numberOfLines={1}>
                    {ALL_BADGES.filter((b) => getBadgeStatus(b).isUnlocked).length} di {ALL_BADGES.length} sbloccati
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setShowBadgesModal(false)}
                hitSlop={{ top: 12, bottom: 12, left: 12, right: 12 }}
                style={[
                  styles.modalCloseCircle,
                  { backgroundColor: colors.background, borderColor: colors.borderLight, flexShrink: 0 },
                ]}
                accessibilityLabel="Chiudi traguardi"
              >
                <Feather name="x" size={18} color={colors.textSecondary} />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={true}
              style={{ flex: 1, marginVertical: 8 }}
              contentContainerStyle={styles.badgesModalGrid}
              nestedScrollEnabled={true}
            >
              {ALL_BADGES.map((b) => {
                const { isUnlocked, label } = getBadgeStatus(b);
                return (
                  <View
                    key={b.id}
                    style={[
                      styles.modalBadgeCard,
                      !isUnlocked && styles.lockedBadge,
                      {
                        backgroundColor: colors.background,
                        borderColor: isUnlocked ? colors.gold : colors.borderLight,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.modalBadgeIconCircle,
                        {
                          backgroundColor: isUnlocked
                            ? isDark
                              ? "rgba(212, 175, 55, 0.18)"
                              : "rgba(212, 175, 55, 0.12)"
                            : isDark
                            ? "rgba(255, 255, 255, 0.05)"
                            : "#F3F4F6",
                          borderColor: isUnlocked ? colors.gold : colors.borderLight,
                        },
                      ]}
                    >
                      {b.iconFamily === "Ionicons" ? (
                        <Ionicons
                          name={b.iconName as any}
                          size={24}
                          color={isUnlocked ? colors.goldDark : colors.textTertiary}
                        />
                      ) : (
                        <Feather
                          name={b.iconName as any}
                          size={24}
                          color={isUnlocked ? colors.goldDark : colors.textTertiary}
                        />
                      )}
                    </View>

                    <Text
                      style={[styles.modalBadgeName, { color: colors.primary }]}
                      numberOfLines={1}
                    >
                      {b.name}
                    </Text>

                    <Text
                      style={[styles.modalBadgeDesc, { color: colors.textSecondary }]}
                      numberOfLines={2}
                    >
                      {b.id === "maestro"
                        ? `Scopri l'intero patrimonio di tutte le ${totalWords} parole`
                        : b.desc}
                    </Text>

                    <View
                      style={[
                        styles.badgeStatusPill,
                        {
                          backgroundColor: isUnlocked
                            ? isDark
                              ? "rgba(212, 175, 55, 0.18)"
                              : "rgba(212, 175, 55, 0.12)"
                            : isDark
                            ? "rgba(255, 255, 255, 0.06)"
                            : "#F3F4F6",
                          borderColor: isUnlocked ? colors.gold : colors.borderLight,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          styles.badgeStatusText,
                          { color: isUnlocked ? colors.goldDark : colors.textTertiary },
                        ]}
                        numberOfLines={1}
                      >
                        {label}
                      </Text>
                    </View>
                  </View>
                );
              })}
            </ScrollView>

            <TouchableOpacity
              style={[styles.privacyCloseBtn, { backgroundColor: colors.gold }]}
              onPress={() => setShowBadgesModal(false)}
              activeOpacity={0.8}
            >
              <Text style={[styles.privacyCloseBtnText, { color: "#322214" }]}>Chiudi</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={styles.footer}>
        <Text style={[styles.version, { color: colors.textTertiary }]}>Etymo v1.0.0 • Open Source</Text>
        <Text style={[styles.madeBy, { color: colors.textTertiary }]}>100% Offline • Esplora le origini, comprendi il presente.</Text>
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
  profileHeader: {
    alignItems: "center",
    gap: SPACING.sm,
  },
  avatarWrapper: {
    position: "relative",
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.md,
  },
  avatar: {
    width: "100%",
    height: "100%",
  },
  defaultMascotteAvatar: {
    width: "82%",
    height: "82%",
    transform: [{ translateY: -2 }],
  },
  editBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#fff",
  },
  editBadgeIcon: {
    fontSize: 16,
  },
  userName: {
    fontFamily: FONTS.serif,
    fontSize: 24,
    fontWeight: "800",
  },
  pencilIcon: {
    width: 18,
    height: 18,
  },
  pencilIconSmall: {
    width: 16,
    height: 16,
    opacity: 0.7,
  },
  userRank: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    fontWeight: "600",
  },
  editContainer: {
    width: "100%",
    alignItems: "center",
    gap: SPACING.sm,
  },
  nameInput: {
    width: "80%",
    height: 44,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    fontFamily: FONTS.sans,
    fontSize: 16,
    textAlign: "center",
  },
  editButtons: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  smallBtn: {
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.xs,
    borderRadius: RADIUS.sm,
  },
  smallBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
  },
  statsRow: {
    flexDirection: "row",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    paddingVertical: SPACING.md,
    ...SHADOWS.sm,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    gap: 2,
  },
  statValue: {
    fontFamily: FONTS.sans,
    fontSize: 20,
    fontWeight: "800",
  },
  statLabel: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  statDivider: {
    width: 1,
    height: "60%",
    alignSelf: "center",
  },
  section: {
    gap: SPACING.sm,
  },
  sectionTitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginLeft: SPACING.xs,
  },
  badgeSectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  badgeSummaryCard: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    padding: SPACING.md,
    gap: SPACING.md,
    ...SHADOWS.sm,
  },
  badgeSummaryIconBox: {
    width: 48,
    height: 48,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeSummaryContent: {
    flex: 1,
    gap: 4,
  },
  badgeSummaryHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  badgeSummaryTitle: {
    flex: 1,
    fontFamily: FONTS.serif,
    fontSize: 15,
    fontWeight: "700",
    marginRight: 4,
  },
  badgeSummarySubtitle: {
    fontFamily: FONTS.sans,
    fontSize: 12,
  },
  badgePillCount: {
    flexShrink: 0,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: RADIUS.full,
  },
  badgePillCountText: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    fontWeight: "800",
  },
  badgeMiniRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 4,
  },
  badgeMiniCircle: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeMiniMoreText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "700",
  },
  badgesModalHeaderTitleBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    marginRight: SPACING.xs,
  },
  badgesModalGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
    paddingVertical: SPACING.xs,
    justifyContent: "space-between",
  },
  modalBadgeCard: {
    width: "48%",
    borderRadius: RADIUS.md,
    borderWidth: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xs,
    alignItems: "center",
    gap: 4,
    ...SHADOWS.sm,
  },
  modalBadgeIconCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  modalBadgeName: {
    fontFamily: FONTS.sans,
    fontSize: 13,
    fontWeight: "700",
    textAlign: "center",
  },
  modalBadgeDesc: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    textAlign: "center",
    lineHeight: 14,
    minHeight: 28,
  },
  badgeStatusPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: RADIUS.full,
    borderWidth: 0.5,
    marginTop: 4,
  },
  badgeStatusText: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "700",
  },
  badgesGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: SPACING.sm,
  },
  badge: {
    width: "31%",
    minWidth: 100,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.xs,
    alignItems: "center",
    gap: 4,
    ...SHADOWS.sm,
  },
  lockedBadge: {
    opacity: 0.45,
  },
  badgeIcon: {
    fontSize: 28,
    marginBottom: 2,
  },
  badgeName: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
    textAlign: "center",
  },
  badgeReq: {
    fontFamily: FONTS.sans,
    fontSize: 10,
    fontWeight: "600",
  },
  card: {
    borderRadius: RADIUS.lg,
    borderWidth: 1,
    overflow: "hidden",
    ...SHADOWS.sm,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.md,
    paddingVertical: SPACING.md,
  },
  rowLabel: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: "600",
  },
  rowSub: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    padding: SPACING.lg,
  },
  modalContent: {
    width: "100%",
    borderRadius: RADIUS.xl,
    borderWidth: 1,
    padding: SPACING.xl,
    gap: SPACING.md,
    ...SHADOWS.lg,
  },
  modalHeaderRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  modalCloseCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalTitle: {
    fontFamily: FONTS.serif,
    fontSize: 22,
    fontWeight: "800",
  },
  modalDesc: {
    fontFamily: FONTS.sans,
    fontSize: 14,
    lineHeight: 20,
  },
  importTextInput: {
    height: 150,
    borderWidth: 1,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontFamily: Platform.OS === "ios" ? "Courier" : "monospace",
    fontSize: 12,
  },
  modalButtons: {
    flexDirection: "row",
    gap: SPACING.md,
    marginTop: SPACING.sm,
  },
  modalBtn: {
    flex: 1,
    height: 48,
    borderRadius: RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
  },
  modalBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: "700",
  },
  privacyCloseBtn: {
    height: 44,
    borderRadius: RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    minWidth: 160,
    paddingHorizontal: SPACING.xl,
    marginTop: SPACING.sm,
  },
  privacyCloseBtnText: {
    fontFamily: FONTS.sans,
    fontSize: 15,
    fontWeight: "800",
  },
  footer: {
    alignItems: "center",
    gap: 4,
    marginTop: SPACING.md,
  },
  version: {
    fontFamily: FONTS.sans,
    fontSize: 12,
    fontWeight: "700",
  },
  madeBy: {
    fontFamily: FONTS.sans,
    fontSize: 11,
    textAlign: "center",
  },
});
