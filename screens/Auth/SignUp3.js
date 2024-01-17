import Feed from "../../LakshitModule/Feed";
import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const SignUp3 = () => {

  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [progress,setProgress]=useState(0.4)
  const [error,setError] = useState()
  const navigation = useNavigation();


  const ImageSelector = () => {
    try{
      if(selectedImage.trim() === '')
    {
      setError('Please Select one option!')
      setProgress(0.4)
    }
    else{
        AsyncStorage.setItem("native_language",selectedImage)
        navigation.navigate("SignUp4")
        setProgress(progress+0.2)
        console.log(selectedImage)
      }
    }
    catch{
      console.error('Error storing data:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Progress.Bar
          style={styles.progressBar}
          progress={progress}
          color={"#8E44AD"}
          width={350}
          borderWidth={1}
          borderColor={"#8E44AD"}
          unfilledColor={"white"}
          height={12}
          animationType="timing"
        />

      <Text style={styles.questionText}>Your Native Language?</Text>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.imageCardContainer}
      >
        {Feed.slice(0, 9).map((imageCard) => (
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
              onPress={() => setSelectedImage(imageCard.Language)}
            >
              <Image source={{ uri: imageCard.imageSource }} style={styles.image} />
              {selectedImage === imageCard.Language && <View style={styles.overlay} />}
            </Pressable>
            <View style={styles.imageTextContainer}>
              <Text style={styles.imageText}>{imageCard.Language}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Pressable
        style={isLoading ? styles.disabledButton : styles.button}
        disabled={isLoading || isButtonDisabled}
        onPress={ImageSelector}
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
  container: {
    flex: 1,
    padding: 16,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'white'
  },
  progressBar: {
    marginTop: 20,
    borderRadius: 10,
    height: 12,
  },
  questionText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    paddingTop: 80,
  },
  imageCardContainer: {
    padding:10,
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
    borderRadius:10,
    backgroundColor: "rgba(106, 13, 173, 0.5)",
    position: "absolute",
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
    backgroundColor: "#8E44AD",
    width: 350,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    shadowColor: "rgba(0, 0, 0, 0.2)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
});

export default SignUp3;
