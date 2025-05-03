import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Text, Alert } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

import Input from '../../components/input';
import Button from '../../components/button';
import colors from '../../constants/theme';
import { phoneMask } from '../../utils/masks/phone';

export default function ModalCustomer({ closeModal, titleModal, resetTitleModal, customer }) {

  const { user } = useAuth();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  useEffect(() => {
    if (titleModal === 'Editar') {
      setName(customer.name);
      setPhone(customer.phone);
    } else {
      return;
    }
  }, [customer]);

  async function handleSave() {
    // Verifica se os campos estão preenchidos
    if (!name || !phone) {
      Alert.alert('Campos Obrigatórios!', 'Preencha os campos de nome e telefone!');
      return;
    }
    //removendo caracteres especiais do telefone
    const phoneReplace = phone.replace(/\D/g, '');

    //passando os dados para o payload
    const payload = {
      name: name,
      phone: phoneReplace,
    }

    //quando se passa o titleModal 'Editar' ele faz um update, caso contrario faz um insert
    const query = titleModal === 'Editar'
      ? supabase.from('customers')
        .update(payload)
        .eq('id', customer.id)
      : supabase.from('customers')
        .insert([{ ...payload, user_id: user.id }]);

    //caso de algum erro no insert ou update
    const { error } = await query;

    if (error) {
      Alert.alert('Erro', 'Erro ao salvar cliente!');
    } else {
      Alert.alert('Sucesso', 'Cliente salvo com sucesso!');
      closeModal();
    }
  };

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <View style={styles.boxTitle}>
          <Text style={styles.title}>{titleModal}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => {
            closeModal()
            resetTitleModal()
          }}>
            <Ionicons name="close" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View>
          <Text style={styles.text}>Cliente: </Text>
          <Input
            iconName={'person'}
            placeholder='Nome'
            value={name}
            onChangeText={(e) => setName(e)}
          />

          <Input
            iconName={'call'}
            placeholder='Telefone'
            value={phone}
            onChangeText={(e) => setPhone(phoneMask(e))}
            keyboardType="numeric"
            maxLength={16} // Limita o número de caracteres para o formato (XX) XXXXX-XXXX
          />
        </View>
        <View style={{ alignContent: 'center', justifyContent: 'center', flexDirection: 'row', gap: 10 }}>
          {/* Botão de excluir cliente */
            titleModal === 'Editar' ? (
              <Button
                btnStyle={styles.btnDelete}
                title={'Excluir'}
                onPress={() => ''}
              />
            ) : ''
          }
          <Button
            btnStyle={styles.btn}
            title={'Salvar'}
            onPress={() => handleSave()}
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
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 24,
    overflow: "hidden"
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
  btnDelete: {
    marginTop: 10,
    backgroundColor: colors.danger,
    width: '100%',
  }
});
