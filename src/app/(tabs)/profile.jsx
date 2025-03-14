import { useState } from 'react';
import { View, Text, StyleSheet, Image, Modal } from 'react-native';

import Button from '../../components/button';
import ItemProfile from '../../components/itemProfile/itemProfile';
import ModalProfile from '../(modals)/modalProfile';

import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import colors from '../../constants/theme';


export default function Tab() {
  const [ openModal, setOpenModal ] = useState(false);
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
        <Image source={require('../../assets/user.png')} style={styles.img} />
        <Text style={styles.title}>{user?.name}</Text>
      </View>
      <ItemProfile iconName="mail" text={user?.email} />
      <ItemProfile iconName="home" text={user?.road || 'Rua não cadastrada'} />
      <ItemProfile iconName="pin" text={user?.cidade || 'Cidade não cadastrada'} />
      <ItemProfile iconName="call" text={user?.phone || 'Telefone não cadastrado'} />
      <Button title="Editar" onPress={() => setOpenModal(true)} btnStyle={{ marginTop: 50 }} />
      <Button title="Sair do App" onPress={handleSignOut} btnStyle={{ backgroundColor: colors.grayLight }} />
      
      <Modal visible= {openModal} animationType="slide" backgroundColor="rgba(0,0,0,0.5)">
        <ModalProfile closeModal={() => setOpenModal(false)}/>
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
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  containerImg: {
    width: "100%",
    borderBottomWidth: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingBottom: 28,
    flexDirection: 'row',
    marginBottom: 24
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 18,
  }
});
