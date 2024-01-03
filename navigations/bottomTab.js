import React from "react";
import {useNavigation } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { GlobalStyles } from "../constants/style";
import Learn from "../screens/Home/Dictionary/LearnScreen";
import HomeScreen from "../screens/Home/HomeScreen";
import Profile from "../screens/ProfileScreen";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { LeadBoard } from "./topTab";
const BottomTabs = createBottomTabNavigator();

function BottomTabNavigationfun() {
  const navigation = useNavigation();
  const college = "COEP Technological University";

  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary800 },
        headerTintColor: "white",
        tabBarActiveTintColor: GlobalStyles.colors.primary700,
        tabBarStyle: {
          position: "absolute",
          bottom: 20, // Adjust this value to your preferred distance from the bottom
          paddingBottom: "5%",
          paddingTop: "0.5%",
          height: "9%",
          bottom: 0, // Align it to the bottom
          left: 0,
          right: 0,
          // Add shadow styles here
          ...Platform.select({
            ios: {
              shadowColor: "rgba(0, 0, 0, 0.24)",
              shadowOffset: {
                width: 0,
                height: -2,
              },
              shadowOpacity: 0.8,
              shadowRadius: 4,
            },
            android: {
              elevation: 8,
            },
          }),
        },

        tabBarIndicatorStyle: {
          backgroundColor: GlobalStyles.colors.primary700,
          height: 2,
        },
        tabBarLabelStyle: { fontSize: 13 },
        tabBarIconStyle: { color: "blue" },
      }}
    >
      <BottomTabs.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Search",
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "earth" : "earth-outline"}
              size={size}
              color={color}
            />
          ),
        }} // Hide header for HomeScreen
      />

      <BottomTabs.Screen
        name="Learn"
        // component={WordList}
        component={Learn}
        options={{
          title: "Learn",
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "cube" : "cube-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="LeaderBoard"
        component={LeadBoard}
        options={{
          title: "LeaderBoard",
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "trophy" : "trophy-outline"}
              size={size + 2}
              color={color}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="Profile"
        component={Profile}
        options={{
          title: "Profile",
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color, size }) => (
            <FontAwesome
              name={focused ? "user" : "user-o"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
}

export { BottomTabNavigationfun };
