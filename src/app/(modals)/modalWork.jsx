import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Input from '../../components/input';
import Button from '../../components/button';

export default function ModalWork({ closeModal, titleModal }) {
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.boxTitle}>
          <Text style={styles.title}>{titleModal}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View >
        <Input iconName={'cog'} />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, overflow: 'hidden', marginRight: 10 }}>
            <Input
              iconName={'time'}
              keyboardType="numeric"
            />
          </View>
          <View style={{ flex: 1, overflow: 'hidden' }}>
            <Input
              iconName={'cash'}
              keyboardType="numeric"
            />
          </View>
        </View>
        <Button title={'Salvar'} />
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
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12, overflow: "hidden"
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
  }
});
