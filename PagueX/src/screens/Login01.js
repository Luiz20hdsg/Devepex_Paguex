import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, KeyboardAvoidingView, Platform } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { sendAuthCode } from '../services/auth';
import { saveData } from '../services/storage';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const Login01 = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return alert('Digite um e-mail válido');
    const success = await sendAuthCode(email);
    if (success) {
      await saveData('email', email);
      navigation.navigate('Login02');
    } else {
      alert('Erro ao enviar código. Verifique o e-mail e tente novamente.');
    }
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image source={require('../assets/sublogo03.png')} style={styles.sublogo03} />
      <Image source={require('../assets/sublogo04.png')} style={styles.sublogo04} />
      <View style={styles.content}>
        <Image source={require('../assets/logo.png')} style={styles.logo} />
        <Text style={styles.text}>Informe seu e-mail de acesso ao Dashboard Pague-X</Text>
        <View style={styles.inputContainer}>
          <Input
            value={email}
            onChangeText={setEmail}
            placeholder="E-mail"
            placeholderTextColor="#ccc"
            keyboardType="email-address"
            style={styles.input}
          />
          <Button title="Enviar" onPress={handleSubmit} style={styles.button} textStyle={styles.buttonText} />
        </View>
      </View>
      <Image source={require('../assets/sublogo02.png')} style={styles.sublogo02} />
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
  sublogo03: {
    width: width * 0.35,
    height: width * 0.35,
    top: 40,
    left: 0,
    position: 'absolute',
    resizeMode: 'contain',
  },
  sublogo04: {
    width: width * 0.6,
    height: width * 0.6,
    bottom: -20,
    right: -20,
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
  sublogo02: {
    width: width * 0.25,
    height: width * 0.25,
    bottom: -45,
    left: width / 2 - width * 0.3,
    position: 'absolute',
    resizeMode: 'contain',
  },
});

export default Login01;
