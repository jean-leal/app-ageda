import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack, usePathname } from "expo-router";
import { View } from "react-native";

import colors from "../constants/theme";
import { AuthProvider } from "../contexts/AuthContext";

export default function RootLayout() {
  const pathname = usePathname();// encontrando qual tela esta ativa no momento

  return (
    <AuthProvider>
      <View style={{ flex: 1 }}>
        <StatusBar style={pathname === '/' ? 'dark' : 'light'} />{/* mudando a cor do status bar de acordo com a tela ativa */}
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
              title: "Login"
            }}
          />
          <Stack.Screen name="home" />
          <Stack.Screen
            name="signup"
            options={{
              title: "Cadastro"
            }} />
        </Stack>
      </View>
    </AuthProvider>
  )
}