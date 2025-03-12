import { View, Text, StyleSheet } from 'react-native';

import Header from '../../components/headerProfile/header.jsx'

export default function Home() {
  return (
    <View style={styles.container}>
      <Header/>
      <Text>Tab [Home|Settings]</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
