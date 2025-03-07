import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import colors from '../../constants/theme';

export default function Button({btnStyle, title, ...rest }) {
  return (
    <View style={[styles.container, btnStyle]}>
      <TouchableOpacity style={styles.btnArea} {...rest}>
        <Text style={styles.btnText}>{title}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    margin:10, 
  },
  btnArea: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  btnText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "bold",
  }

});