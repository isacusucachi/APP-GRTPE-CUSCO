import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Alert,
  useWindowDimensions,
  Image,
} from "react-native";
import { TextInput } from "react-native-paper";
import { Formik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { Wave } from "react-native-animated-spinkit";

import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { signUp } from "../api/api";

const SignupSchema = Yup.object({
  fullname: Yup.string()
    .trim()
    .min(3, "Nombres y apellidos no válidos")
    .required("Este campo es obligatorio"),
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("Este campo es obligatorio"),
  phoneNumber: Yup.string()
    .matches(/^[0-9]*$/, "Número de celular no válido")
    .min(9, "Número de celular no válido")
    .max(9, "Número de celular no válido"),
  password: Yup.string()
    .trim()
    .min(8, "Contraseña muy corta")
    .required("Este campo es obligatorio"),
  confirmPassword: Yup.string().equals(
    [Yup.ref("password"), null],
    "La contraseña no coincide"
  ),
});

export default function RegisterScreen({ navigation }) {
  const mutation = useMutation((values) => signUp(values));

  const { height } = useWindowDimensions();

  const heightInput = 45;
  const [ShowPassword, setShowPassword] = useState(true);
  const [ShowConfirmPassword, setShowConfirmPassword] = useState(true);
  const userInfo = {
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };

  const onLoginPressed = () => {
    navigation.navigate("Login");
  };

  const handleSubmit = async (values) => {
    try {
      // Send form values to the backend server
      const response = await mutation.mutateAsync(values);
      // Handle the response from the server
      if (response.status == 200) {
        navigation.navigate("ConfirmRegister");
      } else {
        Alert.alert("Error", response.message);
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
    >
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/negativo.png")}
          style={[styles.logo, { height: height * 0.15 }]}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          paddingVertical: 20,
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
          ¡Hola! Bienvenido(a)
        </Text>
        <Text style={{ textAlign: "center" }}>Vamos a crear una cuenta</Text>
      </View>
      <Formik
        initialValues={userInfo}
        validationSchema={SignupSchema}
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
          const { fullname, email, phoneNumber, password, confirmPassword } =
            values;
          return (
            <>
              <CustomInput
                placeholder="Nombres y apellidos*"
                value={fullname}
                error={touched.fullname && errors.fullname}
                onchangeText={handleChange("fullname")}
                onBlur={handleBlur("fullname")}
                heightInput={heightInput}
                textInputIcon={
                  <TextInput.Icon icon="face-man" iconColor="#003580" />
                }
                widthInput={"90%"}
                shouldTrimText={false}
              />
              <CustomInput
                placeholder="Correo electrónico*"
                value={email}
                error={touched.email && errors.email}
                onchangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                heightInput={heightInput}
                textInputIcon={
                  <TextInput.Icon icon="email" iconColor="#003580" />
                }
                widthInput={"90%"}
              />
              <CustomInput
                placeholder="Celular"
                value={phoneNumber}
                error={touched.phoneNumber && errors.phoneNumber}
                onchangeText={handleChange("phoneNumber")}
                onBlur={handleBlur("phoneNumber")}
                heightInput={heightInput}
                textInputIcon={
                  <TextInput.Icon icon="cellphone" iconColor="#003580" />
                }
                widthInput={"90%"}
              />
              <CustomInput
                placeholder="Contraseña*"
                value={password}
                error={touched.password && errors.password}
                onchangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry={ShowPassword}
                heightInput={heightInput}
                iconEye={
                  <TextInput.Icon
                    onPress={() => {
                      setShowPassword((item) => !item);
                    }}
                    icon="eye"
                  />
                }
                textInputIcon={
                  <TextInput.Icon icon="lock" iconColor="#003580" />
                }
                widthInput={"90%"}
              />
              <CustomInput
                placeholder="Repetir contraseña*"
                value={confirmPassword}
                error={touched.confirmPassword && errors.confirmPassword}
                onchangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry={ShowConfirmPassword}
                heightInput={heightInput}
                iconEye={
                  <TextInput.Icon
                    onPress={() => {
                      setShowConfirmPassword((item) => !item);
                    }}
                    icon="eye"
                  />
                }
                textInputIcon={
                  <TextInput.Icon icon="lock-check" iconColor="#003580" />
                }
                widthInput={"90%"}
              />
              <View style={styles.obligatoryMessagge}>
                <Text style={{ color: "red" }}>* </Text>
                <Text>Campos obligatorios</Text>
              </View>
              <CustomButton
                buttonText={"REGISTRAR"}
                submitting={isSubmitting}
                onPress={handleSubmit}
                buttonTextColor={"white"}
                heightButton={60}
                widthButton={"80%"}
                borderColorButton={"white"}
                backgroundColorButton={"#1B3F89"}
              />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginVertical: 5,
                }}
              >
                <View
                  style={{
                    flex: 1,
                    height: 3,
                    backgroundColor: "#336297",
                    marginLeft: 80,
                  }}
                />
                <Text
                  style={{
                    width: 20,
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 20,
                    color: "#336297",
                  }}
                >
                  o
                </Text>

                <View
                  style={{
                    flex: 1,
                    height: 3,
                    backgroundColor: "#336297",
                    marginRight: 80,
                  }}
                />
              </View>
              <CustomButton
                buttonText={"Iniciar sesión"}
                buttonTextColor={"#1B3F89"}
                widthButton={"70%"}
                heightButton={50}
                borderColorButton={"#1B3F89"}
                backgroundColorButton={"white"}
                onPress={onLoginPressed}
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
    flex: 1,
    backgroundColor: "white",
  },
  headerContainer: {
    backgroundColor: "#003580",
    width: "100%",
    height: "18%",
    alignItems: "center",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
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
  obligatoryMessagge: {
    flexDirection: "row",
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
  },
});
