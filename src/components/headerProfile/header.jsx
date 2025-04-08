import React from "react";
import { View, Text, StyleSheet, Image } from 'react-native';

import { useAuth } from '../../contexts/AuthContext';
import colors from '../../constants/theme';

export default function Header() {
  const { user } = useAuth();

  return (
    <View style={styles.container}>
      <Image
        source={user?.url_image ? { uri: user?.url_image } : require('../../assets/user.png')}
        style={styles.img} />
      <View style={{ flex: 1, paddingLeft: 10 }}>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>{user?.name}</Text>
        <Text numberOfLines={1} ellipsizeMode="tail" style={styles.text}>{user?.email}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 80,
    alignItems: 'center',
    backgroundColor: colors.primary,
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingBottom: 8,
    borderBottomLeftRadius: 40,
    paddingTop: 8,
  },
  img: {
    borderWidth: 2,
    borderColor: colors.white,
    width: 60,
    height: 60,
    borderRadius: 100
  },
  title: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 18,
    flexShrink: 1
  }, 
  text: {
    color: colors.white,
    fontSize: 12,  
    flexShrink: 1,
    marginTop: 2
  }
});