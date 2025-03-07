import React from "react";
import { StatusBar } from "expo-status-bar";
import { Stack, usePathname } from "expo-router";
import colors from "../constants/theme"
import { View } from "react-native";

export default function RootLayout() {
  const pathname = usePathname();// encontrando qual tela esta ativa no momento

  return (
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
          name="register"
          options={{
            title: "Cadastro"
          }} />
      </Stack>
    </View>
  )
}