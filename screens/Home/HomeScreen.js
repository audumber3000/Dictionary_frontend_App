import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Pressable,
  Text,
} from "react-native";
import SearchComp from "../../components/HomeScreenComp/SearchComp";
import CardComp from "../../components/HomeScreenComp/CardComp1";
import CardComp2 from "../../components/HomeScreenComp/CardComp2";
import Fontisto from "react-native-vector-icons/Fontisto";
import { useNavigation } from "@react-navigation/native";
import RBSheet from "react-native-raw-bottom-sheet";
import ContactPermission from "../../components/HomeScreenComp/contactPermission";
import NotificationPermission from "../../components/HomeScreenComp/notificationPermission";
import NewNotify from "../NewNotification";
import * as Contacts from "expo-contacts";
import * as Notifications from "expo-notifications";

import SlideAlert from "../../components/TostMessage/SlideAlert";
import PopularCards from "../../AmitModule/PopularCards";

export default function HomeScreen() {
  const refRBSheet = useRef();
  const navigation = useNavigation();

  const [notificationCount, setNotificationCount] = useState(5); // Set the actual count as needed
  const [notificationPermission, setNotificationPermission] = useState(false);

  useEffect(() => {
    const checkAndRequestContactPermission = async () => {
      const { status } = await Contacts.getPermissionsAsync();

      if (status !== "granted") {
        // Permission not granted, open RBSheet to request permission
        setTimeout(() => {
          refRBSheet.current.open();
        }, 2000);
      }
    };
    checkAndRequestContactPermission();
  }, []);

  const toggleBottomSheet = () => {
    if (refRBSheet.current) {
      refRBSheet.current.close();
    }
  };

  const handleContinue = () => {
    console.log("Continue");
    // Implement your logic after the user has given contact permission and continued
    // For example, navigate to the next screen
    navigation.navigate("NextScreen");
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      horizontal={false}
      contentContainerStyle={{ minHeight: "100%" }}
    >
      <View style={styles.container}>
        <View style={styles.profileImage}>
          <Image
            style={styles.profileImage}
            source={require("../../assets/profile.png")}
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate("Notification")}
          style={styles.bellIcon}
        >
          <Fontisto name="bell-alt" size={40} color={"white"} />
          {notificationCount > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.notificationText}>{notificationCount}</Text>
            </View>
          )}
        </Pressable>
        <Image
          style={styles.backgroundImage}
          source={require("../../assets/wave1.png")}
        />

        <SearchComp />
        <View style={styles.cardcontainer}>
          <CardComp />
          <PopularCards />
          <CardComp2 />
          {/* <CardComp2 /> */}
        </View>

        {/* bottom drawer */}
        <RBSheet
          ref={refRBSheet}
          height={550}
          openDuration={250}
          closeOnDragDown={true}
          closeOnPressMask={false}
          customStyles={{
            wrapper: {
              backgroundColor: "rgba(0,0,0,0.8)", // Adjust the opacity as needed
            },
            draggableIcon: {
              backgroundColor: "grey",
            },
            container: {
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
            },
          }}
        >
          <ContactPermission onClose={toggleBottomSheet} />
        </RBSheet>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A678F2",
    flexDirection: "column",
  },
  backgroundImage: {
    position: "absolute",
    top: 120,
    left: 0,
    width: "100%",
    height: 270,
  },
  bellIcon: {
    position: "absolute",
    top: 60,
    right: 10,
  },
  profileImage: {
    position: "absolute",
    top: 30,
    left: 10,
    height: 45,
    width: 45,
    borderRadius: 20,
  },
  cardcontainer: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingBottom: 80,
  },
  notificationBadge: {
    position: "absolute",
    top: 5,
    right: 2,
    backgroundColor: "red",
    borderRadius: 8,
    paddingHorizontal: 5,
    paddingVertical: 1,
  },
  notificationText: {
    color: "white",
    fontWeight: "bold",
  },
});
