import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SwitchButton from '../components/SwitchButton';
import Button from '../components/Button';
import { getNotificationSettings, saveNotificationSettings } from '../api/api';
import { getData } from '../services/storage';
import { globalStyles } from '../styles/globalStyles';

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
      <Text style={styles.title}>Configurações</Text>
      <Text style={styles.subtitle}>Controle de mensagens</Text>

      <Text style={styles.sectionTitle}>Boleto bancário</Text>
      <SwitchButton
        label="Boleto gerado"
        value={settings.bankBillet.generated}
        onValueChange={(value) =>
          setSettings({ ...settings, bankBillet: { ...settings.bankBillet, generated: value } })
        }
      />
      <SwitchButton
        label="Boleto pago"
        value={settings.bankBillet.payed}
        onValueChange={(value) =>
          setSettings({ ...settings, bankBillet: { ...settings.bankBillet, payed: value } })
        }
      />

      <Text style={styles.sectionTitle}>PIX</Text>
      <SwitchButton
        label="PIX gerado"
        value={settings.pix.generated}
        onValueChange={(value) =>
          setSettings({ ...settings, pix: { ...settings.pix, generated: value } })
        }
      />
      <SwitchButton
        label="PIX pago"
        value={settings.pix.payed}
        onValueChange={(value) =>
          setSettings({ ...settings, pix: { ...settings.pix, payed: value } })
        }
      />

      <Text style={styles.sectionTitle}>Cartão de crédito</Text>
      <SwitchButton
        label="Pagamento aprovado"
        value={settings.creditCard.approved}
        onValueChange={(value) =>
          setSettings({ ...settings, creditCard: { ...settings.creditCard, approved: value } })
        }
      />
      <SwitchButton
        label="Pagamento recusado"
        value={settings.creditCard.recused}
        onValueChange={(value) =>
          setSettings({ ...settings, creditCard: { ...settings.creditCard, recused: value } })
        }
      />

      <Button title="Salvar notificações" onPress={handleSave} style={styles.saveButton} />

      <View style={globalStyles.rectangle}>
        <Icon
          name="notifications"
          size={24}
          color="#FFFFFF"
          style={styles.footerButton}
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
  subtitle: {
    ...globalStyles.text,
    fontSize: 16,
    textAlign: 'center',
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
  footerButton: {
    padding: 10,
    backgroundColor: '#2E2E2E',
    borderWidth: 1,
    borderColor: '#A1C014',
    borderRadius: 8,
  },
});

export default Settings;