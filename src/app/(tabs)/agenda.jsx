import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import Header from '../../components/headerProfile/header.jsx'
import colors from '../../constants/theme.js';

import CalendarComponent from '../../components/calendar';
import AgendaSelected from '../../components/agendaSelected';

export default function Agenda() {
  const [day, setDay] = useState();
  
  return (
    <View style={styles.container}>
      <Header />
      <CalendarComponent 
        //passando o dia selecionado para o componente pai
        selectedDay={(e)=> setDay(e)}
      />
      <AgendaSelected 
        //passando o dia selecionado para o componente filho
        day={day}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },
});
