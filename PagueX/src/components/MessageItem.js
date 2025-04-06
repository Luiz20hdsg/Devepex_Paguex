import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { markMessageAsRead } from '../api/api';
import { globalStyles } from '../styles/globalStyles';

const MessageItem = ({ message, onUpdate }) => {
  const handlePress = async () => {
    if (!message.readed) {
      await markMessageAsRead(message.id);
      onUpdate();
    }
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.container}>
      <Text style={[globalStyles.text, { fontWeight: message.readed ? 'normal' : 'bold' }]}>
        {message.title}
      </Text>
      <Text style={globalStyles.text}>{message.message}</Text>
      <Text style={globalStyles.text}>{message.date}</Text>
    </TouchableOpacity>
  );
};

const styles = {
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#A1C014',
  },
};

export default MessageItem;