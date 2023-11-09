import React from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  Image,
  Alert,
  View,
} from "react-native";

export default function InformationButton({ title, iconUrl, urlLink }) {
  const handlePress = async (urlLink) => {
    try {
      await Linking.openURL(urlLink);
    } catch (error) {
      Alert.alert("Error:", error.message);
    }
  };

  return (
    <TouchableOpacity
      onPress={() => handlePress(urlLink)}
      style={styles.button}
    >
      <View style={styles.subContainer}>
        <Text style={styles.text}>{title}</Text>
        <Image
          source={{
            uri: iconUrl,
          }}
          style={styles.icon}
        />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  subContainer: {
    alignItems: "center",
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1A3F86",
    height: 175,
    marginHorizontal: "5%",
    borderRadius: 10,
    marginBottom: 10,
  },
  icon: {
    width: 50,
    height: 50,
  },
  text: {
    textAlign: "center",
    fontSize: 20,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});
