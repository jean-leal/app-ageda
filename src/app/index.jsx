import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import { Link } from "expo-router";

import Button from '../components/button';
import Input from '../components/input';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <Image
        source={require('../assets/logo.png')}
        style={styles.img}
      />
      <Input iconName={'mail-outline'} placeholder={"Email"} inputStyle={{ marginBottom: 16 }} />
      <Input iconName={'lock-closed-outline'} placeholder={"Senha"} />
      <Button
        title="Adicionar"
        btnStyle={styles.btnStyle}
      />
      <View style={{ flexDirection: 'row', marginTop: 12 }}>
        <Text>Não tem conta?</Text>
        <Link
          href="register"
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

