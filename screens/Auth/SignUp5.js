import React, { useState, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import * as Progress from "react-native-progress";
import Feed from "../../LakshitModule/Feed";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signup } from "../../api/auth";
import { AuthContext } from "../../store/auth-context";

const SignUp5 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const [progress, setProgress] = useState(0.8);
  const [error, setError] = useState();
  const [slideAlertMessage, setSlideAlertMessage] = useState("");
  const navigation = useNavigation();
  const authCtx = useContext(AuthContext);

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const handleSignup = async () => {
    try {
      setIsLoading(true);

      console.log("Lakshit");
      // Make a POST request to the API with the contact
      handleDismissKeyboard;

      const contact = await AsyncStorage.getItem("contact");
      const email = await AsyncStorage.getItem("email");
      const name = await AsyncStorage.getItem("name");
      const level_of_english = await AsyncStorage.getItem("level_of_english");
      const password = contact + "Pass@123";
      const native_language = await AsyncStorage.getItem("native_language");
      const examAspirant = await AsyncStorage.getItem("examAspirant");
      const topics = selectedImages;

      console.log(
        "phone",
        contact,
        name,
        email,
        level_of_english,
        native_language,
        examAspirant,
        topics
      );
      const data = await signup(
        contact,
        password,
        name,
        email,
        level_of_english,
        native_language,
        examAspirant,
        topics
      );

      console.log(data);

      if (data.statusCode == 201) {
        console.log("Code 201");
        setIsLoading(false);
        await authCtx.authenticate(data.token.access.token);
        authCtx.authenticateUserId(data._id);
        navigation.navigate("SignUp1");
        setProgress(progress + 0.2);
      } else {
        setSlideAlertMessage("Sorry, Looks like somthing went wrong !");
        setIsLoading(false);
        console.log("unsuccessfull");
      }

      // Simulate a delay (replace with actual logic)
      setTimeout(() => {
        // After successful signup or error handling, reset isLoading
        setIsLoading(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsLoading(false); // Reset isLoading in case of an error
    }
  };

  // const ImageSelector = () => {
  //   try {
  //     console.log(selectedImages)
  //     AsyncStorage.setItem("topics",selectedImages)
  //     setProgress(0.8)
  //   } catch {
  //     console.error("Error storing data:", error);
  //   }
  // };

  const toggleImageSelection = (imageId) => {
    if (selectedImages.includes(imageId)) {
      // If the image is already selected, remove it from the array
      setSelectedImages(selectedImages.filter((id) => id !== imageId));
    } else {
      // If the image is not selected, add it to the array
      setSelectedImages([...selectedImages, imageId]);
    }
  };

  return (
    <View style={styles.container}>
      <Progress.Bar
        style={styles.progressBar}
        progress={progress}
        color={"#A780E8"}
        width={360}
        borderWidth={1}
        borderColor={"#A780E8"}
        unfilledColor={"white"}
        height={12}
        animationType="timing"
      />
      <Text style={styles.BarText}>Almost Done...</Text>
      <Text style={styles.questionText}>Pick All Your Interested Topics!</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.imageCardContainer}
      >
        {Feed.map((imageCard) => (
          <View
            key={imageCard.id}
            style={[
              styles.card,
              styles.cardElevation,
              selectedImages.includes(imageCard.id) && styles.selectedImage,
            ]}
          >
            <Pressable
              style={styles.imageContainer}
              onPress={() => toggleImageSelection(imageCard.Interest)}
            >
              <Image
                source={{ uri: imageCard.imageSource }}
                style={styles.image}
              />
              {selectedImages.includes(imageCard.Interest) && (
                <View style={styles.overlay} />
              )}
            </Pressable>
            <View style={styles.imageTextContainer}>
              <Text style={styles.imageText}>{imageCard.Interest}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Pressable
        style={
          isLoading || selectedImages.length === 0
            ? styles.disabledButton
            : styles.button
        }
        disabled={isLoading || selectedImages.length === 0}
        onPress={handleSignup}
      >
        {isLoading ? (
          <View style={styles.buttonContent}>
            <ActivityIndicator color="white" size="small" />
            <Text style={styles.spinnerText}>Verifying</Text>
          </View>
        ) : (
          <Text style={styles.btntxt}>Next</Text>
        )}
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  BarText: {
    top: 80,
    lineHeight: 21,
    letterSpacing: -0.32,
    alignItems: "center",
    marginRight: 220,
    fontSize: 16,
    fontWeight: "700",
    color: "#A780E8",
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  progressBar: {
    top: 65,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 29.26,
    marginVertical: 40,
    paddingTop: 60,
  },
  imageCardContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "30%",
    aspectRatio: 0.8,
    marginVertical: 6,
    borderColor: "#ddd",
    borderRadius: 10,
    shadowColor: "black",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 10,
    shadowOffset: { width: -3, height: 13 },
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
  },
  selectedImage: {
    borderWidth: 2,
    borderColor: "transparent",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    backgroundColor: "rgba(106, 13, 173, 0.5)", // Customize the overlay color and opacity
  },
  imageTextContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    padding: 5,
    alignItems: "center",
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  imageText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  btntxt: {
    fontSize: 20,
    fontWeight: "900",
    color: "white",
  },
  spinnerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: "#9B68B2",
    height: 50,
    width: "90%",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    bottom: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#6A0DAD",
    height: 50,
    width: "90%",
    marginTop: 60,
    bottom: 30,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 1, 0, 1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});

export default SignUp5;
