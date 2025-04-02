import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

import Input from '../../components/input';
import Button from '../../components/button';
import colors from '../../constants/theme';

export default function ModalWork({ closeModal, titleModal, refreshList, editWork, resetState }) {
  const { user } = useAuth();
  const [name, setName] = useState();
  const [duration, setDuration] = useState();
  const [price, setPrice] = useState();

  useEffect(() => {
    //sempre que e aberto a tela do modal, o useEffect verifica se foi passado algo em editWork, caso tenha passa aos states para um update. 
    if (titleModal === 'Editar' && editWork) {
      setName(editWork.name);
      setDuration(editWork.duration);
      setPrice(editWork.price);
    } else {
      setName('');
      setDuration('');
      setPrice('');
    }
  }, [titleModal, editWork]);

  async function HandleRegister() {
    //verifica se todos os campos estão preenchidos.
    if (!name || !duration || !price) {
      return Alert.alert('Erro', 'Precisa ser preenchido todos os campos.')
    }
    let response;

    if (editWork) {
      // se editWork existir, fa o update 
      response = await supabase
        .from('works')
        .update({
          name,
          duration,
          price
        })
        .match({ id: editWork.id }); // garante que esta editando o serviço correto
    } else {
      // se editWork for null, faz o cadastro normal
      // fazendo o cadastro passando o conteudo dos inputs, mas pegando o user_id do context
      response = await supabase
        .from('works')
        .insert([
          {
            user_id: user.id,
            name,
            duration,
            price
          }
        ]);
    }

    const { error } = response;

    if (error) {
      return Alert.alert('Erro ao salvar os dados.', error.message)
    }


    //fecha o modal e atualiza a lista
    closeModal();
    refreshList();

  }

  //função para deletar um work
  async function handleDelete(workId) {
    Alert.alert(
      "Confirmação",
      "Tem certeza que deseja excluir este serviço?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          onPress: async () => {
            const { error } = await supabase
              .from("works")
              .delete()
              .match({ id: workId });

            if (error) {
              return Alert.alert("Erro ao excluir.", error.message);
            }

            Alert.alert("Sucesso", "Serviço excluído com sucesso!");
            refreshList();
            closeModal();
          },
        },
      ]
    );
  }

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.boxTitle}>
          <Text style={styles.title}>{titleModal}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => { closeModal(), resetState() }}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View >
        <Text style={styles.text}>Descrição do Serviço:</Text>
        <Input
          iconName={'cog'}
          placeholder='Nome'
          value={name}
          onChangeText={(e) => setName(e)}
        />
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flex: 1, overflow: 'hidden', marginRight: 10 }}>
            <Text style={styles.text}>Duração:</Text>
            <Input
              placeholder='12:00'
              iconName={'time'}
              keyboardType="numeric"
              value={duration}
              onChangeText={(e) => setDuration(e)}
            />
          </View>
          <View style={{ flex: 1, overflow: 'hidden' }}>
            <Text style={styles.text}>Valor:</Text>
            <Input
              placeholder='0,00'
              iconName={'cash'}
              keyboardType="numeric"
              value={price}
              onChangeText={(e) => setPrice(e)}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', width: '100%', alignContent: 'center', justifyContent: 'center' }}>
          {titleModal === 'Editar' &&
            <Button 
              title={'Excluir'} 
              btnStyle={{ backgroundColor: colors.danger }} 
              onPress={() => handleDelete(editWork.id)}
            />}
          <Button title={'Salvar'} onPress={HandleRegister} />
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
  },
  text: {
    marginBottom: 6
  }
});
