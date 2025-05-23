import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import colors from '../../constants/theme.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { supabase } from '../../lib/supabase.js';
import { use } from 'react';

export default function AgendaSelected({ day }) {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);

  useEffect(() => {
    async function fetchAgenda() {
      try {
        const { data, error } = await supabase
          .from('appointments')
          .select(`
            *,
            works (
            name,
            price
            )
            `)
          .eq('user_id', user.id)
          .eq('date', day);

        if (data?.length > 0) {
          setEvents(data);

        } else {
          //caso não tenha eventos para o dia selecionado ele reseta o estado
          setEvents([]);
          console.log("Nenhum evento encontrado para este dia.");
        }
      } catch (error) {
        console.error("Erro ao buscar eventos:", error);
      }
    }

    if (day) {
      fetchAgenda();
    }
  }, [day]);
  return (

    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => console.log("Adicionar evento")}
        style={styles.fab}
      >
        <Ionicons style={styles.icon} name={"add"} size={40} color={colors.white} />
      </TouchableOpacity>
    
      {events.length === 0 ? (
        <Text style={styles.title}>Nenhum agendamento encontrado...</Text>
      ) : (

   
      events.map((event) => (
        <View key={event.id} >
          <Text style={styles.title}>{'Data:  ' + event.date}</Text>
          <Text style={styles.title}>{'Horário:  '+ event.time}</Text>
          <Text style={styles.title}>{'Serviço:  '+ event.works.name}</Text>
          <Text style={styles.title}>{'Preço:  '+ event.works.price}</Text>
        </View>
      ))
    )}
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  text: {
    marginLeft: 10,
    color: colors.white
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20, // ajuste conforme necessário para não ficar colado na barra
    backgroundColor: colors.primary,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // para Android
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5, // para iOS
    zIndex: 1, // para garantir que fique acima de outros componentes
  },
});
