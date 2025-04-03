import { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';

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
    const { error } = await supabase.auth.signOut();
    setAuth(null);

    if (error) {
      Alert.alert('Error', error.message);
      return;
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.containerImg}>
        <Image 
          source={ user?.url_image ? {uri: user?.url_image} : require('../../assets/user.png')} 
          style={styles.img} />
          <Text style={styles.title}  numberOfLines={1} ellipsizeMode="tail">{user?.name}</Text>
        </View>
      <ItemProfile iconName="mail" text={user?.email} />
      <ItemProfile iconName="home" text={`${user?.address} - ${user?.number}` || 'Rua não cadastrada'} />
      <ItemProfile iconName="location" text={`${user?.city} - ${user?.state}` || 'Cidade não cadastrada'} />
      <ItemProfile iconName="call" text={phoneMask(user?.phone) || 'Telefone não cadastrado'} />
      <Button title="Editar" onPress={() => setOpenModal(true)} btnStyle={{ marginTop: 50, width: '90%' }} />
      <Button title="Sair do App" onPress={handleSignOut} btnStyle={{ backgroundColor: colors.grayLight, width: '90%' }} />

      <Modal visible={openModal} animationType="slide" backgroundColor="rgba(0,0,0,0.5)">
        <ModalProfile closeModal={() => setOpenModal(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 60,
  },
  containerImg: {
    width: '100%',
    borderBottomWidth: 1,
    alignItems: 'center',
    paddingBottom: 28,
    flexDirection: 'row',
    marginBottom: 24,
    overflow: 'hidden'
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 18,
    flexShrink: 1
  }
});
