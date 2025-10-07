import React, { useState } from 'react';
import { View, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard } from 'react-native';

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

  const handleSignUp = async () => {
    const ret = await SignUp({ name, email, password, passwordConfirm });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <Image source={require('../../assets/user.png')} style={styles.img} />

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
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.white,
    padding: 18,
    alignItems: 'center',
    paddingTop: 60,
    //justifyContent: 'center'
  },
  img: {
    width: 120,
    height: 120,
    marginBottom: 32, 
    borderRadius: 60,
  }
});
