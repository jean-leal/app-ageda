import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { useRouter } from 'expo-router';
import * as FileSystem from 'expo-file-system';
import { decode } from 'base64-arraybuffer';

import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isPasswordResetFlow, setIsPasswordResetFlow] = useState(false);

  async function SignUp({ name, email, password, passwordConfirm }) {
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
      options: {
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
    router.replace('/signin');

  }

  async function SignIn({ email, password }) {
    setLoading(true);
    // validando de todos os campos estão preenchidos
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      setLoading(false);
      return;
    }

    // efetuando o login no banco, com email e senha
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password
    }).catch(error => {
      Alert.alert('Error:', error);
    });

    //caso de algum erro no login
    if (error) {
      Alert.alert('Error', error.message);
      setLoading(false);
      return;
    }
    //se nao der erro, continua 
    setLoading(false);
    router.replace('/(tabs)');
  }

  async function setAuth(authUser) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', authUser.id)
      .single();

    if (error) {
      Alert.alert('Error', error.message);
      return;
    } else {
      setUser(data);
    }
  }

  async function UpdateUser(userUpdate) {

    const { data, error } = await supabase
      .from('users')
      .update(userUpdate)
      .eq('id', user.id)
      .single();
    if (error) {
      Alert.alert('Error', error.message);
      return false;
    }
    setUser({ ...user, ...userUpdate });
    return true;

  }
  async function uploadImg(uri) {
    try {
      // Ler o arquivo como Base64
      const base64 = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      if (!base64) {
        throw new Error("Falha ao ler a imagem");
      }

      // Converter Base64 para ArrayBuffer (necessário para o Supabase)
      const arrayBuffer = decode(base64);
      // Criar um nome para a imagem
      const fileName = `${user.id}_${Date.now()}.jpeg`;

      // Upload para o Supabase
      const { data, error } = await supabase.storage
        .from("pictures")
        .upload(fileName, arrayBuffer, { contentType: "image/jpeg", upsert: true });

      if (error) {
        Alert.alert("Erro ao enviar imagem", error.message);
        return;
      }

      // Obter a URL pública da imagem
      const { data: publicUrlData } = supabase.storage
        .from("pictures")
        .getPublicUrl(fileName);

      if (!publicUrlData.publicUrl) {
        throw new Error("Erro ao recuperar URL pública.");
      }
      return (publicUrlData.publicUrl)

    } catch (error) {
      Alert.alert("Erro inesperado", error.message);
    }
  }

  return (
    <AuthContext.Provider value={{
      loading,
      SignUp,
      SignIn,
      user,
      setAuth,
      UpdateUser,
      uploadImg, 
      isPasswordResetFlow,
      setIsPasswordResetFlow
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);