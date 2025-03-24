import React, { useState } from 'react';
import { View, Text, Switch, FlatList, TextInput, StyleSheet, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';

import Header from '../../components/headerProfile/header';
import colors from '../../constants/theme';
import { timeMask } from '../../utils/masks/time';
import Button from '../../components/button'

export default function Services () {
  const [working, setWorking] = useState([
    { id: 0, ativo: false, display: "Domingo", abertura: "08:00", fechamento: "18:00" },
    { id: 1, ativo: false, display: "Segunda", abertura: "08:00", fechamento: "18:00" },
    { id: 2, ativo: false, display: "Terça", abertura: "08:00", fechamento: "18:00" },
    { id: 3, ativo: false, display: "Quarta", abertura: "08:00", fechamento: "18:00" },
    { id: 4, ativo: false, display: "Quinta", abertura: "08:00", fechamento: "18:00" },
    { id: 5, ativo: false, display: "Sexta", abertura: "08:00", fechamento: "18:00" },
    { id: 6, ativo: false, display: "Sábado", abertura: "08:00", fechamento: "18:00" },
  ])

  // alterando o dia, se esta ativou o fechado. 
  const toggleSwitch = (id) => {
    setWorking(prev => prev.map(day =>
      day.id === id ? { ...day, ativo: !day.ativo } : day
    ));
  };

  //função para adicionar o valor do dia de abertura ou fechamento dependendo do "type" que passar  
  const handleTimeChange = (id, event, type) => {
    setWorking(prev => prev.map(day =>
      day.id === id ? { ...day, [type]: event } : day
    ));
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : null}>
      <Header />
      <View style={styles.body} keyboardShouldPersistTaps="handled">
        <FlatList
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          data={working}
          keyExtractor={item => item.id.toString()}
          ListHeaderComponent={(
            <>
              <Text style={styles.title}>Atendimento</Text>
            </>
          )}
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
                    <TextInput
                      style={styles.inputHorario}
                      placeholder="00:00"
                      keyboardType="numeric"
                      value={item.abertura}
                      maxLength={5}
                      iconName={'time-outline'}
                      onChangeText={(event) => handleTimeChange(item.id, timeMask(event), 'abertura')}
                    />
                  </View>
                  <View>
                    <Text style={styles.text}>Horário de Fechamento:</Text>
                    <TextInput
                      style={styles.inputHorario}
                      placeholder="00:00"
                      keyboardType="numeric"
                      maxLength={5}
                      value={item.fechamento}
                      iconName={'time-outline'}
                      onChangeText={(event) => handleTimeChange(item.id, timeMask(event), 'fechamento')}
                    />
                  </View>
                </View>
              )}
            </View>
            
          )}
          ListFooterComponent={<View style={{ height: 80 }} ><Button btnStyle={{width:'50%'}} title={'Salvar'}/></View>} 
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
    marginHorizontal: 16,
    marginBottom: 160
  },
  title: {
    width: 'auto',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 12
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
    backgroundColor: colors.white,
    borderRadius: 5,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 6,
    padding: 8
  }
})