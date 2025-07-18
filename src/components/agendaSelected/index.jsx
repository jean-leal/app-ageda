import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, FlatList, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import colors from '../../constants/theme.js';
import { useAuth } from '../../contexts/AuthContext.js';
import { supabase } from '../../lib/supabase.js';
import { fetchAppointments } from '../../utils/functions/fetchBD.js';
import ModalAddAgenda from '../../app/(modals)/modalAddAgenda.jsx';

export default function AgendaSelected({ day }) {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  //função para deletar um agendamento
  async function handleDelete(eventId) {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir este agendamento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            const { error } = await supabase
              .from("appointments")
              .delete()
              .match({ id: eventId });

            if (error) {
              return Alert.alert("Erro ao excluir.", error.message);
            }

            Alert.alert("Sucesso", "Agendamento excluído com sucesso!");
            fetchAgenda();
            closeModal();
          },
        },
      ]
    );
  }

  async function fetchAgenda() {
    const data = await fetchAppointments(user.id, day);
    if (data.length > 0) {
      setEvents(data);
    }
    // Se não houver eventos, reseta o estado, passando um array vazio que esta sendo retornado pela função fetchAppointments
    setEvents(data);
  }

  async function SearchDayAgenda () {
    // chama a função que busca os dias da semana ativos para atualizar o estado working
    const daysServices = await DaysWeek()

    // adiciona a hora atual para evitar problemas de fuso horário
    const date = new Date(day).toLocaleDateString('pt-BR').split('/').reverse().join('-'); // Formata a data para YYYY-MM-DD
    const dayIndex = new Date(date).getDay();

    // verifica se o dia está ativo para agendamento
    const isDayActive = daysServices[dayIndex]?.ativo
    
    // se não estiver ele retorna um alerta
    if (!isDayActive) {
      return Alert.alert("Dia não disponível para agendamento, ative o dia na aba de atendimento.");
    }
    else {
      //caso esteja ativo ele abre o modal
      setOpenModal(true);
    }
  }

  // função para buscar os dias da semana ativos
  async function DaysWeek() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id);

      if (data.length > 0) {
        //setWorking(data[0]?.days_week);
        return(data[0]?.days_week);
      }
    } catch (error) {
      Alert.alert("Erro ao carregar os dados");
    }
  }


  useEffect(() => {
    if (day) {
      fetchAgenda();
    }

  }, [day]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={SearchDayAgenda}
        style={styles.fab}
      >
        <Ionicons style={styles.icon} name={"add"} size={40} color={colors.white} />
      </TouchableOpacity>

      {events.length === 0 ? (
        <View style={{ flex: 1, marginTop: 24, alignItems: 'center' }}>
          <Text style={styles.title}>Nenhum agendamento encontrado...</Text>
        </View>
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
                </View>
                <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                  <TouchableOpacity
                    style={{ alignContent: 'center', justifyContent: 'center' }}
                    onPress={() => handleDelete(item.id)}
                  >
                    <Ionicons
                      name="trash"
                      size={24}
                      color={colors.danger}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ marginTop: 10, alignContent: 'center', justifyContent: 'center' }}
                    onPress={() => console.log("Abrir WhatsApp")}
                  >
                    <Ionicons
                      name="logo-whatsapp"
                      size={24}
                      color={colors.success}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      )}
      <Modal
        visible={openModal}
        animationType="fade"
        transparent={true}
      >
        <ModalAddAgenda
          appointments={events}
          closeModal={() => setOpenModal(false)}
          selectedDate={day}
          refreshList={() => {
            // Recarrega a lista de eventos após adicionar um novo agendamento
            fetchAgenda();
          }}
        />
      </Modal>
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
    fontSize: 16,
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
    bottom: 80, // ajuste conforme necessário para não ficar colado na barra
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
