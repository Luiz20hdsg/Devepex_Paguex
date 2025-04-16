import * as Notifications from 'expo-notifications';

export const initializeOneSignal = async () => {
  try {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
      }),
    });
    console.log('Expo Notifications inicializado');
  } catch (error) {
    console.error('Erro ao inicializar Expo Notifications:', error);
  }
};

export const getDeviceId = async () => {
  try {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus === 'granted') {
      const token = await Notifications.getDevicePushTokenAsync();
      return token.data;
    }
    console.warn('Permissões de notificação não concedidas');
    return null;
  } catch (error) {
    console.error('Erro ao obter Device ID:', error);
    return null;
  }
};