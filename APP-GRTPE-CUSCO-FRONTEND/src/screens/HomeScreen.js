import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  RefreshControl,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getCarruselImages, getInstitutionalInformation } from "../api/api";
import ImageCarousel from "../components/ImageCarousel";
import Logo from "../components/Logo";
import InformationSection from "../components/InformationSection";
import SocialNetworksSection from "../components/SocialNetworksSection";

export default function HomeScreen({ navigation }) {
  const [refreshingCI, setRefreshingCI] = useState(false);
  const [refreshingII, setRefreshingII] = useState(false);
  const [carouselData, setCarouselData] = useState([]);
  const [institutionalInformationData, setInstitutionalInformationData] =
    useState([]);

  const fetchCarruselImagesData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await getCarruselImages(token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  const fetchInstitutionalInformationData = async () => {
    try {
      const token = await AsyncStorage.getItem("token");
      const response = await getInstitutionalInformation(token);
      return response;
    } catch (error) {
      throw error;
    }
  };

  // Función auxiliar para verificar si los datos están en AsyncStorage
  const checkAndLoadDataFromStorage = async () => {
    try {
      const storedData = await AsyncStorage.getItem("carouselData");
      const storedInstitutionalInformationData = await AsyncStorage.getItem(
        "InstitutionalInformation"
      );
      if (storedData && storedInstitutionalInformationData) {
        // Si hay datos almacenados, úsalos
        setCarouselData(JSON.parse(storedData));
        setInstitutionalInformationData(
          JSON.parse(storedInstitutionalInformationData)
        );
      } else {
        // Si no hay datos almacenados, realiza la consulta al backend
        const newDataCI = await fetchCarruselImagesData();
        const newDataII = await fetchInstitutionalInformationData();
        // Guarda los nuevos datos en AsyncStorage
        await AsyncStorage.setItem("carouselData", JSON.stringify(newDataCI));
        setCarouselData(newDataCI);
        await AsyncStorage.setItem(
          "InstitutionalInformation",
          JSON.stringify(newDataII)
        );
        setInstitutionalInformationData(newDataII);
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
    setRefreshingCI(true);
    setRefreshingII(true);
    try {
      // Realiza una nueva consulta al backend
      const newDataCI = await fetchCarruselImagesData();
      const newDataII = await fetchInstitutionalInformationData();
      // Actualiza los datos en AsyncStorage
      await AsyncStorage.setItem("carouselData", JSON.stringify(newDataCI));
      setCarouselData(newDataCI);
      await AsyncStorage.setItem(
        "InstitutionalInformation",
        JSON.stringify(newDataII)
      );
      setInstitutionalInformationData(newDataII);
    } catch (error) {
      console.error("Error al refrescar datos: ", error);
    } finally {
      setRefreshingCI(false);
      setRefreshingII(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 60,
        backgroundColor: "#F5F5F5",
        alignItems: "center",
      }}
      refreshControl={
        <RefreshControl
          refreshing={refreshingCI && refreshingCI}
          onRefresh={onRefresh}
        />
      }
    >
      <Logo />
      <ImageCarousel data={carouselData} />
      <InformationSection institutionalInformationData={institutionalInformationData}/>
      <View
        style={{
          width: "100%",
          height: 5,
          backgroundColor: "#515151",
          marginTop: 20,
        }}
      ></View>
      <Text style={styles.titles}>Síguenos</Text>
      <SocialNetworksSection />
      <Text style={{ color: "#515151" }}>Copyright © 2023 GRTPECUSCO</Text>
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
  titles: {
    color: "#515151",
    fontSize: 22,
    fontFamily: "serif",
    alignSelf: "flex-start",
    fontWeight: "bold",
    paddingLeft: 20,
    paddingTop: 10,
  },
});
