import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import { useEffect, useState, useContext } from "react";
import { StatusBar } from "expo-status-bar";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AppLoading from "expo-app-loading";
import Navigation1 from "./navigations/navigation";
import AuthContextProvider, { AuthContext } from "./store/auth-context";
import Toast, { BaseToast, ErrorToast } from "react-native-toast-message"; //Toast Notification
import { NativeBaseProvider } from "native-base";

import { usePushNotifications } from "./pushNotification";

//Root function
function Root() {
  const [isTryingLogin, setIsTryingLogin] = useState(true);

  const authCtx = useContext(AuthContext);

  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");

      if (storedToken) {
        authCtx.authenticate(storedToken);
      }

      setIsTryingLogin(false);
    }

    fetchToken();
  }, []);

  if (isTryingLogin) {
    return <AppLoading />;
  }

  return <Navigation1 />;
}

export default function App() {
  const { expoPushToken } = usePushNotifications();
  console.log(expoPushToken);

  const toastConfig = {
    /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
    success: (props) => (
      <BaseToast
        {...props}
        style={{ backgroundColor: "#23C552", width: "95%" }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          color: "white",
          fontSize: 20,
          fontWeight: "400",
        }}
      />
    ),
  };

  return (
    <>
      <StatusBar backgroundColor="#A678F2" barStyle="light-content" />
      <AuthContextProvider>
        <NativeBaseProvider>
          <Root />
        </NativeBaseProvider>

        <>
          {/* this is an Toast message*/}
          <Toast config={toastConfig} />
        </>
      </AuthContextProvider>
    </>
  );
}
