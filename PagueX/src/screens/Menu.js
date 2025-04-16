import React from 'react';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const Menu = ({ navigation }) => {
  return (
    <View style={globalStyles.container}>
      <WebView
        source={{ uri: 'http://app.inpagamentos.com' }}
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
              size={width * 0.055}
              color="#FFFFFF"
              onPress={() => navigation.navigate('MessageList')}
            />
          </View>
          <View style={[styles.footerButton, { backgroundColor: '#A1C014' }]}>
            <Icon name="menu" size={width * 0.055} color="#1E1E1E" />
          </View>
          <View style={styles.footerButton}>
            <Icon
              name="settings"
              size={width * 0.055}
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
    height: height * 0.08, 
    backgroundColor: '#2E2E2E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.025,
  },
  sublogo: {
    width: width * 0.12, 
    height: height * 0.06, 
    resizeMode: 'contain',
  },
  footerIcons: {
    flexDirection: 'row',
    gap: width * 0.0125,
  },
  footerButton: {
    width: width * 0.12, 
    height: width * 0.12, 
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#A1C014', 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Menu;
