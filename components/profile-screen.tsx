import { COLORS, FONTS, RADIUS, SHADOWS, SPACING } from "@/constants/theme";
import { WordEntry, WORDS } from "@/constants/words";
import { useAuth } from "@/context/auth-context";
import { useTheme } from "@/context/theme-context";
import { formatStat } from "@/lib/format-utils";
import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  Alert,
  Image,
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
  onResetOnboarding?: () => void;
  wordsList?: WordEntry[];
  onExportBackup?: () => Promise<string>;
  onImportBackup?: (json: string) => Promise<{ success: boolean; error?: string }>;
};

export default function ProfileScreen({
  streak,
  maxCombo,
  wordsDiscovered,
  bookmarkedWords,
  onSelectWord,
  wordMastery,
  onResetOnboarding,
  wordsList,
  onExportBackup,
  onImportBackup,
}: Props) {
  const totalWords = wordsList?.length || WORDS.length;
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, updateProfile, resetProfile } = useAuth();
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

  const handleResetOnboarding = async () => {
    Alert.alert(
      "Rivedi Introduzione",
      "Vuoi visualizzare subito l'introduzione dell'applicazione?",
      [
        { text: "Annulla", style: "cancel" },
        { 
          text: "Sì, mostra", 
          onPress: async () => {
            if (onResetOnboarding) {
              onResetOnboarding();
            } else {
              try {
                await AsyncStorage.removeItem("@has_seen_onboarding");
                Alert.alert("Configurato!", "Riavvia l'applicazione per vedere l'introduzione.");
              } catch (e) {
                Alert.alert("Errore", "Impossibile resettare l'introduzione.");
              }
            }
          }
        }
      ]
    );
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
            setLoading(false);
            if (res.success) {
              setShowImportModal(false);
              setImportText("");
              Alert.alert("Completato!", "I tuoi dati sono stati ripristinati con successo!");
            } else {
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
            await AsyncStorage.clear();
            await resetProfile();
            Alert.alert("Completato", "Tutti i dati locali sono stati azzerati.");
          },
        },
      ]
    );
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
                style={styles.avatar}
              />
            )}
          </View>
          <View style={[styles.editBadge, { backgroundColor: colors.gold }]}>
            <Text style={styles.editBadgeIcon}>📷</Text>
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
          <Text style={[styles.statValue, { color: colors.goldDark }]}>
            {streak}
          </Text>
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

      {/* Badges Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textTertiary }]}>
          Traguardi
        </Text>
        <View style={styles.badgesGrid}>
          <View
            style={[
              styles.badge,
              wordsDiscovered.length < 3 && styles.lockedBadge,
              { 
                backgroundColor: colors.surface, 
                borderColor: wordsDiscovered.length >= 3 ? colors.gold : colors.borderLight 
              },
            ]}
          >
            <Text style={styles.badgeIcon}>🎓</Text>
            <Text style={[styles.badgeName, { color: colors.primary }]}>
              Novizio
            </Text>
            <Text style={[styles.badgeReq, { color: wordsDiscovered.length >= 3 ? colors.goldDark : colors.textTertiary }]}>
              {wordsDiscovered.length >= 3 ? "Sbloccato" : "3 parole"}
            </Text>
          </View>
          <View
            style={[
              styles.badge,
              wordsDiscovered.length < Math.floor(totalWords * 0.5) && styles.lockedBadge,
              {
                backgroundColor: colors.surface,
                borderColor: wordsDiscovered.length >= Math.floor(totalWords * 0.5) ? colors.gold : colors.borderLight,
              },
            ]}
          >
            <Text style={styles.badgeIcon}>🏺</Text>
            <Text style={[styles.badgeName, { color: colors.primary }]}>
              Archeologo
            </Text>
            <Text style={[styles.badgeReq, { color: wordsDiscovered.length >= Math.floor(totalWords * 0.5) ? colors.goldDark : colors.textTertiary }]}>
              {wordsDiscovered.length >= Math.floor(totalWords * 0.5) ? "Sbloccato" : `${Math.floor(totalWords * 0.5)} parole`}
            </Text>
          </View>
          <View
            style={[
              styles.badge,
              wordsDiscovered.length < Math.floor(totalWords * 0.8) && styles.lockedBadge,
              {
                backgroundColor: colors.surface,
                borderColor: wordsDiscovered.length >= Math.floor(totalWords * 0.8) ? colors.gold : colors.borderLight,
              },
            ]}
          >
            <Text style={styles.badgeIcon}>⚔️</Text>
            <Text style={[styles.badgeName, { color: colors.primary }]}>
              Guerriero
            </Text>
            <Text style={[styles.badgeReq, { color: wordsDiscovered.length >= Math.floor(totalWords * 0.8) ? colors.goldDark : colors.textTertiary }]}>
              {wordsDiscovered.length >= Math.floor(totalWords * 0.8) ? "Sbloccato" : `${Math.floor(totalWords * 0.8)} parole`}
            </Text>
          </View>
        </View>
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
            onPress={handleResetOnboarding}
          >
            <View>
              <Text style={[styles.rowLabel, { color: colors.primary }]}>Rivedi Introduzione</Text>
              <Text style={[styles.rowSub, { color: colors.textTertiary }]}>Mostra di nuovo le schermate iniziali</Text>
            </View>
            <Text style={{ fontSize: 16 }}>🚀</Text>
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
            <Text style={{ fontSize: 18 }}>📤</Text>
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
            <Text style={{ fontSize: 18 }}>📥</Text>
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
            <Text style={{ fontSize: 18 }}>🗑️</Text>
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
  badgesGrid: {
    flexDirection: "row",
    gap: SPACING.sm,
  },
  badge: {
    flex: 1,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    padding: SPACING.sm,
    alignItems: "center",
    gap: 4,
    ...SHADOWS.sm,
  },
  lockedBadge: {
    opacity: 0.5,
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
