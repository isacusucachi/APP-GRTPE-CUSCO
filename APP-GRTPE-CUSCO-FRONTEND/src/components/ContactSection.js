import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  Alert,
} from "react-native";

export default function ContactSection() {
  const hadleCallPress = async () => {
    try {
      await Linking.openURL("tel:084-240744");
    } catch (error) {
      console.log(error);
    }
  };

  const hadleLocationPress = async () => {
    try {
      await Linking.openURL(
        "geo:-13.523335,-71.963381?q=Miniterio de Trabajo, Cusco, Peru"
      );
    } catch (error) {
      Alert.alert("Error:", error);
    }
  };

  const hadleWebsitePress = async () => {
    try {
      await Linking.openURL("https://www.gob.pe/regioncusco-grtpe");
    } catch (error) {
      Alert.alert("Error:", error);
    }
  };

  const hadleEmailPress = async () => {
    try {
      await Linking.openURL("mailto:informes_grtpe@regioncusco.gob.pe");
    } catch (error) {
      Alert.alert("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <TouchableOpacity onPress={hadleCallPress} style={styles.button}>
          <Image
            source={{
              uri: "https://img.icons8.com/windows/32/FFFFFF/phone.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.subContainer}>
        <TouchableOpacity onPress={hadleLocationPress} style={styles.button}>
          <Image
            source={{
              uri: "https://img.icons8.com/windows/32/FFFFFF/marker.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.subContainer}>
        <TouchableOpacity onPress={hadleWebsitePress} style={styles.button}>
          <Image
            source={{
              uri: "https://img.icons8.com/windows/32/FFFFFF/domain.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.subContainer}>
        <TouchableOpacity onPress={hadleEmailPress} style={styles.button}>
          <Image
            source={{
              uri: "https://img.icons8.com/metro/32/FFFFFF/secured-letter.png",
            }}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  subContainer: {
    alignItems: "center",
    width: "25%",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#1A3F86",
  },
  icon: {
    width: 32,
    height: 32,
  },
  text: {
    textAlign: "center",
    fontSize: 10,
  },
});
