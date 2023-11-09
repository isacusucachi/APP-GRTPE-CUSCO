import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import MainScreen from "../screens/MainScreen";
import ForgetPasswordScreen from "../screens/ForgetPasswordScreen";
import VerifyTokenScreen from "../screens/VerifyTokenScreen";
import ConfirmRegisterScreen from "../screens/ConfirmRegisterScreen";
import { verifyLogin } from "../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Wave } from "react-native-animated-spinkit";
import NewPasswordScreen from "../screens/NewPasswordScreen";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const fetchLoginStatus = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await verifyLogin(token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const checkLoginStatus = async () => {
    const storedLoginStatus = await AsyncStorage.getItem("LoggedIn");
    if (storedLoginStatus == "true") {
      setIsLoggedIn(true);
    } else {
      const loggedIn = await fetchLoginStatus();
      if (loggedIn) {
        await AsyncStorage.setItem("LoggedIn", "true");
        setIsLoggedIn(true);
      }
    }
    setIsLoading(false);
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.indicatorWrapper}>
        <Wave size={64} color="#003580" />
        <Text style={styles.indicatorText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="ConfirmRegister"
            component={ConfirmRegisterScreen}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
          />
          <Stack.Screen name="VerifyToken" component={VerifyTokenScreen} />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen
            name="ConfirmRegister"
            component={ConfirmRegisterScreen}
          />
          <Stack.Screen
            name="ForgetPassword"
            component={ForgetPasswordScreen}
          />
          <Stack.Screen name="VerifyToken" component={VerifyTokenScreen} />
          <Stack.Screen name="NewPassword" component={NewPasswordScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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
