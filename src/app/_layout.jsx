import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { Stack, usePathname, router } from "expo-router";
import { View } from "react-native";

import colors from "../constants/theme";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { supabase } from "../lib/supabase";

export default function RootLayout() {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  )
}

function MainLayout() {
  const pathname = usePathname();// encontrando qual tela esta ativa no momento
  const { setAuth } = useAuth();

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      // caso o usuario esteja logado, seta o usuario no contexto e redireciona para a tela home
      if (session?.user) {
        setAuth(session.user);
        router.replace('/(tabs)');
        return;
      }
      // caso o usuario nao esteja logado, seta o usuario como null e redireciona para a tela de login
      setAuth(null);
      router.replace('/signin');
    });
  }, []);

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style={pathname === '/signin' ? 'dark' : 'light'} />{/* mudando a cor do status bar de acordo com a tela ativa */}
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
        </Stack>
      </View>
    </AuthProvider>
  )
}