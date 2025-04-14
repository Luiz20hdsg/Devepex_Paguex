import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const MessageItem = ({ message, onUpdate }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{message.title}</Text>
      <Text style={styles.message}>{message.message}</Text>
      <TouchableOpacity
        style={[styles.readCircle, message.readed ? styles.readCircleActive : null]}
        onPress={onUpdate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#2E2E2E',
    marginVertical: 5,
    borderRadius: 8,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  readCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    position: 'absolute',
    right: 10,
    top: 10,
  },
  readCircleActive: {
    backgroundColor: '#A1C014',
  },
});

export default MessageItem;