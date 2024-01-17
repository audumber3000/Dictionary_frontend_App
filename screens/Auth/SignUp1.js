import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ScrollView, Pressable, ActivityIndicator } from "react-native";
import { TextInput as PaperTextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";
import * as Progress from "react-native-progress";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function SignUp1() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [progress, setProgress] = useState(0.05);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [initialRender, setInitialRender] = useState(true);


  const navigation = useNavigation();

  useEffect(() => {
    const fetchStoredData = async () => {
      try {
        const storedName = await AsyncStorage.getItem("name");
        const storedEmail = await AsyncStorage.getItem("email");
        const storedContact = await AsyncStorage.getItem("contact");

        if (storedName) setName(storedName);
        if (storedEmail) setEmail(storedEmail);
        if (storedContact) setContact(storedContact);
      } catch (error) {
        console.error("Error fetching stored data:", error);
      }
      setInitialRender(false);
    };
    fetchStoredData();
  }, []);



  const storeData = async () => {
    try {
      if (name.trim() === "" || email.trim() === "" || contact.trim() === "") {
        setError("Please fill in all the required details");
        setProgress(0.05);
      } else {
        setError("");
        await AsyncStorage.setItem("name", name);
        await AsyncStorage.setItem("email", email);
        await AsyncStorage.setItem("contact", contact);
        console.log("Data stored successfully.");
        console.log(name, email, contact);
        navigation.navigate("SignUp2");
        setProgress(progress + 0.2);

        // Clearing the fields after submitting the data
        setName("");
        setEmail("");
        setContact("");
        setProgress(0.05);
      }
    } catch (error) {
      console.error("Error storing data:", error);
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
        <Text style={styles.questionText}>Let us know you better.</Text>
        <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
        >

      
          <PaperTextInput
            label="eg. Robitn"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
            mode="outlined"
            theme={{ colors: { primary: '#8E44AD', background: 'transparent' } }}
            error={error && !name}
          />
         

        
            <PaperTextInput
              label="@gmail.com"
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.input}
              mode="outlined"
              theme={{ colors: { primary: '#8E44AD', background: 'transparent' } }}
              error={error && !email}
            />
        

         
          <PaperTextInput
            label="+91"
            value={contact}
            onChangeText={(text) => setContact(text)}
            style={styles.input}
            mode="outlined"
            maxLength={10}
            keyboardType="numeric"
            theme={{ colors: { primary: '#8E44AD', background: 'transparent' } }}
            visible={!contact}
            error={error && !contact}
          />
        

        </ScrollView>
        <Pressable
          style={isLoading ? styles.disabledButton : styles.button}
          disabled={isLoading}
          onPress={storeData}
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
  input: {
    height: 50,
    fontSize: 20,
    fontWeight: "400",
    borderRadius: 8,
    padding: 10,
    width: 350,
    marginBottom: 20,
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
  disabledButton: {
    backgroundColor: "#B76EAD",
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
  errorMsg: {
    color: 'red',
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 10,
  }
});
