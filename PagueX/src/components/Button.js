import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const Button = ({ title, onPress, style }) => {
  const isGreenBackground = style && style.backgroundColor === '#A1C014'; // Detecta fundo #A1C014
  const isWhiteBackground = style && style.backgroundColor === '#FFFFFF'; // Detecta fundo branco
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text
        style={[
          styles.text,
          isGreenBackground ? styles.blackText : null,
          isWhiteBackground ? styles.darkText : null,
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF', // Padrão: texto branco
    fontSize: 16,
  },
  blackText: {
    color: '#000000', // Texto preto para fundo #A1C014
  },
  darkText: {
    color: '#2E2E2E', // Texto #2E2E2E para fundo branco (usado em MessageList)
  },
});

export default Button;