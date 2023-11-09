import React, { useState } from "react";
import { View, StyleSheet, Text, Pressable, Image } from "react-native";

export default function GoogleEnterButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image
        source={{ uri: "https://img.icons8.com/color/32/null/google-logo.png" }}
        style={styles.icon}
      />
      <Text style={styles.text}>Continuar con Google</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    width: "60%",
    height: 40,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  icon: {
    width: 32,
    height: 32,
  },
  text: {
    color: "black",
    fontWeight: "bold",
  },
});
