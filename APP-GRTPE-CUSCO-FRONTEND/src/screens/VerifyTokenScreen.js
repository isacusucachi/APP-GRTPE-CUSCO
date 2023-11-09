import React from "react";
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  Text,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { Wave } from "react-native-animated-spinkit";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Logo from "../components/Logo";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { verifyResetPasswordToken } from "../api/api";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const TokenSchema = Yup.object().shape({
  token: Yup.string()
    .matches(/^[0-9]*$/, "Código no válido")
    .min(6, "Código no válido")
    .max(6, "Código no válido")
    .required("Este campo es obligatorio"),
});

export default function VerifyTokenScreen({ navigation }) {

  const mutation = useMutation((values) => verifyResetPasswordToken(values));

  const handleSubmit = async (values) => {
    try {
      // Send form values to the backend server
      const savedForgetPasswordEmail = await AsyncStorage.getItem("ForgetPasswordEmail")
      const response = await mutation.mutateAsync({
        ...{ email: savedForgetPasswordEmail },
        ...values,
      });
      // Handle the response from the server
      if (response.status == 200) {
        await AsyncStorage.setItem("ForgetPasswordToken", values.token);
        navigation.navigate("NewPassword");
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
          Te enviamos un código a tu correo
        </Text>
        <Text style={{ textAlign: "center" }}>
          Ingrese el código de verificación de 6 dígitos enviado a su correo
          electrónico
        </Text>
      </View>
      <Formik
        initialValues={{
          token: "",
        }}
        validationSchema={TokenSchema}
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
          const { token } = values;
          return (
            <>
              <CustomInput
                placeholder="Código*"
                value={token}
                error={touched.token && errors.token}
                onchangeText={handleChange("token")}
                onBlur={handleBlur("token")}
                textInputIcon={
                  <TextInput.Icon icon="pound" iconColor="#003580" />
                }
                widthInput={"95%"}
                maxLength={6}
                keyboardType={"numeric"}
              />
              <View style={{ height: 20 }}></View>
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
