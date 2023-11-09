import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";

const ServiceButton = ({
  serviceID,
  title,
  navigation,
}) => {
  const onPressed = () => {
    navigation.navigate("Details", {
      serviceID: serviceID,
    });
  };
  return (
    <TouchableOpacity onPress={onPressed} style={styles.button}>
      {/* <Image source={{ uri: imgURL }} style={styles.Image}/> */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(26, 63, 134, 1)",
          width: "100%",
          height: "100%",
        }}
      >
        <Text style={styles.title}>{title}</Text>
        <Image
          source={{
            uri: "https://img.icons8.com/ios/32/FFFFFF/nui2.png",
          }}
          style={{ width: 32, height: 32 }}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 25,
    overflow: "hidden",
    width: "93%",
    height: 90,
    borderRadius: 10,
    alignSelf: "center",
  },
  Image: {
    position: "absolute",
    resizeMode: "contain",
    width: "100%",
    height: "100%",
  },
  title: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 20,
    width: "80%",
    marginRight: 5,
  },
});

export default ServiceButton;
