import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React, { useState, useRef, useEffect, useContext } from "react";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import feed from "../LakshitModule/Feed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Appbar, TextInput, Button, Banner, RadioButton } from 'react-native-paper';

import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import fetchData from "../api/HomeAPI"
import { profileAPI, updateUserAPI } from "../api/profileScreenAPI";
import Loading from "./Home/Dictionary/Loading";

export default function NewNotification() {
  const baseFontSize = 16;
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();
  const context = useContext(AuthContext);
  const [notification, setnotification] = useState([]);
  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        // Retrieve token from context
        const token = context.token;

        // Fetch data from the first source (fetchData)
        const data = await fetchData(token);

        // Fetch data from the second source (profileAPI)
        const profileResponse = await profileAPI(token);
        const newData = profileResponse.data;

        // Set state variables
        setnotification(newData.notifications);
        console.log(newData.notifications);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, [context.token]);
  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', top: '30' }}>

          <Loading />
        </View>

      ) : (
        <SafeAreaView>
          <Appbar.Header style={styles.appBar}>
          <Appbar.BackAction onPress={() => navigation.goBack()} color="#fff" size={40} />
            <Text style={styles.heading}>Notifications</Text>
            <View style={{ flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", marginRight: 16 }}>
              {/* Mark all as read Icon */}
              <Text>
                <MaterialCommunityIcons
                  name="checkbox-multiple-marked-outline"
                  size={baseFontSize * 2.0}
                  color={"#fff"}
                />
              </Text>
              {/* Mark all as read Text */}
              {/* <Text>
      <Ionicons
        name="checkmark-done-sharp"
        color={"#8F6ACD"}
        size={baseFontSize}
      />
    </Text>
    <Text style={{ fontSize: baseFontSize * 0.8, color: "#8F6ACD" }}>
      Mark all as read
    </Text> */}
            </View>
          </Appbar.Header>

          <View style={styles.container}>
            {/* <View style={styles.innerContainer}>
        <FontAwesome style={{ right: 80 }} onPress={()=>console.log("clicked")} name="bars" size={25} />
        <Text style={styles.notification}>Notifications</Text>
        <MaterialCommunityIcons
          style={styles.delete}
          name="delete-circle"
          size={40}
          onPress={()=>console.log("clicked")}
        />
      </View> */}
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-end",
                justifyContent: "space-between",
              }}
            >




            </View>

            {/* Dummy Notifications */}
            {/* <FlatList
          enableEmptySections={true}
          style={{ marginTop: 15 }}
          data={feed.slice(0, 6)}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.notificationBox}>
              <View style={styles.content}>
                <View>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "flex-start",
                      alignItems: "center",
                    }}
                  >
                    <View style={styles.iconbackground}>
                      <MaterialCommunityIcons
                        onPress={() => console.log("clicked")}
                        style={{ top: 17 }}
                        size={25}
                        name={item.icon}
                        color={item.iconcolor}
                      />
                      <Entypo
                        size={25}
                        onPress={() => console.log("clicked")}
                        style={{ bottom: 17 }}
                        name={item.iconcross}
                        color={item.iconcolor}
                      />
                    </View>
                    <Text style={styles.description}>{item.caption}</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
        /> */}
            {notification.map((item) => (
              <View key={item.id} style={styles.notificationBox}>
                <View style={styles.content}>
                  <View>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "flex-start",
                        alignItems: "center",
                      }}
                    >
                      <View style={styles.iconbackground}>
                        <MaterialCommunityIcons
                          onPress={() => console.log("clicked")}
                          style={{ top: 17 }}
                          size={25}
                          name={item.icon}
                          color={item.iconcolor}
                        />
                        <Entypo
                          size={25}
                          onPress={() => console.log("clicked")}
                          style={{ bottom: 17 }}
                          name={item.iconcross}
                          color={item.iconcolor}
                        />
                      </View>
                      <Text style={styles.description}>{item}</Text>
                    </View>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  heading: {
    // marginTop: 60,
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold", // Make the font bold
  },
  appBar: {
    backgroundColor: '#A678F2',
    height: 80, // Set the desired height for the header
  },
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  innerContainer: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "space-around",
    flexDirection: "row",
    top: 80,
  },
  notification: {
    fontSize: 25,
    fontWeight: "900",
    top: 50,
    right: 105,
  },
  delete: {
    color: "#4CB9E7",
    top: 50,
    left: 80,
  },
  notificationBox: {
    padding: 10,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 25,
    marginBottom: 5,
    backgroundColor: "white",
    flexDirection: "row",
    borderRadius: 10,
    shadowColor: "rgba(0, 1, 0, 1)",
    shadowOpacity: 0.8,
    elevation: 1,
    shadowRadius: 10,
    shadowOffset: { width: 1, height: 13 },
  },
  icon: {
    marginTop: 5,
    width: 45,
    height: 45,
    borderRadius: 50,
  },
  description: {
    fontSize: 18,
    fontWeight: "normal",
    left: 15,
  },
  content: {
    alignItems: "left",
    justifyContent: "center",
    width: "90%",
  },
  iconbackground: {
    width: 40,
    height: 40,
    borderRadius: 30,
    backgroundColor: "#ADC4CE",
    justifyContent: "center",
    alignItems: "center",
  },
});
