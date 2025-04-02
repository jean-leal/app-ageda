import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Header from '../../components/headerProfile/header.jsx';
import Ionicons from '@expo/vector-icons/Ionicons';

import colors from '../../constants/theme.js';
import ModalWork from '../(modals)/modalWork.jsx';

import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function Works() {
  const { user } = useAuth()
  const [openModal, setOpenModal] = useState(false);
  const [works, setWorks] = useState([]);
  const [selectWork, setSelectWork] = useState();
  const [titleModal, setTitleModal] = useState('Cadastro');

  async function fetchWorks() {
    try {
      //faz uma consulta no banco para trazendo as informações dos cadastros feitos considerando o campo user_id igual a do usuario logado 
      const { data, error } = await supabase
        .from('works')
        .select('*')
        .eq('user_id', user.id)

      return setWorks(data);

    } catch (error) {
      Alert.alert("Erro ao carregar os dados");

    }
  }
  useEffect(() => {

    fetchWorks()

  }, [])

  //passando as informaçoes do work que vai ser editado 
  function EdtiWork(work) {
    setSelectWork(work)
    setTitleModal('Editar')
    setOpenModal(true)    
  }

  //resetando os states do modal para não afetar quando clicar no botao de novo registro
  function resetState() {
    setSelectWork();
    setTitleModal('Cadastro')
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.title}>Serviços</Text>
          <TouchableOpacity onPress={() => setOpenModal(true)}>
            <Ionicons style={styles.icon} name={"add-circle"} size={40} color={colors.primary} />
          </TouchableOpacity>
        </View>
        {works.length === 0 ? <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 12 }}>Nenhum serviço cadastrado...</Text> :
          <FlatList
            showsVerticalScrollIndicator={false}
            data={works}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
                  <Text style={styles.titleItem}>{item.name}</Text>
                  <TouchableOpacity onPress={() => EdtiWork(item)}>
                    <Ionicons style={styles.icon} name={"pencil"} size={26} color={colors.white} />
                  </TouchableOpacity>
                </View>
                <View style={styles.itemTime}>
                  <TouchableOpacity>
                    <Ionicons style={styles.icon} name={"time-outline"} size={28} color={colors.white} />
                  </TouchableOpacity>
                  <Text style={styles.text}>{item.duration}</Text>
                </View>
                <View style={styles.itemTime}>
                  <TouchableOpacity>
                    <Ionicons style={styles.icon} name={"cash-outline"} size={28} color={colors.white} />
                  </TouchableOpacity>
                  <Text style={styles.text}>{item.price}</Text>
                </View>
              </View>
            )}
          />
        }
        <Modal
          transparent
          visible={openModal}
          animationType="fade"
        >
          <ModalWork
            editWork={selectWork}
            titleModal={titleModal}
            closeModal={() => setOpenModal(false)}
            resetState={resetState}
            refreshList={fetchWorks}

          />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  body: {
    flex: 1,
    width: "100%",
    padding: 16
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  itemContainer: {
    backgroundColor: colors.primary,
    borderRadius: 5,
    marginTop: 12,
    paddingBottom: 10
  },
  titleItem: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 16
  },
  itemTime: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 8
  },
  text: {
    marginLeft: 10,
    color: colors.white
  }
});
