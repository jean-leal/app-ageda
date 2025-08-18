import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import colors from '../../constants/theme.js';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/button';
import { supabase } from '../../lib/supabase.js';

export default function CardHome({ item }) {
  async function confirmBtn() {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .update({ status: 'confirmed' })
        .eq('id', item.id)
        .single();

    } catch (err) {
      console.error('Erro ao confirmar agendamento:', err);
    }
   
  }
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.clientName}>{item.customers.name}</Text>
        <TouchableOpacity onPress={() => console.log('Delete', item.id)} style={styles.deleteBtn}>
          <Ionicons name="trash" size={18} color={colors.danger} />
        </TouchableOpacity>
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.time}>{item.time}</Text>

        <View style={styles.details}>
          <View style={styles.detailRow}>
            <Ionicons name="calendar" size={18} color={colors.white} style={styles.icon} />
            <Text style={styles.detailText}>
              {new Date(item.date).toLocaleDateString('pt-BR', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Ionicons name="hammer" size={18} color={colors.white} style={styles.icon} />
            <Text style={styles.detailText}>{item.work_name}</Text>
          </View>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Button
          title="Confirmar"
          btnStyle={styles.confirmBtn}
          onPress={() => confirmBtn()}
        />
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <Text style={styles.price}>R$ {item.work_price}</Text>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.primary,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 3
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  clientName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.white
  },
  deleteBtn: {
    backgroundColor: '#fff',
    padding: 6,
    borderRadius: 50
  },
  cardBody: {
    flexDirection: 'row',
    marginTop: 16,
    alignItems: 'flex-start'
  },
  time: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.white,
    width: 100
  },
  details: {
    flex: 1,
    justifyContent: 'center'
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginLeft: 16
  },
  icon: {
    marginRight: 6
  },
  detailText: {
    fontSize: 14,
    color: colors.white
  },
  confirmBtn: {
    backgroundColor: colors.success,
    marginTop: 16,
    width: '50%',
  },
  price: {
    fontSize: 28,
    fontWeight: 'bold',
    color: colors.white,
    marginLeft: 20
  }
});

