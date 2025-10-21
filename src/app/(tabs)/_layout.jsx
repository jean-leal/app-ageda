import Ionicons from "@expo/vector-icons/Ionicons";
import { Tabs } from "expo-router";
import { StyleSheet } from "react-native";
import colors from "../../constants/theme";
import Tab from "./profile";

export default function TabLayout() {
  return (
    <Tabs
    screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarItemStyle: styles.tabItem,
        tabBarActiveTintColor: colors.white,
        tabBarInactiveTintColor: colors.darkGray,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color}/>
          ),
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="people" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="agenda"
        options={{
          tabBarIcon: ({ color, size}) => (
            <Ionicons name="calendar-clear" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="works"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hammer" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="services"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cog" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.primary,
    height: 55,
    position: 'absolute',
    bottom:0,
    left: 10,
  },
  tabItem: {
    margin: 10,
    padding: 0, 
  },
});
