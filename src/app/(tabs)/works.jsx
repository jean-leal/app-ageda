import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import Header from '../../components/headerProfile/header.jsx';
import Ionicons from '@expo/vector-icons/Ionicons';

import colors from '../../constants/theme.js';
import ModalWork from '../(modals)/modalWork.jsx';

export default function Works() {
  const [openModal, setOpenModal] = useState(false);

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
        <View style={styles.itemContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
            <Text style={styles.titleItem}>Nome do serviço</Text>
            <TouchableOpacity>
              <Ionicons style={styles.icon} name={"pencil"} size={26} color={colors.white} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemTime}>
            <TouchableOpacity>
              <Ionicons style={styles.icon} name={"time-outline"} size={28} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.text}>tempo de execução do serviço</Text>
          </View>
          <View style={styles.itemTime}>
            <TouchableOpacity>
              <Ionicons style={styles.icon} name={"cash-outline"} size={28} color={colors.white} />
            </TouchableOpacity>
            <Text style={styles.text}>valor do serviço</Text>
          </View>
        </View>
        <Modal
          transparent
          visible={openModal}
          animationType="fade"
        >
          <ModalWork titleModal={'Cadastro'} closeModal={() => setOpenModal(false)} />
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
