import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import colors from '../../constants/theme.js';
import { phoneMask } from '../../utils/masks/phone.js';

export default function ItemCustomer({ customer, editCustomer }) {  

  return (
    <View style={styles.body}>
      <View style={styles.itemContainer}>
        <Image source={require('../../assets/user.png')} style={styles.img} />
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.titleItem}>{customer.name}</Text>
            <TouchableOpacity onPress={() => {
              editCustomer()
            }} 
              style={{ backgroundColor: colors.white, borderRadius: 100, padding: 8, width: 36, height: 36, alignItems: 'center' }}>
              <FontAwesome style={styles.icon} name={"pencil"} size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <View style={styles.itemTime}>
            <Ionicons style={styles.icon} name={"call-outline"} size={28} color={colors.white} />
            <Text style={styles.text}>{phoneMask(customer.phone)}</Text>
          </View>
        </View>
      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    width: "100%", 
    marginBottom: 12,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  titleItem: {
    fontWeight: 'bold',
    color: colors.white,
    fontSize: 16
  },
  itemTime: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6
  },
  text: {
    marginLeft: 10,
    color: colors.white
  },
  img: {
    borderWidth: 2,
    borderColor: colors.white,
    width: 60,
    height: 60,
    borderRadius: 50
  },
});
