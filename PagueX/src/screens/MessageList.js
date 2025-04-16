import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MessageItem from '../components/MessageItem';
import { getMessages, markMessageAsRead } from '../api/api';
import { getData } from '../services/storage';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const MessageList = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [range, setRange] = useState(1);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchMessages = async (days = 1, newPage = 1) => {
    try {
      setLoading(true);
      const email = await getData('email');
      if (!email) {
        console.error('Email não encontrado');
        navigation.replace('Login01');
        return;
      }

      const endDate = new Date().toISOString().split('T')[0];
      const startDate = new Date(Date.now() - days * 86400000).toISOString().split('T')[0];

      console.log('Buscando mensagens:', { email, startDate, endDate, page: newPage });
      const data = await getMessages(email, startDate, endDate, newPage);
      
      if (data) {
        setMessages(newPage === 1 ? data.messages : [...messages, ...data.messages]);
        setHasNextPage(data.nextPage || false);
        if (data.messages.length === 0 && newPage === 1) {
          console.log('Nenhuma mensagem encontrada para o período');
        }
      }
    } catch (error) {
      console.error('Erro ao carregar mensagens:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    } finally {
      setLoading(false);
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
    if (!loading && hasNextPage) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchMessages(range, nextPage);
    }
  };

  const handleMessagePress = async (id) => {
    try {
      await markMessageAsRead(id);
      setMessages(messages.map((msg) =>
        msg.id === id ? { ...msg, readed: true } : msg
      ));
    } catch (error) {
      console.error('Erro ao marcar mensagem como lida:', {
        message: error.message,
        status: error.response?.status,
        data: error.response?.data,
      });
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { width: width * 0.1, height: width * 0.1 }]}>
          <Icon name="notifications" size={width * 0.06} color="#FFFFFF" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { fontSize: width * 0.045 }]}>Lista de mensagens</Text>
        </View>   
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filter, range === 1 ? styles.activeFilter : null]}
          onPress={() => handleRangeChange(1)}
        >
          <Text style={range === 1 ? styles.activeFilterText : styles.filterText}>Hoje</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filter, range === 7 ? styles.activeFilter : null]}
          onPress={() => handleRangeChange(7)}
        >
          <Text style={range === 7 ? styles.activeFilterText : styles.filterText}>7 dias</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={messages}
        renderItem={({ item }) => (
          <MessageItem
            message={item}
            onPress={() => handleMessagePress(item.id)}
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
            <TouchableOpacity
              title="Mais..."
              onPress={loadMore}
              style={styles.loadMoreButton}
            >
              <Text style={styles.loadMoreButtonText}>Mais...</Text>
            </TouchableOpacity>
          ) : null
        }
      />

      <View style={styles.footer}>
        <Image source={require('../assets/sublogo01.png')} style={styles.sublogo} />
        <View style={styles.footerIcons}>
          <View style={[styles.footerButton, { backgroundColor: '#A1C014' }]}>
            <Icon
              name="notifications"
              size={width * 0.055}
              color="#1E1E1E"
              onPress={() => navigation.navigate('MessageList')}
            />
          </View>
          <View style={styles.footerButton}>
            <Icon
              name="menu"
              size={width * 0.055}
              color="#FFFFFF"
              onPress={() => navigation.navigate('Menu')}
            />
          </View>
          <View style={styles.footerButton}>
            <Icon
              name="settings"
              size={width * 0.055}
              color="#FFFFFF"
              onPress={() => navigation.navigate('Settings')}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: height * 0.02,
  },
  iconContainer: {
    backgroundColor: '#2E2E2E',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: width * 0.025,
  },
  titleContainer: {
    marginLeft: width * 0.025,
  },
  title: {
    ...globalStyles.text,
    fontWeight: '700',
  },
  filterContainer: {
    flexDirection: 'row',
    marginLeft: width * 0.025,
    gap: width * 0.02,
    marginTop: height * 0.005, // diminui o espaçamento entre o header e os botões
    marginBottom: height * 0.02,
  },
  filter: {
    width: width * 0.2,
    height: height * 0.045,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // adiciona uma sombra aos botões
  },
  activeFilter: {
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
  },
  activeFilterText: {
    color: '#2E2E2E',
    fontSize: width * 0.04,
  },
  messageList: {
    paddingBottom: height * 0.1,
  },
  loadMoreButton: {
    width: width * 0.7,
    height: height * 0.06,
    backgroundColor: '#535353',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.04,
    alignSelf: 'center',
    marginVertical: height * 0.03,
  },
  loadMoreButtonText: {
    color: '#FFFFFF',
    fontSize: width * 0.04,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.08, 
    backgroundColor: '#2E2E2E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.025,
  },
  sublogo: {
    width: width * 0.12, 
    height: height * 0.06, 
    resizeMode: 'contain',
  },
  footerIcons: {
    flexDirection: 'row',
    gap: width * 0.0125,
  },
  footerButton: {
    width: width * 0.12, 
    height: width * 0.12, 
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#A1C014', 
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageList;
