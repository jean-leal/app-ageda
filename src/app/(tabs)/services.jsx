import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Switch,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

import Header from '../../components/headerProfile/header';
import colors from '../../constants/theme';
import Button from '../../components/button';
import Input from '../../components/input';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import { maskTime } from '../../utils/masks/time';

export default function Services() {
  const { user } = useAuth();

  const [working, setWorking] = useState([
    { id: 0, ativo: false, display: "Domingo", abertura: "08:00", fechamento: "18:00" },
    { id: 1, ativo: false, display: "Segunda", abertura: "08:00", fechamento: "18:00" },
    { id: 2, ativo: false, display: "Terça", abertura: "08:00", fechamento: "18:00" },
    { id: 3, ativo: false, display: "Quarta", abertura: "08:00", fechamento: "18:00" },
    { id: 4, ativo: false, display: "Quinta", abertura: "08:00", fechamento: "18:00" },
    { id: 5, ativo: false, display: "Sexta", abertura: "08:00", fechamento: "18:00" },
    { id: 6, ativo: false, display: "Sábado", abertura: "08:00", fechamento: "18:00" },
  ]);

  const toggleSwitch = (id) => {
    setWorking(prev => prev.map(day =>
      day.id === id ? { ...day, ativo: !day.ativo } : day
    ));
  };

  const handleTimeChange = (id, value, type) => {
    setWorking(prev => {
      const newWorking = prev.map(day =>
        day.id === id ? { ...day, [type]: value } : day
      );
      return [...newWorking];
    });
  };

  useEffect(() => {
    async function DaysWeek() {
      try {
        const { data, error } = await supabase
          .from('services')
          .select('*')
          .eq('user_id', user.id);

        if (data.length > 0) {
          setWorking(data[0]?.days_week);
        }
      } catch (error) {
        Alert.alert("Erro ao carregar os dados");
      }
    }
    DaysWeek();
  }, []);

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
          days_week: working
        });

      if (error) {
        Alert.alert('Erro ao inserir:', error.message);
      } else {
        Alert.alert('Novo cadastro criado!');
      }
    } else {
      const { error } = await supabase
        .from('services')
        .update({ days_week: working })
        .eq('user_id', user.id);
      if (error) {
        Alert.alert('Erro ao atualizar:', error.message);
      } else {
        Alert.alert('Cadastro atualizado com sucesso!');
      }
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
      <Header />
      <View style={styles.body} keyboardShouldPersistTaps="handled">
        <FlatList
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          data={working}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={<Text style={styles.title}>Atendimento</Text>}
          renderItem={({ item }) => (
            <View style={styles.containerItem}>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Text style={styles.textBold}>{item.display}</Text>
                <Switch trackColor={{ false: colors.white, true: colors.white }}
                  thumbColor={item.ativo ? colors.grayLight : colors.white} value={item.ativo} onValueChange={() => toggleSwitch(item.id)} />
              </View>
              {item.ativo && (
                <View style={styles.containerHorario}>
                  <View>
                    <Text style={styles.text}>Horário de Abertura:</Text>
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
                  <View>
                    <Text style={styles.text}>Horário de Fechamento:</Text>
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
          ListFooterComponent={<View style={{ height: 80 }} ><Button btnStyle={{ width: '100%',height: 80, marginTop: 16, backgroundColor: colors.success }} title={'Salvar'} onPress={HandleUpdate} /></View>}
        />
      </View >
    </KeyboardAvoidingView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
  body: {
    flex: 1,
    marginHorizontal: 16
  },
  title: {
    width: 'auto',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold', 
    marginBottom: 18
  },
  containerItem: {
    marginBottom: 12,
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 10
  },
  textBold: {
    fontWeight: 'bold',
    fontSize: 16,
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
    ////idth: 100,
    backgroundColor: colors.white,
    textAlign: 'center',
    marginTop: 6,
  }
});
