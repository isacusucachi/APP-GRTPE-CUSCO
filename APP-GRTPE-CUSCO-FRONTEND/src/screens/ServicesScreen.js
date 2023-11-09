import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Wave } from "react-native-animated-spinkit";

import { getServices } from "../api/api";
import Logo from "../components/Logo";
import ServiceButtonsComponent from "../components/ServiceButtonsComponent";
import { SearchBar } from "react-native-elements";

export default function ServicesScreen({ navigation }) {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [servicesData, setServicesData] = useState([]); // Estado para almacenar los datos de servicios

  const fetchServicesData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await getServices(token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const handleSearchQuery = (search) => {
    setSearchQuery(search);
  };

  // Función auxiliar para verificar si los datos están en AsyncStorage
  const checkAndLoadDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem("servicesData");
      if (storedData) {
        // Si hay datos almacenados, úsalos
        setServicesData(JSON.parse(storedData));
      } else {
        // Si no hay datos almacenados, realiza la consulta al backend
        const newData = await fetchServicesData();
        // Guarda los nuevos datos en AsyncStorage
        await AsyncStorage.setItem("servicesData", JSON.stringify(newData));
        setServicesData(newData);
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
      const newData = await fetchServicesData();
      // Actualiza los datos en AsyncStorage
      await AsyncStorage.setItem("servicesData", JSON.stringify(newData));
      setServicesData(newData);
    } catch (error) {
      console.error("Error al refrescar datos: ", error);
    } finally {
      setRefreshing(false);
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ paddingBottom: 60, alignItems: "center" }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Logo />
      <SearchBar
        placeholder="Buscar..."
        onChangeText={handleSearchQuery}
        value={searchQuery}
        containerStyle={{
          borderBottomWidth: 0,
          borderTopWidth: 0,
          backgroundColor: "transparent",
          width: "95%",
        }}
        inputContainerStyle={{
          backgroundColor: "transparent",
          borderWidth: 1,
          borderBottomWidth: 5,
          borderRightWidth: 5,
          borderColor: "#003580",
          borderRadius: 20,
        }}
      />
      <ServiceButtonsComponent
        searchQuery={searchQuery}
        data={servicesData}
        navigation={navigation}
        containerStyle={styles.searchBarContainer}
        inputContainerStyle={styles.searchBarInputContainer}
        inputStyle={styles.searchBarInput}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
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
