import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Image,
  RefreshControl,
  useWindowDimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Avatar } from "react-native-elements";
import { useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Wave } from "react-native-animated-spinkit";

import { getUser } from "../api/api";

export default function ProfileScreen({ navigation }) {
  const { height, width } = useWindowDimensions();

  const clearAsyncStorage = async () => {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleLogoutPress = async () => {
    const confirmed = await showAlert("¿Quiéres cerrar sesión?");
    if (confirmed) {
      const cleared = await clearAsyncStorage();
      if (cleared) {
        // Reinicia la pila de navegación a su estado inicial
        navigation.reset({
          index: 0,
          routes: [{ name: "Login" }], // Aquí especifica la pantalla inicial
        });
      } else {
        showAlert("Error al cerrar sesión");
      }
    }
  };

  const showAlert = async (message) => {
    return new Promise((resolve) => {
      Alert.alert("🚨 Alerta 🚨", message, [
        { text: "No", style: "cancel", onPress: () => resolve(false) },
        { text: "Sí", onPress: () => resolve(true) },
      ]);
    });
  };

  const handleChangePasswordPress = () => {
    // Navigate to the screen where the user can change their password
    navigation.navigate("ChangePassword");
  };

  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState({}); // Estado para almacenar los datos del usuario

  const fetchUserData = async () => {
    const userId = await AsyncStorage.getItem("userId");
    const token = await AsyncStorage.getItem("token");
    const response = await getUser(userId, token);
    return response;
  };

  // Función auxiliar para verificar si los datos están en AsyncStorage
  const checkAndLoadDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem("userData");
      if (storedData) {
        // Si hay datos almacenados, úsalos
        setUserData(JSON.parse(storedData));
      } else {
        // Si no hay datos almacenados, realiza la consulta al backend
        const newData = await fetchUserData();
        // Guarda los nuevos datos en AsyncStorage
        await AsyncStorage.setItem("userData", JSON.stringify(newData));
        setUserData(newData);
      }
    } catch (error) {
      console.error("Error al cargar datos desde AsyncStorage: ", error);
    }
  };

  useEffect(() => {
    // Cargamos los datos al montar el componente
    checkAndLoadDataFromStorage();
  }, []);

  // Resto del código como estaba

  // Cuando se hace pull-to-refresh, refresca los datos
  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Realiza una nueva consulta al backend
      const newData = await fetchUserData();
      // Actualiza los datos en AsyncStorage
      await AsyncStorage.setItem("userData", JSON.stringify(newData));
      setUserData(newData);
    } catch (error) {
      console.error("Error al refrescar datos: ", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 60,
        backgroundColor: "#FFFFFF",
        height: "100%",
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.headerContainer}>
        <Image
          source={require("../../assets/images/positivo.png")}
          style={[styles.logo, { height: height * 0.15 }]}
          resizeMode="contain"
        />
        <Avatar
          size="xlarge"
          rounded
          icon={{ name: "user", type: "font-awesome" }}
          titleStyle={{ color: "white" }}
          containerStyle={{ backgroundColor: "grey" }}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          marginBottom: 50,
        }}
      >
        <Text style={styles.fullnameStyle}>{userData.fullname}</Text>
        <Text style={styles.profileInfo}> {userData.email}</Text>
        <Text style={styles.profileInfo}> {userData.phoneNumber}</Text>
      </View>
      <TouchableOpacity
        style={[styles.buttons, { width: width }]}
        onPress={handleChangePasswordPress}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/sf-black-filled/64/1A3F86/re-enter-pincode.png",
          }}
          style={{ alignSelf: "flex-start", width: 40, height: 40 }}
        />
        <View style={{ alignSelf: "center", alignItems: "center" }}>
          <Text style={styles.textButton1}>Cambiar contraseña</Text>
          <Text style={styles.textButton2}>
            Seleccionar una nueva contraseña
          </Text>
        </View>
        <Image
          source={{
            uri: "https://img.icons8.com/sf-black-filled/64/71bfec/circled-chevron-right.png",
          }}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.buttons, { width: width }]}
        onPress={handleLogoutPress}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/sf-regular-filled/48/1A3F86/exit.png",
          }}
          style={{ width: 40, height: 40 }}
        />
        <Text style={[styles.textButton1]}>Cerrar Sesión</Text>
        <Image
          source={{
            uri: "https://img.icons8.com/sf-black-filled/64/FF0000/circled-chevron-right.png",
          }}
          style={{ width: 40, height: 40 }}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 300,
    height: 100,
    alignSelf: "center",
    marginBottom: 5,
    marginTop: 10,
  },
  headerContainer: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
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
  fullnameStyle: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    color: "#1A3F86",
  },
  profileInfo: {
    fontSize: 20,
    color: "#1A3F86",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  button: {
    alignItems: "center",
  },
  textButton1: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1A3F86",
    textAlign: "center",
  },
  textButton2: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#71bfec",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});
