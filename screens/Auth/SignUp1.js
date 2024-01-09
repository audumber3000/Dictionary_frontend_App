import { StyleSheet, Text, View, TextInput, SafeAreaView,Pressable,ActivityIndicator,BackHandler} from "react-native";
import React,{useState,useEffect} from "react";
import * as Progress from "react-native-progress";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from "@react-navigation/native";

export default function SignUp1() {
  
  const [name, setName] = useState("");
  const[progress,setProgress] = useState(0.05)
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const navigation = useNavigation();

  const storeData = async () => {

    try {
      if(name.trim() === '' || email.trim() === '' || contact.trim() === '')
    {
      setError('Please Filled all the required details')
      setProgress(0.05)
    }
    else{
      setError('')
      await AsyncStorage.setItem('name',name); 
      await AsyncStorage.setItem('email',email);
      await AsyncStorage.setItem('contact',contact);
      console.log('Data stored successfully.');
      console.log(name,email,contact)
      navigation.navigate('SignUp2')
      setProgress(progress+0.2)

      // clearing the fields after submitting the data
      setName('')
      setEmail('')
      setContact('')
      setProgress(0.05)
    }
    } catch (error) {
      console.error('Error storing data:', error);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={100}
    >
      <SafeAreaView style={styles.container}>
        <Progress.Bar
          style={styles.progressBar}
          progress={progress}
          color={"#A780E8"}
          width={350}
          borderWidth={1}
          borderColor={"#A780E8"}
          unfilledColor={"white"}
          height={12}
          animationType="timing"
        />
        <Text style={styles.questionText}>Let us know you better.</Text>
        <View
          style={styles.FormContainer}
        >
          <Text style={styles.inputText}>Name</Text>
          <TextInput
            placeholder="eg.Robitn"
            textAlignVertical="center"
            placeholderTextColor="#C4C4C4"
            inputMode="text"
            value={name}
            onChangeText={(text) => setName(text)}
            style={styles.input}
          />

          <Text style={styles.inputText}>Email</Text>
          <TextInput
            placeholder="@gmail.com"
            textAlignVertical="center"
            placeholderTextColor="#C4C4C4"
            inputMode="email"
            value={email}
            onChangeText={(text) => setEmail(text)}
            style={styles.input}
          />

          <Text style={styles.inputText}>Phone</Text>
          <TextInput
            placeholder="+91"
            textAlignVertical="center"
            placeholderTextColor="#C4C4C4"
            inputMode="numeric"
            maxLength={10}
            value={contact}
            onChangeText={(text) => setContact(text)}
            style={styles.input}
          />

        </View>
        <Pressable
        style={isLoading ? styles.disabledButton : styles.button}
        disabled={isLoading || isButtonDisabled}
        onPress={storeData}
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
      <Text style={styles.errorMsg}>{error}</Text>
      </SafeAreaView>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:'white'
  },
  progressBar: {
    top: 80,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 24,
    fontWeight: "900",
    lineHeight: 29.26,
    marginVertical: 40,
    paddingTop: 95,
  },
  FormContainer:{
    flex:1,
    justifyContent:'flex-start',
    marginVertical: 10,
    padding: 10,
  },
  input: {
    height: 48,
    borderWidth: 1,
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 21,
    borderRadius: 4,
    borderColor: "#ccc",
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0, 1, 0, 1)",
    padding: 10,
    width:350,
    marginBottom:40
  },
  inputText: {
    fontSize: 18,
    fontWeight: "600",
    color: "black",
    lineHeight: 21,
    letterSpacing: -0.32,
    paddingBottom: 10,
    textAlign: "left",
  },
  button: {
    backgroundColor: "#6A0DAD",
    width: 350,
    height:50,
    bottom: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 1, 0, 1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
  },
  disabledButton: {
    backgroundColor: "#9B68B2",
    height: 50,
    width: 350,
    top:-50,
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
  errorMsg:{
    color:'red',
    fontSize:15,
    fontWeight:'bold',
    margin:2,
    bottom:40
  }
});
