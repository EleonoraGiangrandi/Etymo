import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import { getCachedWords } from './words-db';

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
}

export async function requestPermissions() {
  if (Platform.OS === 'web') return false;
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
  const randomEntry = activeWords && activeWords.length > 0
    ? activeWords[Math.floor(Math.random() * activeWords.length)]
    : null;
  const randomWord = randomEntry?.word || "cultura";

  await Notifications.scheduleNotificationAsync({
    content: {
      title: "🧐 Curiosità Etimologica",
      body: `Sai da dove deriva la parola "${randomWord}"? Scoprilo ora!`,
      data: { screen: 'game' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour,
      minute,
    },
  });
}

export async function cancelNotifications() {
  if (Platform.OS === 'web') return;
  await Notifications.cancelAllScheduledNotificationsAsync();
}

