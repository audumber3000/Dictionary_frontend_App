import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";

const baseFontSize = 20; // You can adjust this value as needed

export default function CardComp1(props) {
  const navigation = useNavigation();
  const showToast = () => {
    console.log("Toast Message");
    Toast.show({
      type: "success",
      text1: "Word added to Favorites!",
    });
  };

  const { apiData } = props;
  // Use apiData in your component as needed

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/word_of_the_day2.png')} // Replace with the path to your background image
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle} // Apply border radius to image
      >
        <View style={styles.card}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              showToast();
            }}
            style={styles.cardIcon}
          >
            <FontAwesome
              name="heart-o"
              size={0.9375 * baseFontSize}
              color={"white"}
            />
          </TouchableOpacity>
          <Text style={styles.cardHeader}>Word Of The Day!</Text>
          <Text style={styles.cardText1}>
            {apiData && apiData.wordOfTheDay && apiData.wordOfTheDay.word
              ? apiData.wordOfTheDay.word
              : "N/A"}
          </Text>
          <Text style={styles.cardText2}>
            {apiData && apiData.wordOfTheDay && apiData.wordOfTheDay.meaning
              ? apiData.wordOfTheDay.meaning
              : "N/A"}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    marginTop: 20,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  backgroundImageStyle: {
    borderRadius: 10, // Apply border radius to image
  },
  card: {
    backgroundColor: "rgba(125, 81, 198, 0.7)",
    width: Dimensions.get("window").width * 0.9,
    height: 160,
    borderRadius: 10,
    padding: 10,
    position: "relative",
  },
  cardIcon: {
    position: "absolute",
    top: 10,
    right: 15,
  },
  cardHeader: {
    fontSize: 0.9375 * baseFontSize,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    top: 10,
    left: 20,
  },
  cardText1: {
    fontSize: 1.75 * baseFontSize,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    bottom: 40,
    left: 20,
  },
  cardText2: {
    fontSize: 0.875 * baseFontSize,
    fontWeight: "bold",
    color: "white",
    position: "absolute",
    bottom: 15,
    left: 20,
  },
});
