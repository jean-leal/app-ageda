import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import Header from '../../components/headerProfile/header.jsx'
import colors from '../../constants/theme.js';
import Button from '../../components/button';

export default function Tab() {

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.containerBody}>
        <Text style={styles.title}>Atendimento</Text>
        <Text style={styles.text}>Dias da Semana</Text>
        <ScrollView
          horizontal
          style={{ marginBottom: 8 }}
          showsHorizontalScrollIndicator={false}
        >
          <TouchableOpacity style={styles.btnWeek}>
            <Text style={styles.btnText}>Domingo</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnWeek}>
            <Text style={styles.btnText}>Segunda</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnWeek}>
            <Text style={styles.btnText}>Terça</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnWeek}>
            <Text style={styles.btnText}>Quarta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnWeek}>
            <Text style={styles.btnText}>Quinta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnWeek}>
            <Text style={styles.btnText}>Sexta</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnWeek}>
            <Text style={styles.btnText}>Sabádo</Text>
          </TouchableOpacity>

        </ScrollView>
        <Text style={styles.text}>Horários de Atendimento</Text>
        <View style={{ marginHorizontal: 16, flexDirection: 'row', width: '100%', marginBottom: 8 }}>
          <Text
            style={{ width: '50%', textAlignVertical: 'center', height: 40, borderRadius: 5, }}
          >
            Abertura
          </Text>
          <TextInput
            value={"12:00"}
            style={{ borderRadius: 5, color: colors.white, backgroundColor: colors.primary, width: 70, alignItems: 'center', textAlign: 'center', height: 40 }}
            keyboardType='numeric'
          />
        </View>

        <View style={{ marginHorizontal: 16, flexDirection: 'row', width: '100%' }}>
          <Text
            style={{ width: '50%', textAlignVertical: 'center', height: 40, borderRadius: 5, }}
          >
            Fechamento
          </Text>
          <TextInput
            value={"12:00"}
            style={{ borderRadius: 5, color: colors.white, backgroundColor: colors.primary, width: 70, alignItems: 'center', textAlign: 'center', height: 40 }}
            keyboardType='numeric'
          />
        </View>

        <Text style={styles.text}>Almoço</Text>
        <View style={{ marginHorizontal: 16, flexDirection: 'row', width: '100%', marginBottom: 8 }}>
          <Text
            style={{ width: '50%', textAlignVertical: 'center', height: 40, borderRadius: 5, }}
          >
            Saída
          </Text>
          <TextInput
            value={"12:00"}
            style={{ borderRadius: 5, color: colors.white, backgroundColor: colors.primary, width: 70, alignItems: 'center', textAlign: 'center', height: 40 }}
            keyboardType='numeric'
          />
        </View>
        <View style={{ marginHorizontal: 16, flexDirection: 'row', width: '100%' }}>
          <Text
            style={{ width: '50%', textAlignVertical: 'center', height: 40, borderRadius: 5, }}
          >
            Retorno
          </Text>
          <TextInput
            value={"12:00"}
            style={{ borderRadius: 5, color: colors.white, backgroundColor: colors.primary, width: 70, alignItems: 'center', textAlign: 'center', height: 40 }}
            keyboardType='numeric'
          />
        </View>
        <Button title='Salvar' btnStyle={{width: '60%', marginTop: 24}}/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  title: {
    width: '100%',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 16
  },
  containerBody: {
    alignItems: 'flex-start',
    padding: 16,
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12
  },
  btnWeek: {
    height: 45,
    width: 110,
    marginRight: 8,
    backgroundColor: colors.primary,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnText: {
    color: colors.white
  }

});
