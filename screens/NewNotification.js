import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import React from "react";
import {
  Entypo,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import feed from "../LakshitModule/Feed";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function NewNotification() {
  const baseFontSize = 16;

  const navigation = useNavigation();

  return (
    <SafeAreaView>
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
          <View style={{ flexDirection: "row", alignItems: "center", gap: 10 }}>
            <Pressable
              onPress={() => {
                navigation.goBack();
              }}
            >
              <Text>
                <Ionicons name="arrow-back-outline" size={baseFontSize * 1.6} />
              </Text>
            </Pressable>
            <Text style={{ fontSize: baseFontSize * 1.5 }}>Notifications</Text>
          </View>
          <Pressable
            onPress={() => {
              console.warn("Marked all as read");
            }}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
            >
              {/* Mark all as read Icon */}

              <Text>
                <MaterialCommunityIcons
                  name="checkbox-multiple-marked-outline"
                  size={baseFontSize * 1.6}
                  color={"#8F6ACD"}
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
          </Pressable>
        </View>

        {/* Dummy Notifications */}
        <FlatList
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
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
    marginTop: 15,
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
