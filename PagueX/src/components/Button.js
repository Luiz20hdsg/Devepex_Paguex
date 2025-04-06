import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { globalStyles } from '../styles/globalStyles';

const Button = ({ title, onPress, style }) => (
  <TouchableOpacity style={[globalStyles.button, style]} onPress={onPress}>
    <Text style={globalStyles.text}>{title}</Text>
  </TouchableOpacity>
);

export default Button;