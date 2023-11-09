import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function CustomButton({
  onPress,
  buttonText,
  buttonTextColor,
  heightButton,
  widthButton,
  borderColorButton,
  backgroundColorButton,
  submitting,
}) {
  return (
    <TouchableOpacity
      onPress={!submitting ? onPress : null}
      style={[
        styles.container,
        {
          height: heightButton,
          width: widthButton,
          backgroundColor: backgroundColorButton,
          borderColor: borderColorButton,
        },
      ]}
    >
      <Text style={[styles.text, { color: buttonTextColor }]}>
        {buttonText}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    marginHorizontal: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
