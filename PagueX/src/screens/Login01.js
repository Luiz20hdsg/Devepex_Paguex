import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import { sendAuthCode } from '../services/auth';
import { saveData } from '../services/storage';
import { globalStyles } from '../styles/globalStyles';

const Login01 = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) return alert('Digite um e-mail válido');
    const success = await sendAuthCode(email);
    if (success) {
      await saveData('email', email);
      navigation.navigate('Login02');
    } else {
      alert('Erro ao enviar código. Tente novamente.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <Image source={require('../assets/logo.png')} style={globalStyles.logo} />
      <Text style={styles.text}>Informe seu e-mail de acesso ao Dashboard Pague-X</Text>
      <View style={styles.inputContainer}>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="E-mail"
          keyboardType="email-address"
        />
        <Button title="Enviar" onPress={handleSubmit} />
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

export default Login01;