import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Link } from "expo-router";

import Button from '../components/button';
import Input from '../components/input';
import { useAuth } from '../contexts/AuthContext';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {
    loading,
    SignIn
  } = useAuth();

  const handleSignIn = async () => {
    const ret = await SignIn({ email, password });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Image
        source={require('../assets/logo.png')}
        style={styles.img}
      />
      <Input 
        iconName={'mail-outline'} 
        placeholder={"Email"} 
        inputStyle={{ marginBottom: 16 }} 
        value={email}
        onChangeText={setEmail}
      />
      <Input 
        iconName={'lock-closed-outline'} 
        placeholder={"Senha"} 
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title="Entrar"
        btnStyle={styles.btnStyle}
        onPress={handleSignIn}
        loading={loading}
      />
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <Text>Não tem conta?</Text>
        <Link
          href="signup"
          style={{ marginLeft: 12, fontWeight: 'bold' }}
        >
          Criar Conta
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  title: {
    width: '100%',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 48
  },
  btnStyle: {
    textAlign: 'start',
    marginTop: 32,
    width: '80%'
  },
  img: {
    width: 150,
    height: 150,
    marginBottom: 40
  }
});

