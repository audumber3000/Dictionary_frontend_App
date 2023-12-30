import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Audio } from "expo-av";

export default function Substantiate() {
  const route = useRoute();

  const word = route.params?.word;
  const meaning = route.params?.meaning;
  const origin = route.params?.origin;
  const audio = route.params?.sound?.audio;

  const [sound, setSound] = useState();

  const baseFontSize = 16;

  let counter = 1;

  const navigation = useNavigation();

  async function playSound() {
    console.log("Loading Sound");
    console.log(audio);
    const { sound } = await Audio.Sound.createAsync(
      { uri: audio },
      { shouldPlay: true }
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

  return (
    <SafeAreaView>
      <ScrollView
        contentContainerStyle={{ minHeight: "100%" }}
        showsVerticalScrollIndicator={false}
        style={{ backgroundColor: "white" }}
      >
        <View style={styles.container}>
          <View style={styles.topcardcontainer}>
            <AntDesign
              onPress={() => navigation.goBack()}
              style={{ top: 30, left: 30 }}
              name="arrowleft"
              size={22}
              color={"#FFFFFF"}
            />
            <View
              style={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
                top: 25,
              }}
            >
              <Text
                style={{
                  fontSize: 28,
                  lineHeight: 34.15,
                  letterSpacing: 1,
                  fontWeight: "900",
                  color: "white",
                }}
              >
                {word.charAt(0).toUpperCase() + word.slice(1)}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-evenly",
                marginHorizontal: 10,
              }}
            >
              <Image
                style={{ width: 65, height: 65 }}
                source={require("../../../assets/save.png")}
              />
              <Image
                style={{ width: 65, height: 65 }}
                source={require("../../../assets/favorite.png")}
              />
              <Image
                style={{ width: 65, height: 65 }}
                source={require("../../../assets/share.png")}
              />
              {audio && (
                <Pressable
                  onPress={() => {
                    playSound();
                  }}
                >
                  <Image
                    style={{ width: 65, height: 65 }}
                    source={require("../../../assets/sound.png")}
                  />
                </Pressable>
              )}
            </View>
          </View>
          {/* Text Content */}
          <View
            style={{
              width: "100%",
              paddingLeft: 20,
              paddingRight: 20,
              marginTop: 15,
            }}
          >
            {/* Title */}
            <View>
              <Text style={{ fontSize: baseFontSize * 1.1, fontWeight: 500 }}>
                DEFINITION FOR {word.toUpperCase()}
              </Text>
            </View>
            {/* Part of speech */}
            <View
              style={{
                marginTop: 10,
                flexDirection: "row",
                gap: 5,
                marginBottom: 15,
              }}
            >
              {meaning.map((e, index) => {
                return (
                  <Text
                    style={{ fontSize: baseFontSize * 1, fontStyle: "italic" }}
                  >
                    {e.partOfSpeech}
                    {index != meaning.length - 1 ? "," : null}
                  </Text>
                );
              })}
            </View>
            {/* Meaning */}
            {meaning.map((e, index1) => {
              return e.definitions.map((def, index2) => {
                {
                  /* counter++; */
                }
                return (
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "top",
                        justifyContent: "flex-start",
                        gap: 5,
                        marginBottom: def.example ? 15 : -5,
                      }}
                    >
                      <View>
                        <Text
                          style={{
                            fontWeight: 500,
                            color: "#000",
                            fontSize: baseFontSize * 1,
                          }}
                        >
                          {counter++}
                          {/* {e.definitions.length} */}
                        </Text>
                      </View>
                      <View>
                        <Text
                          style={{
                            fontSize: baseFontSize * 1,
                            color: "#000",
                            fontWeight: 500,
                          }}
                        >
                          {/* {e.definitions[0]?.definition} */}
                          {def?.definition}
                        </Text>
                        <View style={{ marginTop: 3 }}>
                          <Text
                            style={{
                              fontSize: baseFontSize * 1,
                              fontStyle: "italic",
                            }}
                          >
                            {/* {e.definitions[0]?.example} */}
                            {def?.example}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                );
              });
            })}
            {/* Origin */}
            {origin && (
              <View style={{ marginTop: 30 }}>
                <View>
                  <Text style={{ fontSize: baseFontSize, fontWeight: 600 }}>
                    ORIGIN OF {word.toUpperCase()}
                  </Text>
                </View>
                <View style={{ marginTop: 10 }}>
                  <Text
                    style={{
                      fontSize: baseFontSize * 0.9,
                      color: "#363636",
                      textAlign: "justify",
                      fontWeight: 500,
                    }}
                  >
                    First recorded in 1650-60; from new latin substantiates (
                    Past participle of substantiates) equivalent to latin
                    substanti(a) substance+ -atus - ate
                  </Text>
                </View>
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingBottom: 10,
    backgroundColor: "white",
    top: -5,
  },
  topcardcontainer: {
    width: "100%",
    height: 300,
    backgroundColor: "#8F6ACD",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    resizeMode: "cover",
  },
});
