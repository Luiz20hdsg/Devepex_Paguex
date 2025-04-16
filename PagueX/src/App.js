import React, { useEffect, useState } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './navigation/AppNavigator';
import { getData } from './services/storage';
import { initializeOneSignal } from './services/onesignal';

const App = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        await initializeOneSignal();
        const deviceId = await getData('deviceId');
        setInitialRoute(deviceId ? 'MessageList' : 'Login01');
      } catch (error) {
        console.error('Erro ao inicializar app:', error);
        setInitialRoute('Login01');
      }
    };
    initializeApp();
  }, []);

  if (!initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator initialRoute={initialRoute} />
    </NavigationContainer>
  );
};

export default App;