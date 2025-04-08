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
    
    try {
      const authData = await verifyAuthCode(email, code);
      if (authData) {
        const deviceId = await getDeviceId();
        await saveData('device_id', deviceId);
        await saveData('auth_tokens', JSON.stringify(authData)); // Salva tokens
        
        
        await axios.post('https://api.paguex.com/auth', {
          email,
          device_ID: deviceId
        });
        
        navigation.navigate('MessageList');
      }
    } catch (error) {
      alert('Código inválido ou expirado');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Image source={require('../assets/logo.png')} style={globalStyles.logo} />
      <Text style={styles.text}>Informe o código recebido por e-mail</Text>
      <View style={styles.inputContainer}>
        <Input value={code} onChangeText={setCode} placeholder="Código" />
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