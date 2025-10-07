import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import colors from '../../constants/theme.js';
import Button from '../../components/button';
import { supabase } from '../../lib/supabase.js';

export default function CardHome({ item }) {
  async function sendStatus(status) {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status: status })
        .eq('id', item.id)
        .single();

    } catch (err) {
      console.error('Erro ao confirmar agendamento:', err);
    }

  }
  return (
    <View style={styles.card}>
      <View style={styles.cardBody}>
        <Image source={require('../../../assets/user.png')} style={styles.img} />
        <View style={styles.details}>
          <View style={styles.cardName}>
            <Text style={styles.clientName}>{item.customers.name}</Text>
            <Text style={styles.detailText}>{item.work_name}</Text>
          </View>
          <View style={styles.cardPrice}>
            <Text style={styles.price}>R$ {item.work_price}</Text>
          </View>
        </View>
        <View style={styles.cardTime}>
          <Text style={styles.clientName}>Horário</Text>
          <Text style={styles.time}>{item.time}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button
          title="Finalizar"
          btnStyle={styles.finishBtn}
          onPress={() => sendStatus("finished")}
        />
        <Button
          title="Cancelar"
          btnStyle={styles.cancelBtn}
          onPress={() => sendStatus("canceled")}
        />
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  img: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: colors.white,
    marginRight: 8
  },
  card: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 12,
    marginBottom: 16, 
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3
  },
  cardName: {
    marginHorizontal: 8
  },
  cardTime: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white
  },
  cardBody: {
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  time: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  detailText: {
    fontSize: 14,
    color: colors.white
  },
  finishBtn: {
    backgroundColor: colors.success,
    marginTop: 16,
    width: '50%',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 8
  },
  cancelBtn: {
    backgroundColor: colors.danger,
    marginTop: 16,
    width: '50%',
    marginLeft: 8
  }
});

