import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MessageItem from '../components/MessageItem';
import Button from '../components/Button';
import { getMessages } from '../api/api';
import { getData } from '../services/storage';
import { globalStyles } from '../styles/globalStyles';

const MessageList = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchMessages = async (days = 1, newPage = 1) => {
    const email = await getData('email');
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];
    const data = await getMessages(email, startDate, endDate, newPage);
    if (data) {
      setMessages(newPage === 1 ? data.messages : [...messages, ...data.messages]);
      setHasNextPage(data.nextPage);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const handleRangeChange = (days) => {
    setRange(days);
    setPage(1);
    fetchMessages(days);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchMessages(range, nextPage);
  };

  return (
    <View style={globalStyles.container}>
      <Text style={styles.title}>Lista de mensagens</Text>
      <View style={styles.filterContainer}>
        <Button
          title="Hoje"
          onPress={() => handleRangeChange(1)}
          style={range === 1 ? styles.activeFilter : styles.filter}
        />
        <Button
          title="7 dias"
          onPress={() => handleRangeChange(7)}
          style={range === 7 ? styles.activeFilter : styles.filter}
        />
      </View>
      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageItem
            message={item}
            onUpdate={() => {
              const updatedMessages = messages.map((msg) =>
                msg.id === item.id ? { ...msg, readed: true } : msg
              );
              setMessages(updatedMessages);
            }}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      {hasNextPage && <Button title="Mais..." onPress={loadMore} />}
      <View style={globalStyles.rectangle}>
        <Icon
          name="notifications"
          size={24}
          color="#FFFFFF"
          style={styles.footerButton}
        />
        <Icon
          name="menu"
          size={24}
          color="#FFFFFF"
          style={styles.footerButton}
          onPress={() => navigation.navigate('Menu')}
        />
        <Icon
          name="settings"
          size={24}
          color="#FFFFFF"
          style={styles.footerButton}
          onPress={() => navigation.navigate('Settings')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    ...globalStyles.text,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
  },
  filter: {
    backgroundColor: '#535353',
  },
  activeFilter: {
    backgroundColor: '#A1C014',
  },
  footerButton: {
    padding: 10,
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#A1C014',
    borderRadius: 8,
  },
});

export default MessageList;