import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList, Modal, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import colors from '../../constants/theme';
import Button from '../../components/button';

import { timeToMinutes } from '../../utils/functions/time';
import ModalSelectCustomer from './modalSelectCustomer';


export default function ModalAddAgenda({
  closeModal,
  selectedDate,
  refreshList,
  appointments
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

  // Formata a data selecionada para exibir o dia da semana, mês e ano
  const date = new Date(selectedDate).toLocaleDateString('pt-BR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

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
      .eq('user_id', user.id);

    if (error) throw error;

    if (!data || data.length === 0) {
      console.warn('Nenhum serviço encontrado.');
      setTimeSlots([]);
      return;
    }

    const date = `${selectedDate}T${new Date().toTimeString().split(' ')[0]}`;
    const dayIndex = weekDays[new Date(date).getDay()];

    const dayWork = data[0]?.days_week;

    if (!Array.isArray(dayWork)) {
      console.warn('days_week não é um array válido:', dayWork);
      setTimeSlots([]);
      return;
    }

    const resultDate = dayWork.find(day => day.display === dayIndex);

    if (!resultDate || resultDate.ativo === false) {
      console.log('Dia não disponível para agendamento');
      setTimeSlots([]);
      return;
    }

    const timeSlots = await timeToMinutes(resultDate.abertura, resultDate.fechamento);

    // 🔒 Protege caso appointments venha undefined
    const occupiedSlots = (appointments ?? []).map(item => {
      const [h, m] = item.time.split(":").map(Number);
      const start = h * 60 + m;
      const end = start + Number(item.work_duration || 0);
      return { start, end };
    });

    const availableSlots = timeSlots.filter(slot => {
      const [h, m] = slot.split(":").map(Number);
      const slotMinutes = h * 60 + m;

      return !occupiedSlots.some(
        ({ start, end }) => slotMinutes >= start && slotMinutes < end
      );
    });

    setTimeSlots(availableSlots);
  } catch (error) {
    console.error('Erro ao buscar horários:', error.message);
  }
}

  async function handleRegister() {
    // Verifica se o usuário selecionou um cliente, serviço e horário
    switch (true) {
      case !customer:
        return Alert.alert('Atenção', 'Selecione um cliente para continuar.');
      case !selectedWork:
        return Alert.alert('Atenção', 'Selecione um serviço para continuar.');
      case !selectedTime:
        return Alert.alert('Atenção', 'Selecione um horário para continuar.');
      default:
        try {
          const { error } = await supabase
            .from('appointments')
            .insert({
              user_id: user.id,
              customer_id: customer.id,
              work_id: selectedWork.id,
              work_duration: selectedWork.duration,
              work_name: selectedWork.name,
              work_price: selectedWork.price,
              date: selectedDate,
              time: selectedTime,
              notes: '',// adicionar campo de observações se necessário
            });

          if (error) {
            throw error;
          }

          Alert.alert('Sucesso', 'Agendamento realizado com sucesso!');
          refreshList()
          closeModal();
        } catch (error) {
          console.error('Erro ao agendar:', error.message);
          Alert.alert('Erro', 'Não foi possível realizar o agendamento. Tente novamente.');
        }

    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.boxTitle}>
          <Text style={styles.title}>{date}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => {
            closeModal()
          }}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Text style={styles.text}>Cliente:</Text>
            {!customer ?
              <View style={{ justifyContent: 'center' }}>
                <TouchableOpacity style={customer ? styles.btnAddCustomer : styles.btnAddCustomerSelected} onPress={() => setOpenModal(true)}>
                  <Text
                    style={styles.textBtnAddCustomer}>
                    Adicionar Cliente
                  </Text>
                  <Ionicons name="add" size={26} color={colors.white} />
                </TouchableOpacity>
              </View>
              :
              <View style={styles.boxEdtitCustomer}>
                <Text style={styles.textBtnAddCustomer}>{customer.name}</Text>
                <TouchableOpacity onPress={() => setOpenModal(true)}>
                  <Ionicons name="repeat" size={26} color={colors.white} />
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
          <Text style={{ marginTop: 12 }}>Selecione o serviço:</Text>
          <View style={{ marginVertical: 10 }}>
            <FlatList
              horizontal
              data={works}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={item?.id === selectedWork?.id ? styles.itemWorkSelected : styles.itemWork}
                  onPress={() => {
                    setSelectedWork(item)
                    fetchTime();
                  }}
                >
                  <Text style={item?.id === selectedWork?.id ? styles.textWorkSelected : styles.textWork}>
                    {item?.name}
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
          <Button
            title="Agendar"
            onPress={handleRegister}
            btnStyle={styles.btnRegister} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro semi-transparente
  },
  body: {
    backgroundColor: colors.white,
    padding: 16,
    borderRadius: 15,
    marginHorizontal: 20,
    overflow: "hidden",
    minHeight: '45%',
  },
  boxTitle: {
    paddingHorizontal: 18,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  },
  closeButton: {

  }
  ,
  title: {
    fontSize: 16,
    textAlign: "center",
    width: '100%',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    marginBottom: 6
  },
  itemWorkSelected: {
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 5,
    marginRight: 10,
  },
  itemWork: {
    backgroundColor: colors.grayLight,
    padding: 16,
    borderRadius: 5,
    marginRight: 10,
  },
  textWorkSelected: {
    color: colors.white,
    fontWeight: 'bold',
  },
  textWork: {
    color: colors.white,
    fontWeight: 'bold',
  },
  btnAddCustomer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10
  },
  btnAddCustomerSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.grayLight,
    padding: 10,
    borderRadius: 10
  },
  textBtnAddCustomer: {
    fontSize: 15,
    color: colors.white,
    fontWeight: 'bold',
    marginRight: 10,
    padding: 5,
  },
  boxEdtitCustomer: {
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: colors.primary,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnRegister: {
    marginTop: 40,
    backgroundColor: colors.primary
  }
});
