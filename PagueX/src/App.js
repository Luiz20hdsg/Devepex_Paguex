import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View } from 'react-native';
import { useFonts } from 'expo-font';
import AppNavigator from './navigation/AppNavigator';
import { initializeOneSignal } from './services/onesignal';

const App = () => {
  const [fontsLoaded] = useFonts({
    MaterialIcons: require('../assets/fonts/MaterialIcons.ttf'),
  });

  useEffect(() => {
    initializeOneSignal();
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
};

export default App;