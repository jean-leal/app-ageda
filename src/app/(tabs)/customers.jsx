import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, FlatList, Image } from 'react-native';
import Header from '../../components/headerProfile/header.jsx';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import colors from '../../constants/theme.js';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Header />
       {
        //deixando o botão flutuante fora do corpo para ficar no rodape  
      }
      <TouchableOpacity onPress={() => ''} style={styles.fab}>
        <Ionicons style={styles.icon} name={"add"} size={40} color={colors.white} />
      </TouchableOpacity>
      <View style={styles.body}>
        <View style={styles.itemContainer}>
          <Image source={require('../../assets/user.png')} style={styles.img} />
          <View style={{ flex: 1, paddingLeft: 10 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
              <Text style={styles.titleItem}>Cliente Maria de Lourdes</Text>
              <TouchableOpacity onPress={() => ''} style={{ backgroundColor: colors.white, borderRadius: 100, padding: 8, width: 36, height: 36, alignItems: 'center' }}>
                <FontAwesome style={styles.icon} name={"pencil"} size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <View style={styles.itemTime}>
              <Ionicons style={styles.icon} name={"mail-outline"} size={28} color={colors.white} />
              <Text style={styles.text}>marialoudes@gmail.com</Text>
            </View>
            <View style={styles.itemTime}>
              <Ionicons style={styles.icon} name={"call-outline"} size={28} color={colors.white} />
              <Text style={styles.text}>(44) 9 9999-9999</Text>
            </View>
          </View>
        </View>
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
    fontSize: 20,
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
    width: 100,
    height: 100,
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
