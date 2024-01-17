import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { RadioButton } from "react-native-paper";
import * as Progress from "react-native-progress";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUp2() {
  const [selectedValue, setSelectedValue] = useState("option1");
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0.2);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const options = [
    { label: "I Don’t know English", value: "option1" },
    { label: "Basic", value: "option2" },
    { label: "Intermediate", value: "option3" },
    { label: "Advanced", value: "option4" },
  ];

  const handleRadioSelect = (value) => {
    setSelectedValue(value);
  };

  const handleNext = async () => {
    try {
      if (!selectedValue.trim()) {
        setError('Please Select one option!');
        setProgress(0.2);
      } else {
        setError('');
        await AsyncStorage.setItem('level_of_english', selectedValue);
        navigation.navigate("SignUp3");
        setProgress(progress + 0.2);
        console.log(selectedValue, 'is Selected');
        setProgress(0.2);
      }
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={100}
      keyboardShouldPersistTaps="handled"
    >
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
        <Text style={styles.questionText}>Level of English?</Text>
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >
          {options.map((option) => (
            <Pressable
              key={option.value}
              style={styles.cardContainer}
              onPress={() => handleRadioSelect(option.value)}
            >
              <View style={styles.RadioContainer}>
                <RadioButton
                  value={option.value}
                  uncheckedColor="#cccc"
                  color="#7352AC"
                  status={selectedValue === option.value ? "checked" : "unchecked"}
                  onPress={() => handleRadioSelect(option.value)}
                />
                <Text style={styles.RadioText}>{option.label}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>
        <Pressable
          style={isLoading ? styles.disabledButton : styles.button}
          disabled={isLoading}
          onPress={handleNext}
        >
          {isLoading ? (
            <View style={styles.buttonContent}>
              <ActivityIndicator color="white" size="small" />
              <Text style={styles.spinnerText}>Verifying</Text>
            </View>
          ) : (
            <Text style={styles.btnText}>Next</Text>
          )}
        </Pressable>
        <Text style={styles.errorMsg}>{error}</Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: 'white',
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
  formContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    marginVertical: 10,
    padding: 10,
  },
  cardContainer: {
    width: 350,
    marginVertical: 10,
  },
  RadioContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#FFFFFF",
    shadowColor: "rgba(0, 1, 0, 1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  RadioText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#696969", // Change the color to match your design
    letterSpacing: 0.5,
    textAlign: "center",
    marginLeft: 15,
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
  btnText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
  },
  spinnerText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    marginLeft: 10,
  },
  disabledButton: {
    backgroundColor: '#B76EAD',
    height: 60,
    width: 350,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  errorMsg: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
  }
});
