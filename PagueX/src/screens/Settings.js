import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SwitchButton from '../components/SwitchButton';
import Button from '../components/Button';
import { getNotificationSettings, saveNotificationSettings } from '../api/api';
import { getData } from '../services/storage';
import { globalStyles } from '../styles/globalStyles';

const { width, height } = Dimensions.get('window');

const Settings = ({ navigation }) => {
  const [settings, setSettings] = useState({
    bankBillet: { generated: false, payed: false },
    pix: { generated: false, payed: false },
    creditCard: { approved: false, recused: false },
  });

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const email = await getData('email');
        if (!email) {
          alert('Email não encontrado. Faça login novamente.');
          navigation.replace('Login01');
          return;
        }
        const data = await getNotificationSettings(email);
        if (data) {
          // Ensure default values if API returns partial data
          setSettings({
            bankBillet: { generated: false, payed: false, ...data.bankBillet },
            pix: { generated: false, payed: false, ...data.pix },
            creditCard: { approved: false, recused: false, ...data.creditCard },
          });
        }
      } catch (error) {
        console.error('Erro ao carregar configurações:', error);
        alert('Erro ao carregar configurações. Tente novamente.');
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    try {
      const email = await getData('email');
      if (!email) {
        alert('Email não encontrado. Faça login novamente.');
        navigation.replace('Login01');
        return;
      }
      await saveNotificationSettings(email, settings);
      alert('Configurações salvas com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar configurações:', error);
      alert('Erro ao salvar configurações. Tente novamente.');
    }
  };

  return (
    <View style={globalStyles.container}>
      <View style={styles.header}>
        <View style={[styles.iconContainer, { width: width * 0.1, height: width * 0.1 }]}>
          <Icon name="settings" size={width * 0.06} color="#FFFFFF" />
        </View>
        <View style={styles.titleContainer}>
          <Text style={[styles.title, { fontSize: width * 0.045 }]}>Configurações</Text>
          <Text style={[styles.subtitle, { fontSize: width * 0.04 }]}>Controle de mensagens</Text>
        </View>
      </View>

      <View style={styles.configContainer}>
        <Text style={[styles.sectionTitle, { marginTop: height * 0.025 }]}>Boleto bancário</Text>
        <View style={styles.switchContainer}>
          <View style={styles.switchButtonContainer}>
            <SwitchButton
              value={settings.bankBillet.generated}
              onValueChange={(value) =>
                setSettings({ ...settings, bankBillet: { ...settings.bankBillet, generated: value } })
              }
            />
          </View>
          <Text style={styles.switchLabel}>Boleto gerado</Text>
        </View>
        <View style={[styles.switchContainer, { marginTop: height * -0.01 }]}>
          <View style={styles.switchButtonContainer}>
            <SwitchButton
              value={settings.bankBillet.payed}
              onValueChange={(value) =>
                setSettings({ ...settings, bankBillet: { ...settings.bankBillet, payed: value } })
              }
            />
          </View>
          <Text style={styles.switchLabel}>Boleto pago</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: height * 0.015 }]}>PIX</Text>
        <View style={styles.switchContainer}>
          <View style={styles.switchButtonContainer}>
            <SwitchButton
              value={settings.pix.generated}
              onValueChange={(value) =>
                setSettings({ ...settings, pix: { ...settings.pix, generated: value } })
              }
            />
          </View>
          <Text style={styles.switchLabel}>PIX gerado</Text>
        </View>
        <View style={[styles.switchContainer, { marginTop: height * -0.01 }]}>
          <View style={styles.switchButtonContainer}>
            <SwitchButton
              value={settings.pix.payed}
              onValueChange={(value) =>
                setSettings({ ...settings, pix: { ...settings.pix, payed: value } })
              }
            />
          </View>
          <Text style={styles.switchLabel}>PIX pago</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: height * 0.015 }]}>Cartão de crédito</Text>
        <View style={styles.switchContainer}>
          <View style={styles.switchButtonContainer}>
            <SwitchButton
              value={settings.creditCard.approved}
              onValueChange={(value) =>
                setSettings({ ...settings, creditCard: { ...settings.creditCard, approved: value } })
              }
            />
          </View>
          <Text style={styles.switchLabel}>Pagamento aprovado</Text>
        </View>
        <View style={[styles.switchContainer, { marginTop: height * -0.01 }]}>
          <View style={styles.switchButtonContainer}>
            <SwitchButton
              value={settings.creditCard.recused}
              onValueChange={(value) =>
                setSettings({ ...settings, creditCard: { ...settings.creditCard, recused: value } })
              }
            />
          </View>
          <Text style={styles.switchLabel}>Pagamento recusado</Text>
        </View>
      </View>

      <Button
        title="Salvar notificações"
        onPress={handleSave}
        style={styles.button}
        textStyle={styles.buttonText}
      />

      <View style={styles.footer}>
        <Image source={require('../assets/sublogo01.png')} style={styles.sublogo} />
        <View style={styles.footerIcons}>
          <View style={styles.footerButton}>
            <Icon
              name="notifications"
              size={width * 0.055}
              color="#FFFFFF"
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
          <View style={[styles.footerButton, { backgroundColor: '#A1C014' }]}>
            <Icon name="settings" size={width * 0.055} color="#1E1E1E" />
          </View>
        </View>
      </View>
    </View>
  );
};

// Styles remain unchanged
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
  subtitle: {
    ...globalStyles.text,
  },
  configContainer: {
    marginHorizontal: width * 0.04,
  },
  sectionTitle: {
    ...globalStyles.text,
    marginBottom: height * 0.01,
    color: '#FFFFFF',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  switchButtonContainer: {
    width: width * 0.12,
    alignItems: 'center',
  },
  switchLabel: {
    ...globalStyles.text,
    color: '#AAAAAA',
    marginLeft: width * 0.025,
  },
  button: {
    height: height * 0.06,
    backgroundColor: '#A1C014',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: width * 0.04,
    marginTop: height * 0.02,
    marginBottom: height * 0.015,
  },
  buttonText: {
    color: '#000',
    fontSize: width * 0.04,
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

export default Settings;