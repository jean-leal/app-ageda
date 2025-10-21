import { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal, Alert } from 'react-native';

import Button from '../../components/button';
import ItemProfile from '../../components/itemProfile/itemProfile';
import ModalProfile from '../(modals)/modalProfile';

import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import colors from '../../constants/theme';
import { phoneMask } from '../../utils/masks/phone';

export default function Tab() {
  const [openModal, setOpenModal] = useState(false);
  const { setAuth, user } = useAuth();

  async function handleSignOut() {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        Alert.alert('Erro', error.message);
        return;
      }

    } catch (err) {
      Alert.alert('Erro inesperado', err.message);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image
          source={
            user?.url_image
              ? { uri: user.url_image }
              : require('../../../assets/user.png')
          }
          style={styles.img}
        />
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {user?.name ?? 'Usuário'}
        </Text>
      </View>

      <View style={styles.body}>
        <ItemProfile
          iconName="mail"
          text={user?.email ?? 'Email não cadastrado'}
        />

        <ItemProfile
          iconName="home"
          text={
            user?.address && user?.number
              ? `${user.address} - ${user.number}`
              : 'Rua não cadastrada'
          }
        />

        <ItemProfile
          iconName="location"
          text={
            user?.city && user?.state
              ? `${user.city} - ${user.state}`
              : 'Cidade não cadastrada'
          }
        />

        <ItemProfile
          iconName="call"
          text={user?.phone ? phoneMask(user.phone) : 'Telefone não cadastrado'}
        />

        <Button
          title="Editar"
          onPress={() => setOpenModal(true)}
          btnStyle={{ marginTop: 50, width: '90%' }}
        />

        <Button
          title="Sair do App"
          onPress={handleSignOut}
          btnStyle={{
            backgroundColor: colors.darkGray,
            width: '90%',
            marginTop: 12,
          }}
        />

        <Modal
          visible={openModal}
          animationType="slide"
          transparent
          onRequestClose={() => setOpenModal(false)}
        >
          <ModalProfile closeModal={() => setOpenModal(false)} />
        </Modal>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  body: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 16,
    paddingHorizontal: 16,
  },
  img: {
    borderWidth: 2,
    borderColor: colors.white,
    width: 80,
    height: 80,
    borderRadius: 60,
  },
  containerImg: {
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
    overflow: 'hidden',
    backgroundColor: colors.primary,
    borderBottomLeftRadius: 50,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginLeft: 18,
    flexShrink: 1,
    color: colors.white,
  },
});
