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
    color: '#FFFFFF', 
    fontSize: 16,
  },
  blackText: {
    color: '#000000', 
  },
  darkText: {
    color: '#2E2E2E', 
  },
});

export default Button;