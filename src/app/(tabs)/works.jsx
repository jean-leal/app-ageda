import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import Header from '../../components/headerProfile/header.jsx';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import colors from '../../constants/theme.js';
import ModalWork from '../(modals)/modalWork.jsx';

import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { minutesToTime } from '../../utils/functions/time'

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
      {
        //deixando o botão flutuante fora do corpo para ficar no rodape  
      }
      <TouchableOpacity onPress={() => setOpenModal(true)} style={styles.fab}>
        <Ionicons style={styles.icon} name={"add"} size={40} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.body}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.title}>Serviços</Text>
        </View>
        {works.length === 0 ? <Text style={{ textAlign: 'center', fontSize: 16, marginTop: 12 }}>Nenhum serviço cadastrado...</Text> :
          <FlatList
            showsVerticalScrollIndicator={false}
            data={works}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
                    <Text style={styles.titleItem}>{item.name}</Text>
                  </View>
                  <View style={{ flexDirection: 'row'}}>
                    <View style={styles.itemTime}>
                      <Ionicons style={styles.icon} name={"time-outline"} size={26} color={colors.white} />
                      <Text style={styles.text}>{minutesToTime(item.duration)}</Text>
                    </View>
                    <View style={styles.itemTime}>
                      <Ionicons style={styles.icon} name={"cash-outline"} size={26} color={colors.white} />
                      <Text style={styles.text}>{item.price}</Text>
                    </View>
                  </View>
                </View>

                <View style={{ padding: 12 }}>
                  <TouchableOpacity onPress={() => EdtiWork(item)} style={{ backgroundColor: colors.white, borderRadius: 100, padding: 8, width: 40, height: 40, alignItems: 'center' }}>
                    <FontAwesome style={styles.icon} name={"pencil"} size={20} color={colors.primary} />
                  </TouchableOpacity>
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
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    width: "100%",
    padding: 16
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 18,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginBottom: 10,
    paddingBottom: 10
  },
  titleItem: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 14
  },
  itemTime: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    marginBottom: 6
  },
  text: {
    marginLeft: 10,
    color: colors.white
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
  }
});
