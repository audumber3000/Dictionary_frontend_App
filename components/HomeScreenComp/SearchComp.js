import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

export default function SearchComp() {
  const words = ["Word", "Vocabulary", "Language"]; // Replace with your desired words
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("Search for Words");

  const navigation = useNavigation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWordIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change the word every second

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setDisplayedText(`Search for ${words[currentWordIndex]}`);
  }, [currentWordIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text style={styles.helloText}>Hello,</Text>
        <Text style={styles.saranshText}>Saransh!</Text>
      </View>
      <Text style={styles.text}>
        Let's begin your journey to amplify English.
      </Text>
      <Pressable
        onPress={() => navigation.navigate("Search")}
        style={styles.searchIcon}
      >
        <View style={styles.searchContainer}>
          <FontAwesome name="search" size={22} color={"#8E5BE4"} />
          <Text style={styles.searchBar}>{displayedText}</Text>
        </View>
      </Pressable>
    </View>
  );
}

const baseFontSize = 20; // Define a base font size (adjust as needed)
const styles = StyleSheet.create({
  container: {
    position: "relative",
    paddingTop: 200,
    padding: 20,
  },

  headerTextContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  helloText: {
    fontSize: 1.5 * baseFontSize,
    fontWeight: "300",
    color: "white",
  },
  saranshText: {
    fontSize: 1.5 * baseFontSize,
    fontWeight: "600",
    color: "white",
    marginLeft: 5,
  },
  text: {
    fontSize: 0.9375 * baseFontSize,
    fontWeight: "500",
    color: "white",
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginTop: 10,
    gap: 12
  },
  searchIcon: {
    padding: 10,
  },
  searchBar: {
    flex: 1,
    height: 50,
    color: "#CCCCCC",
    textAlignVertical: "center",
    fontSize: 0.9375 * baseFontSize,
  },
});
