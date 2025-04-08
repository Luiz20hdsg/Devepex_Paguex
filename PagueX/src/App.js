import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppNavigator from './navigation/AppNavigator';
import { initializeOneSignal } from './services/onesignal';

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