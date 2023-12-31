import { View, Text, Pressable, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import { Menu } from "native-base";
import AntDesign from "react-native-vector-icons/AntDesign";
import axios from "axios";

import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";

const TagScreen = () => {
  const [data, setData] = useState([]);
  const navigation = useNavigation();
  const [wordArr, setWordArr] = useState([]);
  const [loading, setLoading] = useState(false);

  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2NThmZDMzMWFhYzNjMjAwMmExZTc2YzkiLCJpYXQiOjE3MDM5MjQ1MjksImV4cCI6MTcwMzkzODkyOSwidHlwZSI6ImFjY2VzcyJ9.h0IACsPJbUbgWmePk7BrYAPfRDuAef0LwRKx8ukA4jI";

  const formWordArray = (data) => {
    const tempArr = [];
    data.map((e) => {
      e.wordsList.map((word) => {
        tempArr.push(word);
      });
    });
    setWordArr(tempArr);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.error("Token not found in AsyncStorage");
          return;
        }
        const response = await axios.get(
          "https://dictionarybackendapp-production.up.railway.app/v1/wordifyme/user-word-category/65798b945026a7002a24e194",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const newData = response.data.data;
        setWordArr([]);
        formWordArray(newData);
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const renderWordItem = ({ item }) => (
    <View
      style={{
        backgroundColor: "#a678f2",
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        borderRadius: 5,
      }}
    >
      <Text style={{ color: "#f5f5f5", fontWeight: 600, fontSize: 16 }}>
        {item.word}
      </Text>
    </View>
  );

  if (!loading) {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row", top: 85 }}>
          <Menu
            style={{ bottom: -67, left: 135, flex: 1 }}
            trigger={(triggerProps) => {
              return (
                <Pressable
                  accessibilityLabel="More options menu"
                  {...triggerProps}
                >
                  <Ionicons
                    name="menu"
                    size={24}
                    color={"black"}
                    style={{ bottom: 0, left: 230 }}
                  />
                </Pressable>
              );
            }}
          >
            <Menu.Item onPress={() => navigation.navigate("SwipeList")}>
              Card View
            </Menu.Item>
            <Menu.Item onPress={() => navigation.navigate("WordList")}>
              List View
            </Menu.Item>
            <Menu.Item onPress={() => navigation.navigate("TagScreen")}>
              Tag View
            </Menu.Item>
          </Menu>
          <AntDesign
            style={{ right: 150 }}
            onPress={() => navigation.goBack()}
            name="arrowleft"
            size={24}
            color={"black"}
          />
          <Text style={styles.headertext}>Tag List</Text>
        </View>

        <View
          style={{
            position: "absolute",
            top: 150,
            width: "100%",
            paddingLeft: 20,
            paddingRight: 20,
            flexDirection: "row",
            gap: 20,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {/* tags */}
          {wordArr.map((e, index) => {
            return (
              <Pressable key={index}>
                <View
                  style={{
                    backgroundColor: "#A678F2",
                    padding: 5,
                    paddingLeft: 10,
                    paddingRight: 10,
                    fontWeight: 600,
                    borderRadius: 5,
                  }}
                >
                  <Text style={{ fontSize: 16, color: "#f5f5f5" }}>
                    {e.word}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>
    );
  } else {
    return <Loading />;
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  listcard: {
    backgroundColor: "white",
    width: 370,
    height: 110,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.23,
    shadowRadius: 10,
  },
  cardimage: {
    width: 102,
    height: 110,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  cardtext: {
    textAlign: "left",
    bottom: 100,
    fontSize: 15,
    fontWeight: "900",
    left: 115,
  },
  headertext: {
    fontSize: 20,
    fontWeight: "900",
    right: 140,
    bottom: 2,
  },
  cardtext2: {
    textAlign: "left",
    bottom: 100,
    fontSize: 14,
    fontWeight: "400",
    left: 115,
    lineHeight: 25,
    letterSpacing: -0.32,
  },
});

export default TagScreen;
