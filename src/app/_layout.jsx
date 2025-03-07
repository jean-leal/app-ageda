import React from "react";
import { Stack } from "expo-router";

export default function RootLayout(){
  return (
    <Stack>
      <Stack.Screen 
        name="index"
        options={{
          headerShown: false, 
          title: "Login"
        }}
        />
      <Stack.Screen name="home"/>
      <Stack.Screen 
        name="register"
        options={{
          title: "Cadastro"
        }}/>
    </Stack>
  )
}