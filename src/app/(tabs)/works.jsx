import { View, Text, StyleSheet } from 'react-native';
import Header from '../../components/headerProfile/header.jsx'

export default function Works() {
  return (
    <View style={styles.container}>
      <Header/>
      <View>

      <Text>Works</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});
