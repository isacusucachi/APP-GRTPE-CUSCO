import React from "react";
import { Image, StyleSheet, useWindowDimensions } from "react-native";

const logoImage = require("../../assets/images/positivo.png");

export default function Logo() {
  const { height } = useWindowDimensions();
  return (
    <Image
      source={logoImage}
      style={[styles.logo, { height: height * 0.15 }]}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
  },
});
