import React from "react";
import {
  View,
  StyleSheet,
  Image,
  Linking,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";

export default function SocialNetworksSection() {
  const handleFacebookPress = async () => {
    try {
      await Linking.openURL("https://www.facebook.com/trabajocusco");
    } catch (error) {
      Alert.alert("Error:", error);
    }
  };
  const handleInstagramPress = async () => {
    try {
      await Linking.openURL("https://www.instagram.com/grtpecusco");
    } catch (error) {
      Alert.alert("Error:", error);
    }
  };
  const handleTwitterPress = async () => {
    try {
      await Linking.openURL("https://twitter.com/GrtpeCusco");
    } catch (error) {
      Alert.alert("Error:", error);
    }
  };
  const handleTikTokPress = async () => {
    try {
      await Linking.openURL("https://www.tiktok.com/@grtpe_cusco_oficial");
    } catch (error) {
      Alert.alert("Error:", error);
    }
  };
  const handleFlickerPress = async () => {
    try {
      await Linking.openURL("https://www.flickr.com/photos/198636882@N06/");
    } catch (error) {
      Alert.alert("Error:", error);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={handleFacebookPress}>
          <View style={styles.shadowBox}>
            <Image
              source={{
                uri: "https://img.icons8.com/color/48/facebook-new.png",
              }}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleInstagramPress}>
          <View style={styles.shadowBox}>
            <Image
              source={{
                uri: "https://img.icons8.com/fluency/48/instagram-new.png",
              }}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleTwitterPress}>
          <View style={styles.shadowBox}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/50/twitterx.png",
              }}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleTikTokPress}>
          <View style={styles.shadowBox}>
            <Image
              source={{
                uri: "https://img.icons8.com/ios-filled/50/tiktok--v1.png",
              }}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleFlickerPress}>
          <View style={styles.shadowBox}>
            <Image
              source={{
                uri: "https://img.icons8.com/fluency/48/flickr.png",
              }}
              style={styles.icon}
            />
          </View>
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
    width: "100%",
    height: "25%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  shadowBox: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5, // Solo para Android
  },
  button: {
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 5,
  },
  icon: {
    width: 55,
    height: 55,
  },
  text: {
    textAlign: "center",
    fontSize: 10,
  },
});
