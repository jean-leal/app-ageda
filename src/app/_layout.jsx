import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Stack, usePathname, useRouter } from "expo-router";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import colors from "../constants/theme";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <MainLayout />
      </SafeAreaProvider>
    </AuthProvider>
  )
}

function MainLayout() {
  const router = useRouter();
  const pathname = usePathname();// encontrando qual tela esta ativa no momento
  const { setAuth, isPasswordResetFlow } = useAuth();

  useEffect(() => {
    //escutando mudanças na autenticação do supabase
    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      // caso o usuario esteja logado, seta o usuario no contexto e redireciona para a tela home
      if (session?.user) {
        if (!isPasswordResetFlow) {

          setAuth(session.user);
          //condicional para evitar que abra o app quando fazer um reset de senha
          event === 'PASSWORD_RECOVERY' ? '' : router.replace('/(tabs)');
        }
      } else {
        router.replace('/signin');
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    }
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: pathname === '/signin' || pathname === '/resetPassword' ? '#FFFFFF' : colors.primary }}>
      <StatusBar
        style={pathname === '/signin' || pathname === '/resetPassword' ? 'dark' : 'light'}
        backgroundColor={pathname === '/signin' || pathname === '/resetPassword' ? '#FFFFFF' : colors.primary}
      />{/* mudando a cor do status bar de acordo com a tela ativa */}
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleStyle: {
            fontWeight: "bold",
            fontSize: 18,

          }
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
            title: "Carregando"
          }}
        />
        <Stack.Screen
          name="signin"
          options={{
            headerShown: false,
            title: "Login"
          }}
        />
        <Stack.Screen
          name="signup"
          options={{
            title: "Cadastro"
          }} />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false
          }} />
        <Stack.Screen
          name="resetPassword"
          options={{
            headerShown: false
          }} />
      </Stack>
    </SafeAreaView>
  )
}