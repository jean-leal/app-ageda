import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, KeyboardAvoidingView, Platform, ScrollView, TouchableWithoutFeedback, Keyboard, Modal, TouchableOpacity } from 'react-native';
import { Link, useRouter} from "expo-router";

import Button from '../components/button';
import Input from '../components/input';
import { useAuth } from '../contexts/AuthContext';

import ModalPasswordRecovery from './(modals)/auth/modalPasswordRecovery';
import colors from '../constants/theme';

export default function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const router = useRouter();

  const { loading, SignIn } = useAuth();

  const handleSignIn = async () => {
    const ret = await SignIn({ email, password });
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
          <Image
            source={require('../../assets/logo.png')}
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
          <View style={{ marginTop: 16 }}>
           
            <TouchableOpacity
              onPress={() => setOpenModal(true)}
            >
              <Text style={{ fontWeight: 'bold', color: colors.darkGray, textDecorationLine: 'underline'}}>
                Esqueci minha senha!
              </Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={openModal}
            animationType="slide"
            transparent
            closeModal={() => setOpenModal(false)}
          >
            <ModalPasswordRecovery closeModal={() => setOpenModal(false)} />
          </Modal>
        </ScrollView>

      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24
  },
  title: {
    width: '100%',
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 12
  },
  btnStyle: {
    textAlign: 'start',
    marginTop: 32,
    width: '80%'
  },
  img: {
    //width: 150,
    //height: 200,
    marginBottom: 50
  }
});
