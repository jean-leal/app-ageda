import React from "react";
import { StyleSheet, View, TextInput } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


import colors from '../../constants/theme';

export default function Input({iconName, inputStyle, ...rest}) {
  return (
    <View style={[styles.inputArea, inputStyle]}>
      <Ionicons style={styles.icon} name={iconName || "search"} size={28} color={colors.grayLight}/>
      <TextInput style={styles.input} { ...rest }/>
    </View>
  );
}

const styles = StyleSheet.create({
  inputArea: {
    display: "flex",
    borderWidth: 1,
    borderColor: colors.gray,
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom:12,
    flexShrink: 1
  },
  icon:{
    paddingLeft: 10,
  }, 
  input:{
    width: "100%",   
    height: 50,
    paddingLeft: 10,
    paddingRight: 10,
    color: colors.black, 
    fontSize: 16,
    flexShrink: 1
  }

});