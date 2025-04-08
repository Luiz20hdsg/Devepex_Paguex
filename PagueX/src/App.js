import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import * as Linking from 'expo-linking';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './navigation/AppNavigator';
import { initializeOneSignal } from './services/onesignal';
import { handleDeepLinkAuth } from './services/auth';

const App = () => {
  const [fontsLoaded] = useFonts({
    MaterialIcons: require('../assets/fonts/MaterialIcons.ttf'),
  });
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkDeviceId = async () => {
      const deviceId = await AsyncStorage.getItem('device_id');
      if (deviceId) {
        setInitialRoute('MessageList');
      } else {
        setInitialRoute('Login01');
      }
    };
    checkDeviceId();
    initializeOneSignal();

    // Configurar listener para deep links
    const handleUrl = async ({ url }) => {
      if (url) {
        const session = await handleDeepLinkAuth(url);
        if (session) {
          const email = session.user.email;
          const deviceId = await getDeviceId();
          await saveData('device_id', deviceId);
          await saveData('email', email);
          try {
            await registerDevice(email, deviceId);
          } catch (error) {
            console.error('Erro ao registrar dispositivo ignorado:', error.message);
          }
          setInitialRoute('MessageList');
        }
      }
    };

    Linking.addEventListener('url', handleUrl);
    Linking.getInitialURL().then((url) => url && handleUrl({ url }));

    return () => Linking.removeAllListeners('url');
  }, []);

  if (!fontsLoaded || !initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator initialRouteName={initialRoute} />
    </NavigationContainer>
  );
};

export default App;