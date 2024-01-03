import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import Feed from "../../../LakshitModule/Feed";
import Swiper from "react-native-deck-swiper";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/AntDesign";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import * as Speech from "expo-speech";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Menu } from "native-base";
import Loading from "./Loading";
import { AuthContext } from "../../../store/auth-context";
import { swipeListAPI } from "../../../api/LearnScreenAPI";

export default function SwipeList() {
  const [index, setIndex] = useState(0);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [wordArr, setWordArr] = useState([]);
  const [userWords, setUserWords] = useState([]); // It will consist objects of words which user knows and doesn't knows
  const currentCardIndex = useRef(0);

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
        const response = await swipeListAPI(token); // API call
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
  const swiperRef = useRef();

  const navigation = useNavigation();

  const onSwiped = () => {
    setIndex((index + 1) % Feed.length);
  };

  const formWordArray = (data) => {
    const tempArr = [];
    data.map((e) => {
      e.wordsList.map((word) => {
        tempArr.push(word);
      });
    });
    setWordArr(tempArr);
  };

  const knownWord = () => {
    let wordObj = {
      word: wordArr[currentCardIndex.current],
      known: true,
    };
    // console.log(wordObj);
    setUserWords((prevVal) => {
      return [...prevVal, wordObj];
    });
    currentCardIndex.current += 1;
    if (currentCardIndex.current >= 10) {
      console.warn("10 cards reached, send request to backend");
    }
  };

  const unknownWord = () => {
    let wordObj = {
      word: wordArr[currentCardIndex.current],
      known: false,
    };
    // console.log(wordObj);
    setUserWords((prevVal) => {
      return [...prevVal, wordObj];
    });
    currentCardIndex.current += 1;
    if (currentCardIndex.current >= 10) {
      console.warn("10 cards reached, send request to backend");
    }
  };

  const Card = (card) => {
    return (
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQShMOHBfPGb7D50_ZYOhDLdZl0mzLNr5Dayw&usqp=CAU",
          }}
          style={styles.cardImage}
        />
        <View style={styles.textcontainer}>
          <Text style={styles.headtext}>{card?.word}</Text>
          <MaterialCommunityIcons
            name="volume-high"
            size={32}
            style={{ textAlign: "right", right: 20, bottom: 25 }}
            onPress={() => Speech.speak(card?.word)  }
          />
          <Text style={styles.caption}>{card?.use_case}</Text>
          <Text style={{ top: 90, left: 20, position: "absolute" }}>
            {card?.meaning}
          </Text>
        </View>
      </View>
    );
  };

  if (!loading) {
    return (
      <View style={styles.container}>
        <Swiper
          ref={swiperRef}
          backgroundColor="white"
          cards={wordArr}
          cardIndex={index}
          renderCard={(card) => Card(card)}
          onSwiped={onSwiped}
          onSwipedLeft={unknownWord}
          onSwipedRight={knownWord}
          disableBottomSwipe
          disableTopSwipe
          animateCardOpacity
          stackSize={2}
          stackScale={10}
          stackSeparation={1}
          infinite
        />
        <Menu
          style={{ bottom: 154, left: 70 }}
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
                  style={{ bottom: 154, left: 170 }}
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
          onPress={() => navigation.goBack()}
          style={{ bottom: 184, right: 180, opacity: 0 }}
          name="arrowleft"
          size={25}
          color={"black"}
        />
        <Text
          style={{ bottom: 205, right: 100, fontSize: 18, fontWeight: "bold" }}
        >
          Vocabulary mapping
        </Text>
        <View style={{ top: 285, right: 120 }}>
          <AntDesign.Button
            name="closecircle"
            size={94}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color={"#EE6A6A"}
            onPress={() => swiperRef.current.swipeLeft()}
          />
          <Text style={{ fontSize: 20, left: 40 }}>NO</Text>
        </View>
        <View style={{ top: 150, left: 120 }}>
          <AntDesign.Button
            name="checkcircle"
            size={94}
            backgroundColor="transparent"
            underlayColor="transparent"
            activeOpacity={0.3}
            color={"#5FCD98"}
            onPress={() => swiperRef.current.swipeRight()}
          />
          <Text style={{ fontSize: 20, left: 35 }}>YES</Text>
        </View>
        <View style={{ top: 190 }}>
          <Pressable
            onPress={() => {
              if (userWords.length < 10) {
                console.warn("User has swiped " + userWords.length + " Cards");
              }
              navigation.navigate("HomeScreen");
            }}
            style={styles.Button}
          >
            <Text style={styles.btntext}>Come Back Later</Text>
          </Pressable>
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
  card: {
    flex: 0.55,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "grey",
    borderRadius: 16,
    top: 110,
  },
  cardImage: {
    width: "100%",
    resizeMode: "cover",
    flex: 1,
    borderRadius: 16,
  },
  textcontainer: {
    position: "absolute",
    backgroundColor: "white",
    height: 150,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    top: 255,
    width: "100%",
    opacity: 0.7,
  },
  headtext: {
    textAlign: "left",
    left: 20,
    top: 5,
    fontSize: 24,
    fontWeight: "900",
  },
  caption: {
    position: "absolute",
    top: 70,
    left: 20,
  },
  Button: {
    height: 60,
    width: 350,
    borderRadius: 8,
    backgroundColor: "#6A0DAD",
    shadowColor: "rgba(0, 1, 0, 1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 0, height: 0 },
  },
  btntext: {
    fontSize: 20,
    textAlign: "center",
    textAlignVertical: "center",
    color: "white",
    fontWeight: "bold",
    top: 15,
  },
});
