import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import colors from '../../constants/theme.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { supabase } from '../../lib/supabase.js';
import Button from '../button/index.jsx';

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
            ), 
            customers (
            name,
            phone
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
        <View style={styles.containerItem}>
          <FlatList
            data={events}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <View style={styles.itemDivTime}>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <View style={styles.itemDivObs}>
                  <Text style={styles.title}>{item.customers.name}</Text>
                  <Text style={styles.text}>{'Serviço:  ' + item.works.name}</Text>
                  <Text style={styles.text}>{'Preço:  ' + item.works.price}</Text>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
                    <Button
                      title="Excluir"
                      onPress={() => console.log("excluir agendamento")}
                      btnStyle={{ height: 40, width: '40%', backgroundColor: colors.danger, marginTop: 10 }}
                    />
                    <TouchableOpacity
                      style={{ height: 40, marginTop:10, alignContent: 'center', justifyContent: 'center' }}
                      onPress={() => console.log("Abrir WhatsApp")}
                    >
                      <Ionicons
                        name="logo-whatsapp"
                        size={36}
                        color={colors.success}

                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
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
  time: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black
  },
  text: {
    color: colors.black
  },
  containerItem: {
    flex: 1,
    width: '100%',
    marginTop: 16,
  },
  item: {
    marginTop: 8,
    borderWidth: 1.5,
    borderColor: colors.primary,
    borderRadius: 10,
    marginHorizontal: 16,
    flexDirection: 'row',
    minHeight: 80,
    padding: 8
  },
  itemDivTime: {
    borderRightWidth: 1,
    borderColor: colors.primary,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemDivObs: {
    paddingLeft: 10,
    flex: 2,
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
