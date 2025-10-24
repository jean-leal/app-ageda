import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router";

import colors from "../../../constants/theme";
import Button from "../../../components/button";
import Input from "../../../components/input";
import { supabase } from "../../../lib/supabase";

export default function ModalPasswordRecovery({ closeModal }) {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function handlePasswordRecovery(email) {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: "jagenda://resetPassword"
    })
     if (error) {
    Alert.alert("Erro ao enviar e-mail:", error.message);
  } else {
    Alert.alert("Verifique seu e-mail", "Enviamos um link para redefinir sua senha.");
    router.replace('/signin');
  }
  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', marginBottom: 16 }}>
        <TouchableOpacity onPress={() => closeModal()}>
          <Ionicons name="arrow-back-outline" size={30} color={colors.primary} style={{ marginRight: 16 }} />
        </TouchableOpacity>
        <Text style={styles.title}>Recuperação de senha</Text>
      </View>
      <Input
        iconName="mail-outline"
        placeholder="Digite seu email"
        value={email}
        onChangeText={setEmail}
      />
      <Button
        title="Recuperar senha"
        btnStyle={{ marginTop: 16 }}
        onPress={() => handlePasswordRecovery(email)} />
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
