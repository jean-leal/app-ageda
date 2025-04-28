import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

import colors from '../../constants/theme';

export default function Button({ loading, btnStyle, title, ...rest }) {
  return (
    <TouchableOpacity style={[styles.btnArea, btnStyle]} {...rest}>
      <Text style={styles.btnText}>{loading ? 'Carregando...' : title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({

  btnArea: {
    width: "auto",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
    flexShrink: 1
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "bold",
  }

});