import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import Input from '../../components/input';
import Button from '../../components/button';
import { useAuth } from '../../contexts/AuthContext';
import { phoneMask } from '../../utils/masks/phone';

export default function ModalProfile({ closeModal }) {
  const { user, UpdateUser } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');

  function applyPhoneMask(value) {
    const onlyNumbers = value.replace(/\D/g, ''); // Remove todos os caracteres não numéricos
    const maskedValue = phoneMask(onlyNumbers);
    return setPhone(maskedValue);
  }

  //carrega todos os dados do usuário ao abrir o modal
  useEffect(() => {
    setName(user?.name || '');
    setEmail(user?.email || '');
    setPhone(user?.phone || '');
    setCity(user?.city || '');
    setState(user?.state || '');
    setAddress(user?.address || '');
    setNumber(user?.number || '');
  }, [user]);

  async function handleSave() {
    const phoneRaw = phone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

    const updated = await UpdateUser({
      name,
      email,
      phone: phoneRaw,
      city,
      state,
      address,
      number
    });
    if (updated) {
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
      closeModal();
    } else {
      Alert.alert('Erro', 'Erro ao atualizar os dados');
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.exit}>
        <TouchableOpacity onPress={closeModal}>
          <Ionicons name="close" size={46} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Image source={require('../../assets/user.png')} style={styles.img} />
        <View style={styles.containerIcon}>
          <TouchableOpacity>
            <Ionicons name="add" size={32} color="white" style={{ backgroundColor: 'red', borderRadius: 100 }} />
          </TouchableOpacity>
        </View>
        <Input
          placeholder="Nome"
          iconName='person-outline'
          value={name}
          onChangeText={setName}
        />
        <Input
          placeholder="Email"
          iconName='mail-outline'
          value={email}
          onChangeText={setEmail}
        />
        <Input
          placeholder="Telefone"
          iconName='call-outline'
          value={phone}
          onChangeText={applyPhoneMask}
          maxLength={16}
        />
        <Input
          placeholder="Cidade"
          iconName='location-outline'
          value={city}
          onChangeText={setCity}
        />
        <Input
          placeholder="Estado"
          iconName='flag-outline'
          value={state}
          onChangeText={setState}
        />
        <Input
          placeholder="Endereço"
          iconName='home-outline'
          value={address}
          onChangeText={setAddress}
        />
        <Input
          placeholder="Número"
          iconName='grid-outline'
          value={number}
          onChangeText={setNumber}
          keyboardType="number-pad"
        />
        <View style={{ flexDirection: 'row' }}>
          <Button title="Salvar" btnStyle={{ marginTop: 45, width: '80%' }} onPress={handleSave} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  exit: {
    width: '100%',
    marginTop: 10,
    alignItems: 'flex-end',
    paddingHorizontal: 12
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
  },
  form: {
    padding: 16,
    alignItems: 'center',
  },
  containerIcon: {
    width: 120,
    alignItems: 'flex-end',
    marginBottom: 38,
    marginTop: -40
  }
});
