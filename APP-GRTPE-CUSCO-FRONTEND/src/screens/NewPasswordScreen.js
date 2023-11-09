import React, { useState } from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  Alert,
  TouchableOpacity,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { Wave } from "react-native-animated-spinkit";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from "../components/Logo";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { resetPassword } from "../api/api";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const PasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .trim()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .required("Este campo es obligatorio"),
  confirmNewPassword: Yup.string().equals(
    [Yup.ref("newPassword"), null],
    "No coincide la nueva contraseña"
  ),
});

export default function NewPasswordScreen({ navigation }) {

  const [ShowPasswords, setShowPasswords] = useState(true);

  const mutation = useMutation((values) => resetPassword(values));

  const handleSubmit = async (values) => {
    try {
      const savedForgetPasswordEmail = await AsyncStorage.getItem("ForgetPasswordEmail")
      const savedForgetPasswordToken = await AsyncStorage.getItem("ForgetPasswordToken")
      // Send form values to the backend server
      const response = await mutation.mutateAsync({
        ...{ email: savedForgetPasswordEmail, token: savedForgetPasswordToken },
        ...values,
      });
      // Handle the response from the server
      if (response.status == 200) {
        Alert.alert("Felicidades, su contraseña fue cambiada con éxito.");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  if (mutation.isLoading) {
    return (
      <View style={styles.indicatorWrapper}>
        <Wave size={64} color="#003580" />
        <Text style={styles.indicatorText}>Espere un momento...</Text>
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
      }}
      style={styles.root}
    >
      <Logo />
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
          width: "90%",
        }}
      >
        <Text
          style={{
            color: "#000000",
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          Elija una contraseña nueva
        </Text>
        <Text style={{ textAlign: "center" }}>
          Cree una nueva contraseña que tenga al menos 8 caracteres
        </Text>
      </View>
      <Formik
        initialValues={{
          newPassword: "",
          confirmNewPassword: "",
        }}
        validationSchema={PasswordSchema}
        onSubmit={handleSubmit}
      >
        {({
          values,
          errors,
          touched,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => {
          const { newPassword, confirmNewPassword } = values;
          return (
            <>
              <CustomInput
                placeholder="Nueva contraseña*"
                value={newPassword}
                error={touched.newPassword && errors.newPassword}
                onchangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                secureTextEntry={ShowPasswords}
                textInputIcon={
                  <TextInput.Icon icon="lock" iconColor="#003580" />
                }
                widthInput={"95%"}
              />
              <CustomInput
                placeholder="Repetir nueva contraseña*"
                value={confirmNewPassword}
                error={touched.confirmNewPassword && errors.confirmNewPassword}
                onchangeText={handleChange("confirmNewPassword")}
                onBlur={handleBlur("confirmNewPassword")}
                secureTextEntry={ShowPasswords}
                textInputIcon={
                  <TextInput.Icon icon="lock-check" iconColor="#003580" />
                }
                widthInput={"95%"}
              />
              <View style={{ height: 20 }}></View>
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  alignSelf: "flex-end",
                  paddingRight: "2.5%",
                  marginBottom: 10,
                }}
                onPress={() => {
                  setShowPasswords((item) => !item);
                }}
              >
                <Ionicons
                  name={ShowPasswords ? "eye-outline" : "eye-off-outline"}
                  size={18}
                  color={"#2596BE"}
                />
                {ShowPasswords ? (
                  <Text style={{ color: "#2596BE" }}> Mostrar contraseñas</Text>
                ) : (
                  <Text style={{ color: "#2596BE" }}> Ocultar contraseñas</Text>
                )}
              </TouchableOpacity>
              <CustomButton
                buttonText={"Continuar"}
                submitting={isSubmitting}
                onPress={handleSubmit}
                buttonTextColor={"white"}
                borderColorButton={"white"}
                heightButton={55}
                widthButton={"80%"}
                backgroundColorButton={"#003580"}
              />
            </>
          );
        }}
      </Formik>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: "white",
  },
  ImageBackground: {
    height: screenHeight,
    width: screenWidth,
    alignItems: "center",
  },
  indicatorWrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  indicatorText: {
    fontSize: 18,
    marginTop: 12,
    color: "#003580",
    fontWeight: "bold",
  },
});
