import React, { useState, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

import Header from '../../components/headerProfile/header.jsx';
import colors from '../../constants/theme.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { fetchAppointments } from '../../utils/functions/fetchBD.js';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/button';

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

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.clientName}>{item.customers.name}</Text>
        <TouchableOpacity onPress={() => console.log('Delete', item.id)} style={styles.deleteBtn}>
          <Ionicons name="trash" size={18} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.time}>{item.time}</Text>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={18} color={colors.white} style={styles.icon} />
            <Text style={styles.detailText}>
              {new Date(item.date).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="hammer" size={18} color={colors.white} style={styles.icon} />
            <Text style={styles.detailText}>{item.works.name}</Text>
          </View>
        </View>
      </View>
      
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button title="Confirmar" btnStyle={styles.confirmBtn} />
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={styles.price}>R$ {item.works.price}</Text>
        </View>
      </View>

    </View>
  );

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Text style={styles.title}>Agendamentos do dia</Text>

        <FlatList
          data={events}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
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
    marginBottom: 16
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white
  },
  deleteBtn: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 50
  },
  cardBody: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'flex-start'
  },
  time: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    width: 100
  },
  details: {
    flex: 1,
    justifyContent: 'center'
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 16
  },
  icon: {
    marginRight: 6
  },
  detailText: {
    fontSize: 14,
    color: colors.white
  },
  confirmBtn: {
    backgroundColor: colors.success,
    marginTop: 16,
    width: '50%',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 32,
    color: '#999'
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 20
  }
});
