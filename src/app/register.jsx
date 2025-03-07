import React from 'react';
import { View, StyleSheet, Image} from 'react-native';

import Button from '../components/button';
import Input from '../components/input';
import colors from '../constants/theme';

export default function Regiter() {
  return (
    <View style={styles.container}>
      <Image source={require('../assets/user.png')} style={styles.img}/>
      <Input iconName={'person-outline'} placeholder='Nome'/>
      <Input iconName={'mail-outline'} placeholder='Email'/>
      <Input iconName={'lock-closed-outline'} placeholder='Senha'/>
      <Input iconName={'lock-closed-outline'} placeholder='Repita sua senha'/>
      <Button title='Cadastrar' btnStyle={{marginTop: 38, width: '90%'}}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 18, 
    alignItems: 'center', 
    paddingTop: 32
    }, 
    img: {
      width: 120,
      height: 120,
      marginBottom: 32
    }
});