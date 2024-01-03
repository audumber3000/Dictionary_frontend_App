import Feed from "../../../LakshitModule/Feed";
import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
} from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";
import LottieView from "lottie-react-native";
import { questionsArr } from "./questions";
import RBSheet from "react-native-raw-bottom-sheet";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Audio } from "expo-av";

const Quiz = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const navigation = useNavigation();
  const [questionNum, setQuestionNum] = useState(0);
  const [showAnimation, setShowAnimation] = useState(false);
  const [timer, setTimer] = useState(100);
  const [timeSeconds, setTimeSeconds] = useState(60);
  const [sound, setSound] = useState();
  // const [showSheet, setShowSheet] = useState(false);
  const sampleImage =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQShMOHBfPGb7D50_ZYOhDLdZl0mzLNr5Dayw&usqp=CAU";

  const refRBSheet = useRef();
  const timerInterval = useRef(null);

  const nextQuestion = () => {
    optionSelectSound();
    const len = questionsArr.length;
    setSelectedImage(null);
    setQuestionNum((prevVal) => {
      if (prevVal != len - 1) {
        return prevVal + 1;
      } else {
        return 0;
      }
    });
    // startTimer();
  };

  const optionSelectSound = async () => {
    console.log("Loading Sound");
    const { sound } = await Audio.Sound.createAsync(
      require("./audio/select.mp3")
    );

    setSound(sound);

    console.log("Playing Sound");
    await sound.playAsync();
  };

  useEffect(() => {
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  useEffect(() => {
    setTimer(100);
    setTimeSeconds(60);
    clearInterval(timerInterval.current);

    timerInterval.current = setInterval(() => {
      setTimer((prevVal) => {
        if (prevVal <= 0) {
          clearInterval(timerInterval.current);
          nextQuestion();
          setTimeSeconds(60);
          return 100;
        } else {
          setTimeSeconds((prevVal) => {
            return prevVal - 1;
          });
          return prevVal - 1.67;
        }
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [questionNum]);

  return (
    <View style={styles.container}>
      <RBSheet
        height={550}
        width={"100%"}
        ref={refRBSheet}
        closeOnDragDown={true}
        onClose={nextQuestion}
        style={{ position: "relative" }}
      >
        <View style={{ width: "100%" }}>
          <View
            style={{
              width: "100%",
              // alignItems: "center",
              paddingLeft: 25,
              paddingRight: 25,
              marginTop: 25,
            }}
          >
            {/* Current question will be shown here */}
            <Text style={{ fontSize: 20 }}>
              {questionsArr[questionNum]?.question}
            </Text>
            {/* correct answer will be shown here */}

            <Image
              source={{ uri: sampleImage }}
              style={{
                width: "100%",
                height: 250,
                borderRadius: 10,
                marginTop: 20,
              }}
            />
            <Text style={{ fontSize: 20, marginTop: 20, fontWeight: 500 }}>
              Correct answer : &nbsp;
              {questionsArr[questionNum]?.options.map((e) => {
                if (e.correctOption == true) {
                  return e.text;
                }
              })}
            </Text>
            <AntDesign
              name="closecircle"
              size={25}
              color={"#e1e1e1"}
              style={{ position: "absolute", right: 30 }}
            />
          </View>
        </View>
      </RBSheet>
      <AntDesign
        onPress={() => {
          clearInterval(timerInterval);
          navigation.goBack();
        }}
        style={{ top: 80, right: 180 }}
        name="arrowleft"
        size={25}
        color={"black"}
      />
      <AnimatedCircularProgress
        size={32}
        width={5}
        fill={timer}
        tintColor="#A678F2"
        backgroundColor="#d1d1d1"
        style={{
          position: "absolute",
          top: 95,
          right: 25,
        }}
      />
      <View style={{ position: "absolute", right: 33, top: 101 }}>
        <Text>{timeSeconds}</Text>
      </View>

      <View
        style={{
          width: "100%",
          // backgroundColor: "red",
          position: "absolute",
          top: 100,
          left: "30%",
        }}
      >
        <Text style={{ marginRight: 105, fontSize: 20, fontWeight: 600 }}>
          Question {questionNum + 1}/{questionsArr.length}
        </Text>
      </View>

      <Text style={styles.questionText}>
        {questionsArr[questionNum]?.question}
      </Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.imageCardContainer}
      >
        {Feed.slice(0, 4).map((imageCard, index) => (
          <View
            key={imageCard.id}
            style={[
              styles.card,
              styles.cardElevation,
              selectedImage === imageCard.id && styles.selectedImage,
            ]}
          >
            <Pressable
              style={styles.imageContainer}
              onPress={() => {
                if (
                  questionsArr[questionNum]?.options[index].correctOption ==
                  true
                ) {
                  setShowAnimation(true);
                  setTimeout(() => {
                    setShowAnimation(false);
                    nextQuestion();
                  }, 1500);
                } else {
                  refRBSheet.current.open();
                }
                setSelectedImage(imageCard.Language);
              }}
            >
              <Image
                source={{
                  uri: sampleImage,
                }}
                style={styles.image}
              />
              {selectedImage === imageCard.Language && (
                <View style={styles.overlay} />
              )}
              <Text style={styles.badge}>
                {index == 0
                  ? "A"
                  : index == 1
                  ? "B"
                  : index == 2
                  ? "C"
                  : index == 3
                  ? "D"
                  : null}
              </Text>
            </Pressable>
            <View style={styles.imageTextContainer}>
              <Text style={styles.imageText}>
                {questionsArr[questionNum]?.options[index].text}
              </Text>
            </View>
          </View>
        ))}
      </ScrollView>
      {showAnimation && (
        <LottieView
          speed={0.6}
          style={{
            position: "absolute",
            bottom: 0,
            width: 400,
          }}
          source={require("./animations/celebration.json")}
          autoPlay
          loop
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  questionText: {
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 29.26,
    marginVertical: 55,
    paddingTop: 65,
    color: "purple",
  },
  imageCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    bottom: 20,
  },
  card: {
    width: "47%",
    aspectRatio: 0.8,
    marginVertical: 20,
  },
  imageContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderRadius: 10,
    position: "absolute",
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: "transparent",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    backgroundColor: "rgba(106, 13, 173, 0.5)", // Customize the overlay color and opacity
    position: "absolute", // Add this line
  },
  imageTextContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#DADDEE",
    padding: 10,
    alignItems: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#381652",
  },
  badge: {
    backgroundColor: "#6A0DAD",
    color: "white",
    fontWeight: "900",
    fontSize: 15,
    width: 25,
    height: 25,
    textAlignVertical: "center",
    textAlign: "center",
    borderTopLeftRadius: 10,
  },
});

export default Quiz;
