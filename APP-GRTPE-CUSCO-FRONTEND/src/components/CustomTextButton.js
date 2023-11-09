import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CustomTextButton({ text, textButton, onPress }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{text} </Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.textButton}>{textButton}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
  },
  textButton: {
    color: "blue",
    fontWeight: "bold",
    fontSize: 18,
    textDecorationLine: "underline",
  },
});
