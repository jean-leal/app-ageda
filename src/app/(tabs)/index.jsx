import React, { useState, useEffect } from 'react';
import { useFocusEffect } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

import Header from '../../components/headerProfile/header.jsx'
import colors from '../../constants/theme.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { fetchAppointments } from '../../utils/functions/fetchBD.js';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/button';

export default function Home() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  //pega a data do brasil e retorna no formato YYYY-MM-DD
  const date = new Date().toLocaleDateString('pt-BR').split('/').reverse().join('-'); // Formata a data para YYYY-MM-DD

  // função para verificar os agendamentos do dia, fora do useEffect para poder ser chamada quando necessário
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
    //chama a função fetchAgenda para buscar os agendamentos do usuário
    if (user?.id) {
      fetchAgenda();
    }
  }, [user?.id]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Text style={styles.title}>Agendamentos do dia</Text>
        <View>
          <FlatList
            data={events}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.boxItem}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={styles.TitleItem}>{item.customers.name} - {item.works.name}</Text>
                  <TouchableOpacity onPress={() => console.log('Delete appointment', item.id)} style={{ backgroundColor: colors.white, padding: 3, borderRadius: 50 }}>
                    <Ionicons name="trash" size={18} color={colors.danger} />
                  </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, marginVertical: 12}} >
                  <View style={{ width: '50%', alignItems: 'center', justifyContent: 'center' }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                      <Text style={{fontSize: 38, color: colors.white, fontWeight: "bold"}}>{item.time}</Text>
                    </View>
                  </View>
                  <View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                      <Ionicons name="calendar" size={18} color={colors.white} style={{ marginRight: 6 }} />
                      <Text style={styles.textItem}>{new Date(item.date).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                      <Ionicons name="hammer" size={18} color={colors.white} style={{ marginRight: 6 }} />
                      <Text style={styles.textItem}>{item.works.name}
                      </Text>
                    </View>
                  </View>
                </View>
                <View>
                  <Button
                    title="Confirmar"
                    btnStyle={{ backgroundColor: colors.success }} />
                </View>
              </View>
            )}
            ListEmptyComponent={<Text>Nenhum agendamento para hoje.</Text>}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  },
  boxItem: {
    marginBottom: 12,
    borderRadius: 10,
    padding: 10,
    backgroundColor: colors.primary
  },
  textItem: {
    color: colors.white,
    fontSize: 14,
  },
  TitleItem: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4
  }
});
