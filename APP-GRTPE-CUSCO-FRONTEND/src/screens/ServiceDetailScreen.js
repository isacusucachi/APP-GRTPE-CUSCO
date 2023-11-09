import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  RefreshControl,
  View,
  Text,
  Image,
  Alert,
  Linking,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { useQuery } from "react-query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Wave } from "react-native-animated-spinkit";

import Logo from "../components/Logo";
import { getServiceDetails } from "../api/api";

const width = Dimensions.get("window").width;

export default function ServicesScreen({ route }) {
  const { serviceID } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [serviceData, setServiceData] = useState([]); // State to store service data

  const handlePress = async (URL) => {
    try {
      await Linking.openURL(URL);
    } catch (error) {
      Alert.alert("Error:", error.message);
    }
  };

  const fetchServiceDetailsData = async () => {
    const token = await AsyncStorage.getItem("token");
    const response = await getServiceDetails(token, serviceID);
    return response;
  };

  useEffect(() => {
    const loadServiceData = async () => {
      try {
        const storedServiceData = await AsyncStorage.getItem(
          `serviceData${serviceID}`
        );
        if (storedServiceData) {
          // If data exists in AsyncStorage, use it
          setServiceData(JSON.parse(storedServiceData));
        } else {
          // If data doesn't exist, fetch it from the backend
          const newData = await fetchServiceDetailsData();
          // Store the new data in AsyncStorage
          await AsyncStorage.setItem(
            `serviceData${serviceID}`,
            JSON.stringify(newData)
          );
          setServiceData(newData);
        }
      } catch (error) {
        console.error("Error loading service data: ", error);
      }
    };

    loadServiceData();
  }, [serviceID]);

  const renderCard = (item) => (
    <View style={{ marginBottom: 30, alignItems: "center" }}>
      <Image
        source={{ uri: item.URLDetail }}
        style={{
          width: width * 0.9,
          height: width * 0.9,
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      />
      <TouchableOpacity
        style={{
          width: width * 0.9,
          height: 40,
          backgroundColor: "#1A3F86",
          borderBottomRightRadius: 15,
          borderBottomLeftRadius: 15,
          justifyContent: "center",
          flexDirection: "row",
          alignItems: "center",
        }}
        onPress={() => handlePress(item.URLLink)}
      >
        <Image
          source={{
            uri: "https://img.icons8.com/ios-filled/50/FFFFFF/nui2.png",
          }}
          style={{ width: 32, height: 32, marginRight: 10 }}
        />
        <Text
          style={{
            color: "#FFFFFF",
            textAlign: "center",
            fontWeight: "bold",
            fontSize: 20,
          }}
        >
          Ir
        </Text>
      </TouchableOpacity>
    </View>
  );

  const onRefresh = async () => {
    setRefreshing(true);
    try {
      // Fetch new service data
      const newData = await fetchServiceDetailsData();
      // Update the state and AsyncStorage with the new data
      setServiceData(newData);
      await AsyncStorage.setItem(
        `serviceData${serviceID}`,
        JSON.stringify(newData)
      );
    } catch (error) {
      console.error("Error refreshing data: ", error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{
        paddingBottom: 60,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
      }}
      style={styles.root}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Logo />
      {serviceData.map((item) => (
        <View key={item._id}>{renderCard(item)}</View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#FFFFFF",
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
