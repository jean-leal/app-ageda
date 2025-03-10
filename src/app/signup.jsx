import React, { useState } from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { router } from 'expo-router';

import Button from '../components/button';
import Input from '../components/input';
import colors from '../constants/theme';

import { supabase } from '../lib/supabase';

export default function SignUp() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSignUp() {
    setLoading(true);
    // validando de todos os campos estão preenchidos
    if (!name.trim() || !email.trim() || !password.trim() || !passwordConfirm.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      setLoading(false);
      return;
    }
    // validando se as senhas são iguais
    if (password !== passwordConfirm) {
      Alert.alert('Atenção', 'As senhas não coincidem!');
      setLoading(false);
      return;
    }

    // efetuando o cadastro no banco, com email e senha, o campo options é para adicionar dados a uma tabela separada chamada users
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options:{
        data: { 
          name: name 
        }
      }
    }).catch(error => {
      Alert.alert('Error:', error);
    });

    //caso de algum erro no cadastro
    if (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
      return;
    }
    //se nao der erro, continua 
    setLoading(false);
    router.replace('/');

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