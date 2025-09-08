import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  Switch,
  FlatList,
  StyleSheet,
  Alert
} from 'react-native';
import { useFocusEffect } from 'expo-router';

import Header from '../../components/headerProfile/header';
import colors from '../../constants/theme';
import Button from '../../components/button';
import Input from '../../components/input';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { maskTime } from '../../utils/masks/time';

export default function Services() {
  const { user } = useAuth();
  const [lunch, setLunch] = useState({ start: '00:00', end: '00:00' });

  const [working, setWorking] = useState([
    { id: 0, ativo: false, display: "Domingo", abertura: "08:00", fechamento: "18:00" },
    { id: 1, ativo: false, display: "Segunda", abertura: "08:00", fechamento: "18:00" },
    { id: 2, ativo: false, display: "Terça", abertura: "08:00", fechamento: "18:00" },
    { id: 3, ativo: false, display: "Quarta", abertura: "08:00", fechamento: "18:00" },
    { id: 4, ativo: false, display: "Quinta", abertura: "08:00", fechamento: "18:00" },
    { id: 5, ativo: false, display: "Sexta", abertura: "08:00", fechamento: "18:00" },
    { id: 6, ativo: false, display: "Sábado", abertura: "08:00", fechamento: "18:00" },
  ]);

  // Atualiza o estado do dia selecionado, alternando entre ativo e inativo
  const toggleSwitch = (id) => {
    setWorking(prev => prev.map(day =>
      day.id === id ? { ...day, ativo: !day.ativo } : day
    ));
  };

  // Atualiza o horário de abertura ou fechamento do dia selecionado
  const handleTimeChange = (id, value, type) => {
    setWorking(prev => {
      const newWorking = prev.map(day =>
        day.id === id ? { ...day, [type]: value } : day
      );
      return [...newWorking];
    });
  };

  // Função para buscar os dias de atendimento do usuário
  async function DaysWeek() {
    try {
      const { data, error } = await supabase
        .from('services')
        .select('*')
        .eq('user_id', user.id);

      if (data.length > 0) {
        setWorking(data[0]?.days_week);
        setLunch(data[0]?.lunch);
      }
    } catch (error) {
      Alert.alert("Erro ao carregar os dados");
    }
  }

  //chama a função DaysWeek quando o componente é focado
  useFocusEffect(
    useCallback(() => {
      DaysWeek();
    }, [])
  );

  async function HandleUpdate() {
    const { data } = await supabase
      .from('services')
      .select('*')
      .eq('user_id', user.id);

    if (data?.length <= 0) {
      const { error } = await supabase
        .from('services')
        .insert({
          user_id: user.id,
          days_week: working,
          lunch: lunch
        });

      if (error) {
        Alert.alert('Erro ao inserir:', error.message);
      } else {
        Alert.alert('Novo cadastro criado!');
      }
    } else {
      const { error } = await supabase
        .from('services')
        .update({ days_week: working, lunch: lunch })
        .eq('user_id', user.id);
      if (error) {
        Alert.alert('Erro ao atualizar:', error.message);
      } else {
        Alert.alert('Cadastro atualizado com sucesso!');
      }
    }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body} keyboardShouldPersistTaps="handled">
        <FlatList
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          data={working}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={
            <>
              <Text style={styles.title}>Dias de atendimento</Text>
              <View style={{ borderWidth: 2, padding: 12, marginBottom: 12, borderRadius: 10 }}>
                <Text>Horário de almoço.</Text>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <Input
                    inputStyle={styles.inputHorario}
                    placeholder='0:00'
                    iconName={'time'}
                    keyboardType="numeric"
                    value={lunch?.start}
                    onChangeText={(value) => setLunch({ ...lunch, start: maskTime(value) })}
                    maxLength={5}
                  />
                  <Input
                    inputStyle={styles.inputHorario}
                    placeholder='0:00'
                    iconName={'time'}
                    keyboardType="numeric"
                    value={lunch?.end}
                    onChangeText={(value) => setLunch({ ...lunch, end: maskTime(value) })}
                    maxLength={5}
                  />
                </View>
              </View>
            </>}
          renderItem={({ item }) => (
            <View style={[styles.containerItem, { backgroundColor: item.ativo ? colors.primary : colors.grayLight }]}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.textBold}>{item.display}</Text>
                <Switch trackColor={{ false: colors.white, true: colors.white }}
                  thumbColor={item.ativo ? colors.grayLight : colors.white} value={item.ativo} onValueChange={() => toggleSwitch(item.id)} />
              </View>
              {item.ativo && (
                <View style={styles.containerHorario}>
                  <View style={{ width: '45%' }}>
                    <Text style={styles.text}>Abertura:</Text>
                    <View>
                      <Input
                        inputStyle={styles.inputHorario}
                        placeholder='0:00'
                        iconName={'time'}
                        keyboardType="numeric"
                        value={item.abertura}
                        onChangeText={(value) => handleTimeChange(item.id, maskTime(value), 'abertura')}
                        maxLength={5}
                      />
                    </View>
                  </View>
                  <View style={{ width: '45%' }}>
                    <Text style={styles.text}>Fechamento:</Text>
                    <Input
                      inputStyle={styles.inputHorario}
                      placeholder='0:00'
                      iconName={'time'}
                      keyboardType="numeric"
                      value={item.fechamento}
                      onChangeText={(value) => handleTimeChange(item.id, maskTime(value), 'fechamento')}
                      maxLength={5}
                    />
                  </View>
                </View>
              )}
            </View>
          )}
          ListFooterComponent={<View style={{ height: 80, marginBottom: 60 }} ><Button btnStyle={{ width: '100%', height: 80, marginTop: 16, backgroundColor: colors.success }} title={'Salvar'} onPress={HandleUpdate} /></View>}
        />
      </View >
    </View >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingBottom: 16
  },
  body: {
    flex: 1,
    paddingHorizontal: 12,
  },
  title: {
    width: 'auto',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16
  },
  containerItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 10
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 14,
    color: colors.white
  },
  text: {
    color: colors.white
  },
  containerHorario: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  inputHorario: {
    backgroundColor: colors.white,
    textAlign: 'center',
    marginTop: 6,
    marginBottom: 2,
  }
});
