import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getCachedWords } from './words-db';
import { getWordOfTheDay } from '../constants/words';

if (Platform.OS !== 'web') {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: false,
      shouldShowBanner: true,
      shouldShowList: true,
    }),
  });

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'Promemoria Etymo',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#D4AF37',
    });
  }
}

export async function requestPermissions() {
  if (Platform.OS === 'web') return false;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'Promemoria Etymo',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#D4AF37',
    });
  }

  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  return finalStatus === 'granted';
}

export async function scheduleDailyNotification(hour: number, minute: number) {
  if (Platform.OS === 'web') return;
  await Notifications.cancelAllScheduledNotificationsAsync();

  const activeWords = await getCachedWords();
  const todayEntry = getWordOfTheDay(activeWords && activeWords.length > 0 ? activeWords : undefined);
  const targetWord = todayEntry?.word || "cultura";

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Curiosità Etimologica",
      body: `Sai da dove deriva la parola "${targetWord}"? Scoprilo ora!`,
      data: { screen: 'game', wordId: todayEntry?.id },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
      channelId: 'default',
    },
  });
}

export async function sendImmediateTestNotification(wordEntry?: { id: string; word: string }) {
  if (Platform.OS === 'web') return false;

  const hasPermission = await requestPermissions();
  if (!hasPermission) return false;

  let target = wordEntry;
  if (!target) {
    const activeWords = await getCachedWords();
    target = getWordOfTheDay(activeWords && activeWords.length > 0 ? activeWords : undefined);
  }

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Curiosità Etimologica",
      body: `Sai da dove deriva la parola "${target.word}"? Scoprilo ora!`,
      data: { screen: 'game', wordId: target.id },
      sound: true,
    },
    trigger: null,
  });

  return true;
}

export async function cancelNotifications() {
  if (Platform.OS === 'web') return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}
