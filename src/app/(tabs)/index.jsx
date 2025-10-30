import React, { useState, useCallback, use } from 'react';
import { useRouter, useFocusEffect } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import Header from '../../components/headerProfile/header.jsx';
import colors from '../../constants/theme.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { fetchAppointments } from '../../utils/functions/fetchBD.js';
import CardHome from '../../components/cardHome/cardHome.jsx';

export default function Home() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const router = useRouter();

  const date = new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-');

  async function fetchAgenda() {
    try {
      const data = await fetchAppointments(user?.id, date);
      const active = data.filter(item => item.status === "active")
      setEvents(active);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  }

  useFocusEffect(
    useCallback(() => {
        //verificando se o tempo gratis expirou
        const isTrialExpired = new Date() > new Date(user?.trial_end);
        if (isTrialExpired && !user?.is_premium) {
          router.replace('/upgrade');
          return;
        }
        if (user?.id) {
          fetchAgenda();
        }
      }, [user?.id]));

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Text style={styles.title}>Agendamentos do dia</Text>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <CardHome
              item={item}
            />
          )}
          ListEmptyComponent={<Text style={styles.emptyText}>Nenhum agendamento para hoje.</Text>}
          contentContainerStyle={{ paddingBottom: 80 }}
          ListFooterComponent={
            <View style={{ marginBottom: 60 }}>
            </View>
          }
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  body: {
    padding: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#999'
  }
});
