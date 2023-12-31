import { View, Text, Button, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { Audio } from "expo-av";

const Instructions = () => {
  const navigation = useNavigation();
  const [sound, setSound] = useState();

  async function playSound() {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./audio/home.mp3")
    );
    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  }

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    playSound();
  }, []);

  return (
    <SafeAreaView>
      <View
        style={{
          width: "100%",
          marginTop: 20,
          paddingLeft: 15,
          paddingRight: 15,
        }}
      >
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            gap: 65,
            alignItems: "center",
          }}
        >
          <View>
            <AntDesign
              onPress={() => navigation.goBack()}
              name="arrowleft"
              size={25}
              color={"black"}
            />
          </View>
          <View>
            <Text style={{ fontSize: 25 }}>Quiz Instructions</Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            alignItems: "left",
            marginTop: 100,
            flexDirection: "column",
            gap: 30,
          }}
        >
          <View>
            <Text style={{ fontSize: 20 }}>
              {"\u2023  There will be 10 questions"}
            </Text>
          </View>
          <View>
            <Text style={{ fontSize: 20 }}>
              {"\u2023  Each question has a time limit of 60 seconds"}
            </Text>
          </View>
        </View>
        <View
          style={{
            width: "100%",
            height: "100%",
            alignItems: "center",
            marginTop: 470,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => {
              navigation.navigate("Quiz");
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 10,
                backgroundColor: "#A678F2",
                padding: 10,
                paddingLeft: 65,
                paddingRight: 65,
                borderRadius: 5,
              }}
            >
              <View>
                <Text style={{ fontSize: 25, color: "#f5f5f5" }}>
                  Enter the quiz
                </Text>
              </View>
              <View>
                <AntDesign
                  onPress={() => navigation.goBack()}
                  name="arrowright"
                  size={25}
                  color={"white"}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Instructions;
