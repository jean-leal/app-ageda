import { View, StyleSheet } from 'react-native';
import Header from '../../components/headerProfile/header.jsx'
import colors from '../../constants/theme.js';

import CalendarComponent from '../../components/calendar';

export default function Agenda() {
  return (
    <View style={styles.container}>
      <Header />
      <CalendarComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
  },
});
