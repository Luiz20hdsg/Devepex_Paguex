import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Switch } from 'react-native';
import Button from '../components/Button';
import { getNotificationSettings, saveNotificationSettings } from '../api/api';
import { getData } from '../services/storage';
import { globalStyles } from '../styles/globalStyles';

const CustomSwitchButton = ({ label, value, onValueChange }) => {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
      <Switch
        value={value}
        onValueChange={onValueChange}
        trackColor={{ false: '#767577', true: '#A1C014' }}
        thumbColor={value ? '#2E2E2E' : '#f4f3f4'}
      />
      <Text style={{ marginLeft: 10, ...globalStyles.text }}>{label}</Text>
    </View>
  );
};

const Settings = ({ navigation }) => {
  const [settings, setSettings] = useState({
    bankBillet: { generated: false, payed: false },
    pix: { generated: false, payed: false },
    creditCard: { approved: false, recused: false },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      const email = await getData('email');
      const data = await getNotificationSettings(email);
      if (data) setSettings(data);
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    const success = await saveNotificationSettings(settings);
    if (success) {
      alert('Configurações salvas com sucesso!');
    } else {
      alert('Erro ao salvar configurações.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <View style={styles.iconContainer}>
          <Icon name="settings" size={24} color="#FFFFFF" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Configurações</Text>
          <Text style={styles.subtitle}>Controle de mensagens</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Boleto bancário</Text>
      <CustomSwitchButton
        label="Boleto gerado"
        value={settings.bankBillet.generated}
        onValueChange={(value) =>
          setSettings({ ...settings, bankBillet: { ...settings.bankBillet, generated: value } })
        }
      />
      <CustomSwitchButton
        label="Boleto pago"
        value={settings.bankBillet.payed}
        onValueChange={(value) =>
          setSettings({ ...settings, bankBillet: { ...settings.bankBillet, payed: value } })
        }
      />

      <Text style={styles.sectionTitle}>PIX</Text>
      <CustomSwitchButton
        label="PIX gerado"
        value={settings.pix.generated}
        onValueChange={(value) =>
          setSettings({ ...settings, pix: { ...settings.pix, generated: value } })
        }
      />
      <CustomSwitchButton
        label="PIX pago"
        value={settings.pix.payed}
        onValueChange={(value) =>
          setSettings({ ...settings, pix: { ...settings.pix, payed: value } })
        }
      />

      <Text style={styles.sectionTitle}>Cartão de crédito</Text>
      <CustomSwitchButton
        label="Pagamento aprovado"
        value={settings.creditCard.approved}
        onValueChange={(value) =>
          setSettings({ ...settings, creditCard: { ...settings.creditCard, approved: value } })
        }
      />
      <CustomSwitchButton
        label="Pagamento recusado"
        value={settings.creditCard.recused}
        onValueChange={(value) =>
          setSettings({ ...settings, creditCard: { ...settings.creditCard, recused: value } })
        }
      />

      <Button title="Salvar notificações" onPress={handleSave} style={styles.saveButton} />

      {/* Rodapé */}
      <View style={styles.footer}>
        <Image source={require('../assets/sublogo01.png')} style={styles.sublogo} />
        <View style={styles.footerIcons}>
          <View style={styles.footerButton}>
            <Icon
              name="notifications"
              size={22}
              color="#FFFFFF"
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
          <View style={[styles.footerButton, { backgroundColor: '#A1C014' }]}>
            <Icon
              name="settings"
              size={22}
              color="#1E1E1E"
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
  subtitle: {
    ...globalStyles.text,
    fontSize: 16,
  },
  sectionTitle: {
    ...globalStyles.text,
    fontSize: 18,
    marginTop: 20,
    marginBottom: 10,
  },
  saveButton: {
    marginTop: 20,
    backgroundColor: '#A1C014',
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

export default Settings;
