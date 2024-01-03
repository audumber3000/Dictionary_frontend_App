import React, { useState, useEffect, useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  Pressable,
  SafeAreaView,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { send_otp } from "../../api/auth";
import { AuthContext } from "../../store/auth-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Dev() {
  const [contact, setContact] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  const validateMobileNumber = (contact) => {
    const pattern = /^\d{10}$/;
    return pattern.test(contact);
  };

  const handleDismissKeyboard = () => {
    // Keyboard.dismiss();
  };

  useEffect(() => {
    setIsButtonDisabled(!validateMobileNumber(contact));
  }, [contact]);

  const handleSubmit = async () => {
    try {
      handleDismissKeyboard();
      setIsLoading(true);

      const data = await send_otp(contact);

      if (data.statusCode === 200) {
        console.log("login-contact", contact);
        await authCtx.authenticateContact(contact);
        setIsLoading(false);
        navigation.navigate("OTP");
      } else {
        console.log(data.message);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    // <KeyboardAwareScrollView
    //   contentContainerStyle={styles.container}
    //   extraScrollHeight={100}
    // >
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: 350, height: 350 }}
            source={require("../../assets/pic1.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.text}>
            Your #1 Vocabulary Learning Companion !
          </Text>
          {/* <Text style={styles.text2}>
          Amplify with Wordify
        </Text> */}
          <Text style={styles.text3}>Phone</Text>
          <TextInput
            placeholder="+91"
            textAlignVertical="center"
            placeholderTextColor="#49454F"
            inputMode="numeric"
            maxLength={10}
            value={contact}
            onChangeText={(text) => setContact(text)}
            style={styles.input}
          />
          {!validateMobileNumber(contact) && (
            <Text style={styles.errorMessage}>
              Mobile number must be 10 digits
            </Text>
          )}
          <Pressable
            style={isLoading ? styles.disabledButton : styles.button}
            isDisabled={isLoading || isButtonDisabled}
            mt={20}
            onPress={handleSubmit}
          >
            {isLoading ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator color="white" size="small" />
                <Text style={styles.spinnerText}>Sending OTP</Text>
              </View>
            ) : (
              <Text style={styles.btntxt}>Continue</Text>
            )}
          </Pressable>
          <View style={{ flex: 1 }} />
        </View>
      </SafeAreaView>
    //  </KeyboardAwareScrollView> 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    top: 10,
  },
  formContainer: {
    flex: 1,
    marginHorizontal: 10,
    justifyContent: "flex-end",
    padding: 10,
  },

  text: {
    fontSize: 24,
    fontWeight: "bold",
    paddingBottom: 30,
    textAlign: "left",
  },
  text2: {
    fontSize: 15,
    fontWeight: "500",
    lineHeight: 21,
    color: "grey",
    letterSpacing: 0.32,
    paddingBottom: 20,
    textAlign: "left",
  },
  text3: {
    fontSize: 18,
    fontWeight: "600",
    color: "grey",
    lineHeight: 21,
    letterSpacing: -0.32,
    paddingBottom: 5,
    textAlign: "left",
  },
  input: {
    height: 60,
    borderWidth: 1,
    fontSize: 20,
    fontWeight: "400",
    lineHeight: 21,
    borderRadius: 4,
    borderColor: "#ccc",
    backgroundColor: "#ffffff",
    shadowColor: "rgba(0, 1, 0, 1)",
    padding: 10,
  },
  errorMessage: {
    color: "red",
    fontSize: 15,
    textAlign: "left",
    marginBottom: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: "#6A0DAD",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 1, 0, 1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    marginTop: 50,
  },
  iosbutton: {
    backgroundColor: "#6A0DAD",
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 1, 0, 1)",
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
    marginTop: 50,
  },

  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  btntxt: {
    fontSize: 20,
    fontWeight: "900",
    color: "white",
  },
});
