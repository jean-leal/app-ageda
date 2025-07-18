import Ionicons from '@expo/vector-icons/Ionicons';
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import colors from '../../constants/theme';

export default function TabLayout() {
  return (
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <Tabs
        screenOptions={{
          tabBarInactiveTintColor: colors.gray,
          tabBarActiveTintColor: colors.white,
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarShowLabel: false,
          tabBarItemStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 10,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <Ionicons size={32} name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="customers"
          options={{
            title: 'Clientes',
            tabBarIcon: ({ color }) => <Ionicons size={32} name="people-sharp" color={color} />,
          }}
        />

        <Tabs.Screen
          name="agenda"
          options={{
            title: 'Agenda',
            tabBarIcon: ({ color }) => <Ionicons size={32} name="calendar-clear" color={color} />,
          }}
        />
        <Tabs.Screen
          name="works"
          options={{
            title: 'Serviços',
            tabBarIcon: ({ color }) => <Ionicons size={32} name="hammer" color={color} />,
          }}
        />
        <Tabs.Screen
          name="services"
          options={{
            title: 'Atendimento',
            tabBarIcon: ({ color }) => <Ionicons size={32} name="cog" color={color} />,
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Perfil',
            tabBarIcon: ({ color }) => <Ionicons size={32} name="person" color={color} />,
          }}
        />

      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: colors.primary,
    height: 60,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 8,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 10,
    borderRadius: 30,
    borderTopWidth: 0, // Remove a linha superior padrão
  }
})