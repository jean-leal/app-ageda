import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/headerProfile/header.jsx'
import colors from '../../constants/theme.js';

export default function Tab() {
  return (
    <View style={styles.container}>
      <Header/>
      <View>

      <Text>Tab [Home|Settings]</Text>
      </View>
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
