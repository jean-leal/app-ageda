import { View, Text, StyleSheet } from 'react-native';

import Header from '../../components/headerProfile/header.jsx'
import colors from '../../constants/theme.js';

export default function Home() {
  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.body}>
        <Text style={styles.title}>Agendamentos do dia</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16
  }
});
