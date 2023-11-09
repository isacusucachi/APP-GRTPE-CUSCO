import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  Alert,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useFormik } from "formik";
import * as Yup from "yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "react-query";
import { Wave } from "react-native-animated-spinkit";
import Checkbox from "expo-checkbox";

import ContactSection from "../components/ContactSection";
import CustomInput from "../components/CustomInput";
import CustomButton from "../components/CustomButton";
import { signIn } from "../api/api";

const SigninSchema = Yup.object().shape({
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("Este campo es obligatorio"),
  password: Yup.string()
    .trim()
    .min(8, "Contraseña muy corta")
    .required("Este campo es obligatorio"),
});

const saveData = async (token, userId) => {
  try {
    await AsyncStorage.setItem("LoggedIn", "true");
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("userId", userId);
  } catch (error) {
    Alert.alert("Error:", error.message);
  }
};

export default function LoginScreen({ navigation }) {
  const mutation = useMutation((values) => signIn(values));

  const { height } = useWindowDimensions();

  const heightInput = 45;

  const [ShowPassword, setShowPassword] = useState(true);
  false;

  const onForgetPasswordPressed = () => {
    navigation.navigate("ForgetPassword");
  };

  const onRegisterPressed = () => {
    navigation.navigate("Register");
  };

  const handleSubmit = async (values) => {
    const { email, password } = values;
    try {
      // Send form values to the backend server
      const response = await mutation.mutateAsync({ email, password });
      // Handle the response from the server
      if (response.status == 200) {
        saveData(response.data.token, response.data._id);
        navigation.navigate("Main");
      } else {
        Alert.alert("Error", response.data.message);
      }
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: SigninSchema,
    onSubmit: handleSubmit,
  });

  if (mutation.isLoading) {
    return (
      <View style={styles.indicatorWrapper}>
        <Wave size={64} color="#003580" />
        <Text style={styles.indicatorText}>Iniciando sesión...</Text>
      </View>
    );
  }
  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: "center",
        paddingBottom: 25,
      }}
      style={styles.root}
      persistentScrollbar={true}
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
        <Text style={{ textAlign: "center" }}>Vamos a iniciar sesión</Text>
      </View>
      <View style={styles.containerBox}>
        <View
          style={{
            width: "100%",
            height: 15,
            backgroundColor: "#003580",
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            marginBottom: 8,
          }}
        ></View>
        <>
          <CustomInput
            placeholder="Correo electrónico"
            value={formik.values.email}
            error={formik.touched.email && formik.errors.email}
            onchangeText={formik.handleChange("email")}
            onBlur={formik.handleBlur("email")}
            heightInput={heightInput}
            textInputIcon={<TextInput.Icon icon="email" iconColor="#003580" />}
            widthInput={"90%"}
          />
          <CustomInput
            placeholder="Contraseña"
            value={formik.values.password}
            error={formik.touched.password && formik.errors.password}
            onchangeText={formik.handleChange("password")}
            onBlur={formik.handleBlur("password")}
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
            textInputIcon={<TextInput.Icon icon="lock" iconColor="#003580" />}
            widthInput={"90%"}
          />
          <TouchableOpacity
            style={{ alignItems: "center", marginVertical: 10 }}
            onPress={onForgetPasswordPressed}
          >
            <Text style={styles.forgetpassword}>
              ¿Ha olvidado su contraseña?
            </Text>
          </TouchableOpacity>

          <CustomButton
            submitting={formik.isSubmitting}
            onPress={formik.handleSubmit}
            buttonText={"INGRESAR"}
            buttonTextColor={"white"}
            heightButton={60}
            widthButton={"80%"}
            borderColorButton={"white"}
            backgroundColorButton={"#1B3F89"}
          />
        </>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginVertical: 10,
        }}
      >
        <View
          style={{
            flex: 1,
            height: 3,
            backgroundColor: "#336297",
            marginLeft: 40,
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
            marginRight: 40,
          }}
        />
      </View>
      <CustomButton
        buttonText={"REGISTRARSE"}
        buttonTextColor={"#1B3F89"}
        widthButton={"60%"}
        heightButton={50}
        borderColorButton={"#1B3F89"}
        backgroundColorButton={"white"}
        onPress={onRegisterPressed}
      />
      <ContactSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#E9E9E9",
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
  textO: {
    fontWeight: "bold",
  },
  headerContainer: {
    backgroundColor: "#1A3F86",
    width: "100%",
    height: "20%",
    alignItems: "center",
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 40,
  },
  containerBox: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    width: "90%",
    borderRadius: 20,
    paddingBottom: 10,
  },
  forgetpassword: {
    fontSize: 14,
    fontWeight: "bold",
  },
  paragraph: {
    fontSize: 15,
  },
  checkbox: {
    marginRight: 8,
  },
  logo: {
    width: 300,
    height: 100,
    alignSelf: "center",
    marginBottom: 20,
    marginTop: 10,
  },
});
