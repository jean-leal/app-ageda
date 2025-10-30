import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter, useLocalSearchParams } from "expo-router";

import { useAuth } from "../contexts/AuthContext";

import colors from "../constants/theme";
import Button from "../components/button";
import Input from "../components/input";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const { setIsPasswordResetFlow } = useAuth();
  const { email } = useLocalSearchParams();
  const router = useRouter();
  const [passowrd, setPassword] = useState("");

  const [token, setToken] = useState('');
  const [verifyToken, setVerifyToken] = useState('');

 
  async function VerifyOTP() {
    try {
      const { data, error } = await supabase.auth.verifyOtp({
        email: email,
        token: token,
        type: 'recovery',
      });
     
      if (!data) {
        Alert.alert('Código inválido', 'Verifique o código enviado ao seu e-mail.')
        //return
      } else {
        setVerifyToken(data);
        setIsPasswordResetFlow(true);
      }
    } catch (error) {
      Alert.alert('Erro', 'Algo deu errado ao verificar o código.')
    }
  }

  async function UpdatePassword() {
    if (!passowrd || passowrd.length < 6) {
      Alert.alert(
        "Senha inválida",
        "A senha deve ter no mínimo 6 caracteres."
      );
      return;
    }

    // atualiza a senha do usuário
    const { data, error } = await supabase.auth.updateUser({
      password: passowrd,
    });

    if (error) {
      Alert.alert("Erro ao atualizar senha", error.message);
      return;
    }

    Alert.alert("Senha atualizada com sucesso!");

    // limpa usuário no AuthContext e redireciona para login
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        Alert.alert('Erro', error.message);
        return;
      }
    } catch (_) { }

    setIsPasswordResetFlow(false);
    router.replace('/signin');
  }


  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity onPress={() => router.replace('/signin')}>
          <Ionicons name="arrow-back-outline" size={30} color={colors.primary} style={{ marginRight: 16 }} />
        </TouchableOpacity>
        <Text style={styles.title}>{!verifyToken ? 'Verificação do token' : 'Nova senha' }</Text>
      </View>
      {
        !verifyToken ?
          <View>
            <Input
              iconName="lock-closed-outline"
              placeholder="Digite o Token recebido por e-mail"
              value={token}
              onChangeText={setToken}
              keyboardType="numeric"
              maxLength={6}
            />
            <Button
              title="Salvar"
              btnStyle={{ marginTop: 16 }}
              onPress={() => VerifyOTP()} />
          </View>
          :
          <View>
            <Input
              iconName="lock-closed-outline"
              placeholder="Nova senha"
              value={passowrd}
              onChangeText={setPassword}
              secureTextEntry
            />
            <Button
              title="Salvar"
              btnStyle={{ marginTop: 16, backgroundColor: colors.success }}
              onPress={() => UpdatePassword()} />
          </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 26,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  }
});
