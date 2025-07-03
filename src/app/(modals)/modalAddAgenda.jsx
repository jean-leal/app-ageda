import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import colors from '../../constants/theme';


export default function ModalAddAgenda({
  closeModal,
  selectedDate,
}) {
  const { user } = useAuth();
  const [works, setWorks] = useState([]);

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
        <Text>Selecione o serviço.</Text>
        <FlatList
          horizontal
          data={works}
          renderItem={({ item }) => (          
            <Text>{item.name}</Text>
          )}
        />
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


});
