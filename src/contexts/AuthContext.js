import { createContext, useContext, useState } from "react";
import { Alert } from "react-native";
import { router } from 'expo-router';

import { supabase } from '../lib/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

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

  function setAuth(authUser) {
    setUser(authUser);
  }

  return (
    <AuthContext.Provider value={{
      loading,
      SignUp,
      SignIn,
      user,
      setAuth
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);