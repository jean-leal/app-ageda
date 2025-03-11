import React, { useState } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

import colors from '../constants/theme';

export default function App() { 

  return (
    <View style={styles.container}>
      <ActivityIndicator size={44} color={colors.primary} />
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

