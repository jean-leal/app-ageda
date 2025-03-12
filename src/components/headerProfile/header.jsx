import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

import { useAuth } from '../../contexts/AuthContext';
import colors from '../../constants/theme';

export default function Header() {
  const { user } = useAuth();
  
  return(
    <View style={styles.container}>
      <Image source={require('../../assets/user.png')} style={styles.img} />
      <Text style={styles.text}>{user?.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 70,
    alignItems: 'center',
    backgroundColor: colors.primary, 
    flexDirection: 'row',
    paddingHorizontal:8, 
    paddingBottom: 8, 
    borderBottomLeftRadius: 40, 
  },
  img:{
    width: 60, 
    height: 60,
    borderRadius: 100
  },
  text:{
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 12
  }
});