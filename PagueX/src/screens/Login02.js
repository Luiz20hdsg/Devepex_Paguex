import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { verifyAuthCode } from '../services/auth';
import { getDeviceId } from '../services/onesignal';
import { saveData, getData } from '../services/storage';
import { registerDevice } from '../api/api';
import { globalStyles } from '../styles/globalStyles';

const Login02 = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    const email = await getData('email');
    if (!code || !email) return alert('Código ou e-mail inválido');
    const session = await verifyAuthCode(email, code);
    if (session) {
      const deviceId = await getDeviceId();
      await saveData('device_id', deviceId);
      await saveData('email', email); // Já salvo, mas mantido para consistência
      await registerDevice(email, deviceId);
      navigation.navigate('MessageList');
    } else {
      alert('Código inválido ou expirado');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Image source={require('../assets/logo.png')} style={globalStyles.logo} />
      <Text style={styles.text}>Informe o código recebido por e-mail</Text>
      <View style={styles.inputContainer}>
        <Input
          value={code}
          onChangeText={setCode}
          placeholder="Código (ex.: 123456)"
          keyboardType="numeric" // Para facilitar entrada de números
        />
        <Button title="Validar o código" onPress={handleVerify} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    ...globalStyles.text,
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    width: '80%',
    alignSelf: 'center',
    gap: 10,
  },
});

export default Login02;