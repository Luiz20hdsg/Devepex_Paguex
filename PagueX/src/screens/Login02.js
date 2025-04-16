import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { verifyAuthCode } from '../services/auth';
import { getDeviceId } from '../services/onesignal';
import { saveData, getData } from '../services/storage';
import { registerDevice } from '../api/api';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const Login02 = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    try {
      const email = await getData('email');
      if (!code || !email) {
        alert('Código ou e-mail inválido');
        return;
      }

      const session = await verifyAuthCode(email, code);
      if (session) {
        const deviceId = await getDeviceId();
        if (!deviceId) {
          alert('Não foi possível obter o ID do dispositivo. Tente novamente.');
          return;
        }

        await saveData('device_id', deviceId);
        await saveData('email', email);

        await registerDevice(email, deviceId);
        navigation.replace('MessageList'); // Usa replace para evitar voltar ao login
      } else {
        alert('Código inválido ou expirado');
      }
    } catch (error) {
      console.error('Erro em Login02:', error);
      alert('Erro ao autenticar. Tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image source={require('../assets/sublogo02.png')} style={styles.sublogo02} />
      <Image source={require('../assets/sublogo5.png')} style={styles.sublogo05} />
      <View style={styles.content}>
        <Image source={require('../assets/sublogo6.png')} style={styles.sublogo06} />
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.text}>Informe o código recebido por e-mail</Text>
        <View style={styles.inputContainer}>
          <Input
            value={code}
            onChangeText={setCode}
            placeholder="Código (ex.: 123456)"
            keyboardType="numeric"
            style={styles.input}
          />
          <Button title="Validar o código" onPress={handleVerify} style={styles.button} textStyle={styles.buttonText} />
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sublogo02: {
    width: width * 0.25,
    height: width * 0.25,
    top: 20,
    right: 0,
    position: 'absolute',
    resizeMode: 'contain',
  },
  sublogo05: {
    width: width * 0.6,
    height: width * 0.6,
    bottom: 0,
    right: 0,
    position: 'absolute',
    resizeMode: 'contain',
  },
  sublogo06: {
    width: width * 0.35,
    height: width * 0.35,
    left: 0,
    position: 'absolute',
    resizeMode: 'contain',
  },
  logo: {
    width: 180.34,
    height: 50.58,
    marginBottom: 20,
  },
  text: {
    width: 281,
    height: 48,
    fontSize: 16,
    textAlign: 'center',
    color: '#fff',
    marginBottom: 20,
  },
  inputContainer: {
    width: 281,
    gap: 10,
  },
  input: {
    height: 40,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 10,
    color: '#000',
  },
  button: {
    height: 40,
    backgroundColor: '#A1C014',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
  },
});

export default Login02;