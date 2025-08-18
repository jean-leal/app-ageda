import React, { useState, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import Header from '../../components/headerProfile/header.jsx';
import colors from '../../constants/theme.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { fetchAppointments } from '../../utils/functions/fetchBD.js';
import CardHome from '../../components/cardHome/cardHome.jsx';

export default function Home() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  const date = new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-');

  async function fetchAgenda() {
    try {
      const data = await fetchAppointments(user?.id, date);
      setEvents(data);
    } catch (error) {
      console.error("Erro ao buscar agendamentos:", error);
    }
  }

  useFocusEffect(() => {
    if (user?.id) {
      fetchAgenda();
    }
  });

  useEffect(() => {
    if (user?.id) {
      fetchAgenda();
    }
  }, [user?.id]);

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
