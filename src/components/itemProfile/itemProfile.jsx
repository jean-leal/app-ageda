import React from "react";
import { StyleSheet, View, TextInput, Text } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';


import colors from '../../constants/theme';

export default function ItemProfile({ iconName, itemStyle, text, ...rest }) {
  return (
    <View style={[styles.inputArea, itemStyle]}>
      <Ionicons style={styles.icon} name={iconName || "search"} size={24} color={colors.grayLight} />
      <Text style={styles.text}>{text}</Text>
    </View>

  );
}

const styles = StyleSheet.create({
  inputArea: {
    backgroundColor: colors.primary,
    width: "100%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 16
  },
  icon: {
    paddingLeft: 16,
    color: colors.white
  },
  text: {
    fontWeight: 'bold',
    paddingHorizontal: 12,
    color: colors.white,
    fontSize: 16,
    flexShrink: 1
  }

});