import {
  View,
  Text,
  Image,
  TextInput,
  StyleSheet,
  Pressable,
  Keyboard,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { verify_otp } from "../../api/auth";
import { AuthContext } from "../../store/auth-context";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default function Devotp() {
  const [OTP, setOTP] = useState("");
  const [OtpResponse, setOtpResponse] = useState(true);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setisLoading] = useState(false);
  const [slideAlertMessage, setSlideAlertMessage] = useState("");
  const authCtx = useContext(AuthContext);
  const navigation = useNavigation();

  const handleDismissKeyboard = () => {
    // Keyboard.dismiss();
  };

  useEffect(() => {
    setisLoading(false);
  }, []);

  const handleSubmit = async (otp) => {
    try {
      handleDismissKeyboard();
      setisLoading(true);
      const contact = await AsyncStorage.getItem("contact");
      const data = await verify_otp(contact, otp);

      if (data.code === 200) {
        setisLoading(false);
        navigation.navigate("TopTab");
      } else if (data.code === 201) {
        setisLoading(false);
        authCtx.authenticate(data.token.access.token);
        navigation.navigate("Dev");
      } else {
        setisLoading(false);
        setSlideAlertMessage("Ohh! Incorrect OTP");
        setOtpResponse(false);
      }
    } catch (error) {
      setSlideAlertMessage(
        "Sorry, Looks like something went wrong from our side!"
      );
      console.error(error);
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      extraScrollHeight={100}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={{ width: 350, height: 350, top: 20 }}
            source={require("../../assets/pic2.png")}
          />
        </View>
        <View style={styles.formContainer}>
          <Text style={styles.text}>Verify Your Phone</Text>
          <Text style={styles.text2}>
            Please input the OTP sent to your mobile number
          </Text>
          <Text style={styles.text3}>OTP</Text>
          <TextInput
            maxLength={4}
            secureTextEntry
            textAlign="left"
            placeholderTextColor={"#49454F"}
            inputMode="numeric"
            style={styles.input}
            value={OTP}
            onChangeText={(value) => {
              setOTP(value);
              if (value.length >= 4) {
                handleSubmit(value);
              }
              // console.log(value);
            }}
          />
          {!OtpResponse && (
            <Text style={{ color: "red" }}>
              You have entered an incorrect OTP !
            </Text>
          )}
          <Pressable
            style={isLoading ? styles.disabledButton : styles.button}
            isDisabled={isLoading || isButtonDisabled}
            isLoadingText="verifying OTP"
            onPress={handleSubmit}
          >
            {isLoading ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator color="white" size="small" />
                <Text style={styles.spinnerText}>Verifying</Text>
              </View>
            ) : (
              <Text style={styles.btntxt}>Verify</Text>
            )}
          </Pressable>
          <View style={{ flex: 1 }} />
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>
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
    paddingBottom: 10,
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
  button: {
    backgroundColor: "#6A0DAD",
    height: 50,
    marginTop: 45,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "rgba(0, 1, 0, 1)",
    shadowOpacity: 0.8,
    elevation: 6,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 13 },
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
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  buttonContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
