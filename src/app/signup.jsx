import React, { useState } from 'react';
import { View, StyleSheet, Image } from 'react-native';

import Button from '../components/button';
import Input from '../components/input';
import colors from '../constants/theme';

import { useAuth } from '../contexts/AuthContext';

export default function SignUp() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  const {
    loading,
    SignUp
  } = useAuth();

  // chamando a função de cadastro dentro do contexto
  const handleSignUp = async () => {
    const ret = await SignUp({ name, email, password, passwordConfirm });
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/user.png')} style={styles.img} />
      <Input
        iconName={'person-outline'}
        placeholder='Nome'
        value={name}
        onChangeText={setName}
      />
      <Input
        iconName={'mail-outline'}
        placeholder='Email'
        value={email}
        onChangeText={setEmail}
      />
      <Input
        iconName={'lock-closed-outline'}
        placeholder='Senha'
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Input
        iconName={'lock-closed-outline'}
        placeholder='Repita sua senha'
        secureTextEntry
        value={passwordConfirm}
        onChangeText={setPasswordConfirm}
      />
      <Button
        title='Cadastrar'
        btnStyle={{ marginTop: 38, width: '90%' }}
        onPress={handleSignUp}
        loading={loading}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 18,
    alignItems: 'center',
    paddingTop: 32
  },
  img: {
    width: 120,
    height: 120,
    marginBottom: 32
  }
});