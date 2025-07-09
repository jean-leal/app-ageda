import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Modal } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import colors from '../../constants/theme';

import { timeToMinutes } from '../../utils/functions/time';
import ModalSelectCustomer from './modalSelectCustomer';


export default function ModalAddAgenda({
  closeModal,
  selectedDate,
}) {
  const weekDays = [
    'Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'
  ];
  const { user } = useAuth();
  const [works, setWorks] = useState([]);
  const [selectedWork, setSelectedWork] = useState(null);
  const [timeSlots, setTimeSlots] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const { data, error } = await supabase
          .from('works')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }
        // armazena os dados 
        if (data?.length > 0) {
          setWorks(data);
        } else {
          //caso não tenha eventos para o dia selecionado ele reseta o estado
          setWorks([]);
        }
      } catch (error) {
        console.error('Erro ao buscar serviços:', error.message);
      }
    }
    fetchWorks();
  }, []);
  // função para buscar os horários disponíveis
  async function fetchTime() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id)

      if (error) {
        throw error;
      }
      // pega o dia que esta sendo passado e transforma em dia da semana
      const dayIndex = weekDays[new Date(selectedDate).getDay()];

      // passando o dia da semana para a consulta
      const dayWork = data[0]?.days_week

      // verifica se o dia existe no array de dias da semana
      const resultDate = dayWork.find(day => day.display === dayIndex);

      // verifica se o dia está ativo para agendamento
      if (resultDate.ativo === false) {
        return console.log('Dia não disponível para agendamento');
      }

      // convertendo horario inicial e final em um array de horários
      const timeSlots = await timeToMinutes(resultDate?.abertura, resultDate?.fechamento)

      setTimeSlots(timeSlots);

    } catch (error) {
      console.error('Erro ao buscar horários:', error.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.boxTitle}>
        <Text style={styles.title}>Titulo</Text>
        <TouchableOpacity style={styles.closeButton} onPress={() => {
          closeModal()
        }}>
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View>
        <Text>Dia Selecionado</Text>
        <Text>{selectedDate}</Text>
        <View>
          <Text>Selecione o Cliente: </Text>
          <Text></Text>
          {!customer ?
            <TouchableOpacity>
              <Text onPress={() => setOpenModal(true)}>
                Abrir Modal
              </Text>
            </TouchableOpacity>
            :
            <View>
              <Text>{customer.name}</Text>
              <TouchableOpacity>
                <Text onPress={() => setOpenModal(true)}>
                  Trocar Cliente
                </Text>
              </TouchableOpacity>
            </View>
          }
          <Modal
            transparent
            visible={openModal}
            animationType="fade"
          >
            <ModalSelectCustomer
              closeModal={() => {
                setOpenModal(false)
              }}
              customerSelected={(customer) => { setCustomer(customer) }}
            />
          </Modal>
        </View>
        <Text>Selecione o serviço:</Text>
        <View style={{ marginVertical: 10 }}>
          <FlatList
            horizontal
            data={works}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={item.id === selectedWork ? styles.itemWorkSelected : styles.itemWork}
                onPress={() => {
                  setSelectedWork(item.id)
                  fetchTime();
                }}
              >
                <Text style={item.id === selectedWork ? styles.textWorkSelected : styles.textWork}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
        <Text>Escolha o Horário:</Text>
        <View style={{ marginVertical: 10 }}>
          <FlatList
            horizontal
            data={timeSlots}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={item === selectedTime ? styles.itemWorkSelected : styles.itemWork}
                onPress={() => {
                  setSelectedTime(item);
                }}
              >
                <Text style={item === selectedTime ? styles.textWorkSelected : styles.textWork}>{item}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderColor: 'blue',
    height: '100%',
    marginTop: 100,
    backgroundColor: 'darkgrey',
    borderRadius: 10,
    padding: 16,
  },
  boxTitle: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    width: '100%',
    fontWeight: 'bold'
  },
  text: {
    marginBottom: 6
  },
  itemWorkSelected: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 5,
    marginRight: 10,
  },
  itemWork: {
    borderWidth: 2,
    borderColor: colors.gray,
    backgroundColor: colors.grayLight,
    padding: 16,
    borderRadius: 5,
    marginRight: 10,
  },
  textWorkSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  textWork: {
    color: colors.gray,
    fontWeight: 'bold',
  },
});
