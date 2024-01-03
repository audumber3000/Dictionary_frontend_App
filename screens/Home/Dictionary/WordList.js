import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import Feed from "../../../LakshitModule/Feed";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu } from "native-base";
import LottieView from "lottie-react-native";
import Loading from "./Loading";
import { AuthContext } from "../../../store/auth-context";
import { swipeListAPI } from "../../../api/LearnScreenAPI";

export default function WordList() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // const token = await AsyncStorage.getItem("token");

        if (!token) {
          console.error("Token not found in AsyncStorage");
          return;
        }
        const response = await swipeListAPI(token);
        const newData = response.data.data;
        setData(newData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  const navigation = useNavigation();

  const renderWordItem = ({ item }) => (
    <View key={item.id} style={styles.listcard}>
      <Image style={styles.cardimage} source={{ uri: item.Image }} />
      <Text style={styles.cardtext}>{item.word}</Text>
      <Text style={styles.cardtext2}>{item.meaning}</Text>
      <Text style={styles.cardtext2}>{item.use_case}</Text>
      <FontAwesome5
        style={{ bottom: 110, textAlign: "right", right: 20 }}
        // onPress={() => navigation.navigate("Instructions")}
        name="arrow-circle-right"
        size={22}
        color={"#8F6ACD"}
      />
    </View>
  );
  if (!loading) {
    return (
      <View style={styles.container}>
        <View style={{ flex: 1, flexDirection: "row", top: 85 }}>
          <Menu
            style={{ bottom: 150, left: 130 }}
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
          <Text style={styles.headertext}>Word list</Text>
        </View>
        <View style={{ flex: 4, bottom: 40 }}>
          {loading && <Text>Loading</Text>}
          <FlatList
            showsVerticalScrollIndicator={false}
            data={data.flatMap((category) => category.wordsList)}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={renderWordItem}
          />
        </View>
      </View>
    );
  } else {
    return <Loading />;
  }
}

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
