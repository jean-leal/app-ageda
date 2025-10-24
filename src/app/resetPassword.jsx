import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";
import * as Linking from 'expo-linking';

import { useAuth } from "../contexts/AuthContext";
import colors from "../constants/theme";
import Button from "../components/button";
import Input from "../components/input";
import { supabase } from "../lib/supabase";

export default function ResetPassword() {
  const router = useRouter();
  const [passowrd, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  async function ResetPassword() {
    const user = await supabase.auth.getUser()
  console.log('usuario', user)
   /*
    const { data, error } = await supabase.auth.updateUser({
      email: email,
      password: passowrd,
    });    
    
    if (error) {
      Alert.alert("Erro ao redefinir senha:", error.message);
    } else {
      Alert.alert("Senha redefinida com sucesso!", "Você já pode fazer login com sua nova senha.");
      router.replace('/signin');
    }*/
  }
  
  useEffect(() => {
    const handleDeepLink = (event) => {
      console.log("🔗 URL recebida:", event.url);
    };

    // Quando o app já está aberto
    const subscription = Linking.addEventListener('url', handleDeepLink);

    // Quando o app é aberto pelo link
    const initialUrl = Linking.getInitialURL();
    initialUrl.then((url) => {
      if (url) console.log("🔗 URL inicial:", url);
    });

    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity onPress={() => router.replace('/signin')}>
          <Ionicons name="arrow-back-outline" size={30} color={colors.primary} style={{ marginRight: 16 }} />
        </TouchableOpacity>
        <Text style={styles.title}>Nova senha</Text>
      </View>
      <Input
        iconName="mail-outline"
        placeholder="Seu Email"
        value={email}
        onChangeText={setEmail}
      />
      <Input
        iconName="lock-closed-outline"
        placeholder="Nova Senha"
        value={passowrd}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Salvar"
        btnStyle={{ marginTop: 16 }}
        onPress={() => ResetPassword(passowrd)} />
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
