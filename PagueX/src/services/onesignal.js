import * as Notifications from 'expo-notifications';

export const initializeOneSignal = async () => {
  await Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
  });
};

export const getDeviceId = async () => {
  try {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status === 'granted') {
      const token = await Notifications.getDevicePushTokenAsync();
      return token.data;
    }
    return null;
  } catch (error) {
    console.error('Erro ao obter Device ID:', error);
    return null;
  }
};