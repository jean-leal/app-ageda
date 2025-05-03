import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import Header from '../../components/headerProfile/header.jsx';
import Ionicons from '@expo/vector-icons/Ionicons';
import ItemCustomer from '../../components/itemCustomer/itemCustomer.jsx';

import { useAuth } from '../../contexts/AuthContext';

import colors from '../../constants/theme.js';
import ModalCustomer from '../(modals)/modalCustomer.jsx';
import { supabase } from '../../lib/supabase.js';

export default function Customers() {
  const { user } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [titleModal, setTitleModal] = useState('Cadastro');
  const [customers, setCustomers] = useState([]);
  const [selectCustomer, setSelectCustomer] = useState({});

  async function FetchCustomers () {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('user_id', user.id);
 
      if (data.length > 0) {
       setCustomers(data);
      }
    } catch (error) {
      Alert.alert("Erro ao carregar os dados");
    }
  }
  //chamando a função de fetch quando o componente é montado
  useEffect(() => {
    FetchCustomers();
  }, [])

  return (
    <View style={styles.container}>
      <Header />
      {
        //deixando o botão flutuante fora do corpo para ficar no rodape  
      }
      <TouchableOpacity onPress={() => setOpenModal(true)} style={styles.fab}>
        <Ionicons style={styles.icon} name={"add"} size={40} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.body}>
        <FlatList
          data={customers}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <ItemCustomer
              customer={item}
              openModal={() => setOpenModal(true)}
              editCustomer={()=>{
                setTitleModal('Editar');
                setOpenModal(true);
                setSelectCustomer(item);               
              }}
            />
          )}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.title}>Nenhum cliente cadastrado</Text>
            </View>
          )}
          ListHeaderComponent={() => (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingBottom: 16}}>
              <Text style={styles.title}>Clientes</Text>
            </View>
          )}
        />
        
        <Modal
          transparent
          visible={openModal}
          animationType="fade"
        >
          <ModalCustomer
            titleModal={titleModal}
            closeModal={() => {
              setOpenModal(false)
              FetchCustomers()// atualiza a lista de clientes sempre que o modal for fechado
            }}
            resetTitleModal={() => setTitleModal('Cadastro')}
            customer={selectCustomer}
          />
        </Modal>
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
    width: "100%",
    padding: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  titleItem: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 16
  },
  itemTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  text: {
    marginLeft: 10,
    color: colors.white
  },
  img: {
    borderWidth: 2,
    borderColor: colors.white,
    width: 80,
    height: 80,
    borderRadius: 50
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
