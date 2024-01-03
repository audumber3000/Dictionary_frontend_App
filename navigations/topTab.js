import React from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

//testing screens
import SignUp1 from "../screens/Auth/SignUp1";
import SignUp2 from "../screens/Auth/SignUp2";
import SignUp3 from "../screens/Auth/SignUp3";
import SignUp4 from "../screens/Auth/SignUp4";
import SignUp5 from "../screens/Auth/SignUp5";
import LeadScreen1 from "../screens/LeaderBoard/LeadScreen1";
import LeadScreen2 from "../screens/LeaderBoard/LeadScreen2";
import LeadScreen3 from "../screens/LeaderBoard/LeadScreen3";
const TopTab = createMaterialTopTabNavigator();


function LeadBoard() {
    return (
      <TopTab.Navigator
        screenOptions={{
          tabBarStyle: { height: 0 },
          style: { backgroundColor: "transparent" },
        }}
      >
        <TopTab.Screen
          name="LeadScreen1"
          component={LeadScreen1}
          options={{ headerShown: false, swipeEnabled: false }}
        />
        <TopTab.Screen
          name="LeadScreen2"
          component={LeadScreen2}
          options={{ headerShown: false, swipeEnabled: false }}
        />
        <TopTab.Screen
          name="LeadScreen3"
          component={LeadScreen3}
          options={{ headerShown: false, swipeEnabled: false }}
        />
      </TopTab.Navigator>
    );
  }


  function TopTabNavigation() {
    return (
      <TopTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "white",
          tabBarInactiveTintColor: "white",
          tabBarIndicatorStyle: {
            backgroundColor: "white",
          },
        }}
      >
        <TopTab.Screen
          name="SignUp1"
          component={SignUp1}
          options={{ headerShown: false, swipeEnabled: true }}
        />
        <TopTab.Screen
          name="SignUp2"
          component={SignUp2}
          options={{ headerShown: false, swipeEnabled: true }}
        />
        <TopTab.Screen
          name="SignUp3"
          component={SignUp3}
          options={{ headerShown: false, swipeEnabled: true }}
        />
        <TopTab.Screen
          name="SignUp4"
          component={SignUp4}
          options={{ headerShown: false, swipeEnabled: true }}
        />
        <TopTab.Screen
          name="SignUp5"
          component={SignUp5}
          options={{ headerShown: false, swipeEnabled: true }}
        />
      </TopTab.Navigator>
    );
  }

  export {LeadBoard, TopTabNavigation}