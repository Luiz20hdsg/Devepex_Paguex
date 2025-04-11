import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
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
      {/* Rodapé */}
      <View style={styles.footer}>
        <Image source={require('../assets/sublogo01.png')} style={styles.sublogo} />
        <View style={styles.footerIcons}>
          <View style={styles.footerButton}>
            <Icon
              name="notifications"
              size={22}
              color="#FFFFFF"
              onPress={() => navigation.navigate('MessageList')}
            />
          </View>
          <View style={[styles.footerButton, { backgroundColor: '#A1C014' }]}>
            <Icon
              name="menu"
              size={22}
              color="#1E1E1E"
              onPress={() => navigation.navigate('Menu')}
            />
          </View>
          <View style={styles.footerButton}>
            <Icon
              name="settings"
              size={22}
              color="#FFFFFF"
              onPress={() => navigation.navigate('Settings')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  webview: {
    flex: 1,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#2E2E2E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sublogo: {
    width: 45,
    height: 40,
    resizeMode: 'contain',
  },
  footerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  footerButton: {
    width: 55,
    height: 55,
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;
