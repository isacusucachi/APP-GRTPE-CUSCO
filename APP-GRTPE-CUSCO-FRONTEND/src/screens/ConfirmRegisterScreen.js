import React, { useState } from "react";
import { StyleSheet, View, Text, Dimensions, Image } from "react-native";

import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

export default function ConfirmRegisterScreen({ navigation }) {
  const onContinuePressed = () => {
    navigation.navigate("Login");
  };

  return (
    <View style={styles.root}>
      <Logo />
      <Text style={{ fontSize: 30, fontWeight: "bold" }}>¡Felicidades!</Text>
      <Text>Tu nueva cuenta ha sido creada</Text>
      <Image
        source={require("../../assets/gifs/confetti.gif")}
        style={{ marginVertical: "10%", width: "70%", height: "30%" }}
      ></Image>
      <CustomButton
        buttonText={"Continuar"}
        buttonTextColor={"white"}
        widthButton={"70%"}
        heightButton={"7%"}
        borderColorButton={"#1B3F89"}
        backgroundColorButton={"#1B3F89"}
        onPress={onContinuePressed}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  ImageBackground: {
    height: screenHeight,
    width: screenWidth,
    alignItems: "center",
  },
});
