import React, { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  TextInput,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Pressable,
  ActivityIndicator,
} from "react-native";
import axios from "axios";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import { useNavigation } from "@react-navigation/native";
import Feed from "../../../LakshitModule/Feed";
import { SafeAreaView } from "react-native-safe-area-context";
import MaterialTabs from "react-native-material-tabs";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export default function SearchSection() {
  const navigation = useNavigation();

  const [searchTerm, setSearchTerm] = useState("");
  const [refresh, setRefresh] = useState(false); // Purposely refresh page when we search a word so that the word will be added in recent searches as soon as we search for it .
  const [recentSearches, setRecentSearches] = useState([]);
  // const [sampleSearches, setSampleSearches] = useState([
  //   "Persuade",
  //   "Skew",
  //   "Marsh",
  //   "Zebra",
  // ]);
  const [loading, setLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState(0);

  const getSearches = async () => {
    let data = JSON.parse(await AsyncStorage.getItem("recentSearch"));
    setRecentSearches(data);
  };

  useEffect(() => {
    getSearches();
  }, [refresh]);
  // const [wordResult, setWordResult] = useState([]);

  const handleSearch = () => {
    if (!recentSearches.includes(searchTerm)) {
      // Update recent searches with the new search term
      setRecentSearches([searchTerm, ...recentSearches.slice(0, 4)]);
      console.log("Searching for:", searchTerm);
    }
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  // Store searched word in async storage

  const storeWord = async (word) => {
    let prevData = JSON.parse(await AsyncStorage.getItem("recentSearch"));
    if (!prevData) {
      prevData = await AsyncStorage.setItem(
        "recentSearch",
        JSON.stringify("[]")
      );
    }
    await AsyncStorage.setItem(
      "recentSearch",
      prevData ? JSON.stringify([word, ...prevData]) : JSON.stringify([word])
    );
    setRefresh(!refresh);
  };

  // Get word meaning function

  const searchWord = async (word) => {
    setLoading(true);
    try {
      console.log(word);
      let data = await axios.get(
        `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      );

      console.log(data.data[0].meanings);

      navigation.navigate("Substantiate", {
        word: data.data[0].word,
        meaning: data.data[0].meanings,
        origin: data.data[0].origin,
        sound: data.data[0].phonetics.find((e) => {
          if (e.audio != "") {
            return e.audio;
          }
        }),
      });
    } catch (e) {
      console.log(e);
      console.log("No such word found");
    }
    setLoading(false);
  };

  const baseFontSize = 16;

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={{ alignItems: "center", position: "relative" }}>
          {/* Back Icon */}
          <Ionicons
            onPress={() => navigation.navigate("HomeScreen")}
            style={styles.icon}
            name="chevron-back"
            size={28}
          />
          {/* Search Icon */}
          {!loading && (
            <Ionicons
              onPress={() => {
                // navigation.navigate("Substantiate", { word: searchTerm });
                storeWord(searchTerm);
                searchWord(searchTerm);
              }}
              style={{
                position: "absolute",
                top: 8,
                right: 35,
                color: "#8E5BE4",
                zIndex: 1,
              }}
              name="search"
              size={25}
            />
          )}
          {loading && (
            <ActivityIndicator // Loader indicator
              style={{
                position: "absolute",
                top: 8,
                right: 35,
                zIndex: 1,
              }}
              size={25}
              color={"#8E5BE4"}
            />
          )}
          <TextInput
            placeholder="Search for Words"
            placeholderTextColor={"#CCCCCC"}
            onChangeText={(e) => {
              setSearchTerm(e);
            }}
            value={searchTerm}
            style={{
              width: "90%",
              borderWidth: 1,
              borderColor: "#f1f1f1",
              paddingLeft: 50,
              paddingRight: 50,
              paddingTop: 7,
              paddingBottom: 7,
              fontSize: baseFontSize * 1.2,
              borderRadius: 10,
            }}
          />
        </View>

        <View style={{ marginTop: 10 }}>
          {/* Tabs */}
          <View
            style={{
              paddingLeft: 20,
              paddingRight: 20,
              position: "relative",
            }}
          >
            <View
              style={{
                height: 2,
                width: "150%",
                backgroundColor: "#DBDBDB",
                position: "absolute",
                bottom: 0,
                // left: 0,
                // right: 0,
              }}
            ></View>
            <MaterialTabs
              items={["Recent Search", "Favourites"]}
              selectedIndex={selectedTab}
              onChange={(e) => {
                setSelectedTab(e);
              }}
              barColor="transparent"
              indicatorColor="#7352AC"
              activeTextColor="#7352AC"
              inactiveTextColor="#A678F2"
            />
          </View>
          {/* Search Items List */}
          <View
            style={{
              paddingTop: 20,
              paddingLeft: 15,
              paddingRight: 15,
              backgroundColor: "#f3f3f3",
              minHeight: 1000,
            }}
          >
            {selectedTab == 0 && (
              <FlatList
                data={recentSearches}
                renderItem={({ item }) => (
                  <Pressable
                    onPress={() => {
                      searchWord(item);
                    }}
                  >
                    <View>
                      <Text
                        style={{
                          fontSize: baseFontSize * 1.3,
                          fontWeight: 600,
                        }}
                      >
                        {item}
                      </Text>

                      <View
                        style={{
                          width: "100%",
                          height: 2,
                          backgroundColor: "#DEDEDE",
                          marginTop: 7,
                          marginBottom: 7,
                        }}
                      ></View>
                    </View>
                  </Pressable>
                )}
              />
            )}
          </View>
        </View>

        {/* <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search for Words..."
          style={styles.searchInput}
          onChangeText={(text) => setSearchTerm(text)}
          value={searchTerm}
        />
        <FontAwesome
          style={styles.searchIcon}
          name="search"
          size={22}
          color={"#8E5BE4"}
          onPress={handleSearch}
        />
      </View> */}

        {/* <View style={styles.recentSearchContainer}>
        <Text style={styles.recentText}>Recent Searches</Text>
        <Entypo
          style={styles.backIcon}
          name="back-in-time"
          size={20}
          color={"#49454F"}
          onPress={clearSearch}
        />
      </View> */}

        {/* <FlatList
        contentContainerStyle={styles.flatListContainer}
        data={recentSearches}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.textPill}
            onPress={() => console.log(item)} // Add action on press
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        )}
      /> */}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingTop: 20,
    // paddingTop: 100,
  },
  icon: {
    position: "absolute",
    top: 8,
    left: 25,
    color: "#8E5BE4",
    zIndex: 1,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    backgroundColor: "#F0F0F0",
    height: 40,
    borderRadius: 10,
    paddingLeft: 15,
    marginRight: 10,
  },
  searchIcon: {
    color: "#8E5BE4",
  },
  recentSearchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 20,
    marginBottom: 10,
  },
  backIcon: {
    marginRight: 5,
    color: "#49454F",
  },
  recentText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#49454F",
  },
  flatListContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
  textPill: {
    padding: 10,
    borderWidth: 0.5,
    margin: 10,
    borderColor: "#ABABAB",
    borderRadius: 20,
    backgroundColor: "white",
    elevation: 3,
    shadowColor: "black",
    shadowOpacity: 0.8,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
});
