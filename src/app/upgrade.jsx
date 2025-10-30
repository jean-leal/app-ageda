import React from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';

import colors from '../constants/theme';

export default function Ugrade() { 

  return (
    <View style={styles.container}>
      <Text style = {{fontSize: 22}}>Upgrade Page - Em construção</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  }
});

