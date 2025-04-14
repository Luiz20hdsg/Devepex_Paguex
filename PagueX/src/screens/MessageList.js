import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MessageItem from '../components/MessageItem';
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
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="notifications" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Lista de mensagens</Text>
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
              size={22}
              color="#1E1E1E"
              onPress={() => navigation.navigate('MessageList')}
            />
          </View>
          <View style={styles.footerButton}>
            <Icon
              name="menu"
              size={22}
              color="#FFFFFF"
              onPress={() => navigation.navigate('Menu')}
            />
          </View>
          <View style={styles.footerButton}>
            <Icon
              name="settings"
              size={22}
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
    marginVertical: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: '#2E2E2E',
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  titleContainer: {
    marginLeft: 10,
  },
  title: {
    ...globalStyles.text,
    fontSize: 20,
    fontWeight: '700',
  },
  filterContainer: {
    flexDirection: 'row',
    marginLeft: 10,
    gap: 6,
    marginVertical: 10,
  },
  filter: {
    width: 70,
    height: 30,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E2E2E',
  },
  activeFilter: {
    backgroundColor: '#FFFFFF',
  },
  filterText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  activeFilterText: {
    color: '#2E2E2E',
    fontSize: 16,
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
  },
  loadMoreButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    backgroundColor: '#2E2E2E',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  sublogo: {
    width: 45,
    height: 40,
    resizeMode: 'contain',
  },
  footerIcons: {
    flexDirection: 'row',
    gap: 10,
  },
  footerButton: {
    width: 55,
    height: 55,
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MessageList;

//teste