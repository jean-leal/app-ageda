import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";

import { Calendar, LocaleConfig } from "react-native-calendars";

import colors from "../../constants/theme.js";
import { ptBR } from "../../constants/localeCalendar.js";

//passando a informação de idioma para o calendário
LocaleConfig.locales["pt-br"] = ptBR;
LocaleConfig.defaultLocale = "pt-br";

// Pegando a largura da tela para o calendário ocupar 100% da tela
const screenWidth = Dimensions?.get('window').width;

export default function CalendarComponent({selectedDay}) {
  // Definindo o dia atual como padrão
  const [day, setDay] = useState({"dateString": new Date().toLocaleDateString('en-CA')});
console.log('Dia selecionado:', day.dateString);
  useEffect(( )=>{
    selectedDay(day.dateString)
  },[day])
  return (
    <View style={styles.container}>
      <Calendar
        style={styles.calendar}
        headerStyle={{
          borderBottomWidth: 0.5,
          borderBottomColor: colors.gray
        }}
        theme={{
          textMonthFontSize: 18,
          arrowColor: colors.primary,
        }}
        onDayPress={setDay}
        markedDates={day && {
          [day.dateString]: {
            selected: true,
            marked: true,
            selectedColor: colors.primary,
          },
        }}
        minDate={new Date().toISOString()}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: 'center',
    paddingHorizontal: 16
  },
  calendar: {
    backgroundColor: 'transparent',
    width: screenWidth, // garante que use 100% da largura
  }
});


