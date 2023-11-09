import React, { useState } from "react";
import {
  Dimensions,
  StyleSheet,
  ActivityIndicator,
  View,
  Text,
  TouchableOpacity,
  Alert,
  Linking,
} from "react-native";
import { Image } from "react-native-elements";
import Carousel, { Pagination } from "react-native-snap-carousel";

const width = Dimensions.get("window").width;
const height = width;

export default function ImageCarousel({ isLoading, error, data }) {
  const [activeSlide, setActiveSlide] = useState(0);

  const handlePress = async (URL) => {
    try {
      await Linking.openURL(URL);
    } catch (error) {
      Alert.alert("Error:", error.message);
    }
  };

  if (isLoading) return <ActivityIndicator color="red" size="large" />;

  if (error) return Alert.alert("Error:", error.message);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.slide}>
        <Image
          style={styles.image}
          PlaceholderContent={<ActivityIndicator color="blue" />}
          source={{ uri: item.imageUrl }}
        />
        <TouchableOpacity
          style={{
            width: width * 0.85,
            height: 40,
            backgroundColor: "#1A3F86",
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
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
              fontWeight: "bold",
              fontSize: 20,
              textAlign: "center",
            }}
          >
            Ir a publicación
          </Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        layout={"default"}
        data={data}
        sliderWidth={width}
        itemWidth={width}
        itemHeight={height}
        renderItem={renderItem}
        onSnapToItem={(index) => setActiveSlide(index)}
        autoplay={true}
        loop={true}
      />
      <Pagination
        dotsLength={data != undefined ? data.length : 0}
        activeDotIndex={activeSlide}
        containerStyle={styles.containerPagination}
        dotStyle={styles.dotActive}
        inactiveDotStyle={styles.dotInactive}
        inactiveDotOpacity={1}
        inactiveDotScale={0.8}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  slide: {
    width: width,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: width * 0.85,
    height: width * 0.85,
    resizeMode: "cover",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  carouselContainer: {
    width: width,
    height: width * 1.1,
  },
  message: {
    fontWeight: "bold",
    fontSize: 18,
    color: "grey",
  },
  containerPagination: {
    backgroundColor: "transparent",
    zIndex: 1,
    position: "absolute",
    bottom: 0,
    alignSelf: "center",
  },
  dotActive: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginHorizontal: 2,
    backgroundColor: "#1B3F85",
  },
  dotInactive: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginHorizontal: 2,
    backgroundColor: "#FFD700",
  },
});
