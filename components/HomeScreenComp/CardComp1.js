import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  ImageBackground,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import { TouchableOpacity } from "react-native";

const baseFontSize = 20; // You can adjust this value as needed

export default function CardComp1() {
  const navigation = useNavigation();
  const showToast = () => {
    console.log("Toast Message");
    Toast.show({
      type: "success",
      text1: "Word added to Favorites!",
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
      //source={require('../../assets/word_of_the_day.png')} // Replace with the path to your background image
      // style={styles.backgroundImage}
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
          <Text style={styles.cardText1}>Serendipity</Text>
          <Text style={styles.cardText2}>
            A fortunate and unexpected discovery
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
    borderRadius: 10,
    flex: 1,
    resizeMode: "cover", // or 'stretch'
    justifyContent: "center",
  },
  card: {
    backgroundColor: "rgba(125, 81, 198, 0.7)", // Use rgba to set background color with opacity
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
