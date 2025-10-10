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
      <View style={styles.body}>
        <View style={styles.time}>
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
        <View style={styles.details}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <View style={styles.cardName}>
              <Text style={styles.clientName}>{item.customers.name}</Text>
              <Text style={styles.detailText}>{item.work_name}</Text>
            </View>
            <View style={styles.cardPrice}>
              <Text style={styles.price}>R$ {item.work_price}</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', alignContent: 'center', justifyContent: 'flex-end' }}>
            <Button
              title="Cancelar"
              btnStyle={styles.cancelBtn}
              onPress={() => sendStatus("canceled")}
            />
            <Button
              title="Finalizar"
              btnStyle={styles.finishBtn}
              onPress={() => sendStatus("finished")}
            />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    marginBottom: 16,
    padding: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3,
  },
  cardName: {
    marginHorizontal: 8
  },
  time: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    paddingRight: 8,
    borderColor: colors.white
  },
  cardPrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  clientName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.white
  },
  body: {
    flexDirection: 'row',
  },
  timeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.white,
    borderWidth: 3,
    borderColor: colors.white,
    borderRadius: 40,
    width: 80,
    height: 80,
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  details: {
    flex: 1
  },
  detailText: {
    fontSize: 14,
    color: colors.white
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
    width: '35%',
    height: 40,
  },
  finishBtn: {
    backgroundColor: colors.success,
    marginTop: 16,
    width: '35%',
    height: 40,
    marginLeft: 8
  }
});

