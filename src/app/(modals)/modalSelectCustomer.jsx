import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, FlatList } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

import Input from '../../components/input';
import colors from '../../constants/theme';

export default function ModalSelectCustomer({
  closeModal,
  customerSelected,
}) {
  const { user } = useAuth();
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    try {
      const fetchCustomers = async () => {
        const { data, error } = await supabase
          .from('customers')
          .select('*')
          .eq('user_id', user.id);

        if (error) {
          throw error;
        }
        if (data?.length > 0) {
          setCustomers(data);
        }
      };
      fetchCustomers();
    } catch (error) {
      console.error('Erro ao buscar clientes:', error.message);
    }
  }, []);

  //fazendo a busca no array de clientes
  const searchCustomers = customers.filter(customer => customer.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.boxTitle}>
          <Text style={styles.title}>Selecionar Cliente</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => {
            closeModal()
          }}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          <Input
            iconName={'search'}
            placeholder='Buscar Cliente'
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
        </View>
        <View>
          <FlatList
            data={searchCustomers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View>
                <TouchableOpacity onPress={() => {
                  customerSelected(item)
                  closeModal()
                  }}>
                  <Text style={styles.textSelectCustomer}>
                    {item.name}
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={<View style={{ marginBottom: 100 }} ></View>}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo escuro semi-transparente
  },
  container: {
    width: 350,
    backgroundColor: colors.white,
    borderRadius: 10,
    padding: 24,
    overflow: "hidden", 
    maxHeight: '60%',
    minHeight: '60%',
  },
  boxTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 18
  },
  title: {
    fontSize: 16,
    textAlign: "center",
    width: '100%',
    fontWeight: 'bold'
  },
  closeButton: {
    position: 'absolute',
    right: 10,
  },
  text: {
    marginBottom: 6
  },
  btn: {
    marginTop: 10,
    backgroundColor: colors.primary,
    width: '100%',
  },
  textSelectCustomer: {
    padding: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderColor: colors.grayLight,
    fontSize: 14,
    color: colors.black,
    borderRadius: 5,
    backgroundColor: colors.white,
  }
});
