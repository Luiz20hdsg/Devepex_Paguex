import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';
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
    try {
      const data = await getMessages(email, startDate, endDate, newPage);
      if (data) {
        setMessages(newPage === 1 ? data.messages : [...messages, ...data.messages]);
        setHasNextPage(data.nextPage);
      }
    } catch (error) {
      console.error('Erro ao carregar mensagens:', error);
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
      {/* Título com ícone de notificação à esquerda */}
      <View style={styles.headerContainer}>
        <Icon
          name="notifications"
          size={24}
          color="#FFFFFF"
          style={styles.headerIcon}
        />
        <Text style={styles.title}>Lista de mensagens</Text>
      </View>

      {/* Switch selector para "Hoje" e "7 dias" */}
      <View style={styles.filterContainer}>
        <Button
          title="Hoje"
          onPress={() => handleRangeChange(1)}
          style={[styles.filter, range === 1 ? styles.activeFilter : null]}
        />
        <Button
          title="7 dias"
          onPress={() => handleRangeChange(7)}
          style={[styles.filter, range === 7 ? styles.activeFilter : null]}
        />
      </View>

      {/* Lista de mensagens */}
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
        contentContainerStyle={styles.messageList}
        ListFooterComponent={
          hasNextPage ? (
            <Button
              title="Mais..."
              onPress={loadMore}
              style={styles.loadMoreButton}
            />
          ) : null
        }
      />

      {/* Rodapé */}
      <View style={styles.footer}>
        <Image source={require('../assets/sublogo01.png')} style={styles.sublogo} />
        <View style={styles.footerIcons}>
          <Icon
            name="notifications"
            size={24}
            color="#1E1E1E"
            style={[styles.footerButton, { backgroundColor: '#A1C014' }]} // Tela atual
            onPress={() => navigation.navigate('MessageList')}
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
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 33.78,
  },
  headerIcon: {
    width: 45,
    height: 40,
    backgroundColor: '#212121',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    textAlign: 'center',
    lineHeight: 40,
    position: 'absolute',
    left: 41.25 - 45 - 10,
  },
  title: {
    ...globalStyles.text,
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginVertical: 10,
  },
  filterContainer: {
    flexDirection: 'row',
    alignSelf: 'flex-start',
    marginLeft: 41.25 - 45 - 10,
    gap: 6,
    marginVertical: 10,
  },
  filter: {
    backgroundColor: '#212121', // Cor da tela
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: 70,
  },
  activeFilter: {
    backgroundColor: '#FFFFFF', // Branco quando ativo
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    paddingVertical: 6,
    paddingHorizontal: 10,
    width: 70,
  },
  messageList: {
    paddingBottom: 100,
  },
  loadMoreButton: {
    width: 281,
    height: 40,
    backgroundColor: '#535353',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignSelf: 'center',
    marginVertical: 20,
    shadowColor: '#101828',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 77,
    backgroundColor: '#2E2E2E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sublogo: {
    width: 45,
    height: 40,
    marginLeft: 40.75,
    resizeMode: 'contain',
  },
  footerIcons: {
    flexDirection: 'row',
    gap: 6,
    paddingRight: 20,
  },
  footerButton: {
    width: 45,
    height: 40,
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageList;