import React from 'react';
import { View, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../styles/globalStyles';

const Menu = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <WebView
        source={{ uri: 'https://dashboard.paguex.com/login' }}
        style={styles.webview}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        thirdPartyCookiesEnabled={true}
        sharedCookiesEnabled={true}
        cacheEnabled={true}
        startInLoadingState={true}
      />
      <View style={globalStyles.rectangle}>
        <Icon
          name="notifications"
          size={24}
          color="#FFFFFF"
          style={styles.footerButton}
          onPress={() => navigation.navigate('MessageList')}
        />
        <Icon
          name="menu"
          size={24}
          color="#FFFFFF"
          style={styles.footerButton}
        />
        <Icon
          name="settings"
          size={24}
          color="#FFFFFF"
          style={styles.footerButton}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  footerButton: {
    padding: 10,
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#A1C014',
    borderRadius: 8,
  },
});

export default Menu;