import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import Input from '../../components/input';
import Button from '../../components/button';

export default function ModalProfile({ closeModal }) {
  return (
    <View style={styles.container}>
      <View style={styles.exit}>
        <TouchableOpacity onPress={closeModal}>
          <Ionicons name="close" size={46} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.form}>
        <Image source={require('../../assets/user.png')} style={styles.img} />
        <View style={styles.containerIcon}>
          <TouchableOpacity>
            <Ionicons name="add" size={32} color="white" style={{ backgroundColor: 'red', borderRadius: 100 }} />
          </TouchableOpacity>
        </View>
        <Input placeholder="Nome" iconName='person-outline' />
        <Input placeholder="Email" iconName='mail-outline' />
        <Input placeholder="Telefone" iconName='call-outline' />
        <Input placeholder="Cidade" iconName='home-outline' />
        <Input placeholder="Estado" iconName='home-outline' />
        <Input placeholder="Endereço" iconName='home-outline' />
        <Input placeholder="Número" iconName='home-outline' />
        <View style={{flexDirection: 'row'}}>
          <Button title="Salvar" btnStyle={{ marginTop: 45, width: '80%' }} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  exit: {
    width: '100%',
    marginTop: 10,
    alignItems: 'flex-end',
    paddingHorizontal: 12
  },
  img: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignSelf: 'center',
  },
  form: {
    padding: 16,
    alignItems: 'center',
  },
  containerIcon: {
    width: 120,
    alignItems: 'flex-end',
    marginBottom: 38,
    marginTop: -40
  }
});
