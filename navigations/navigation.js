import React from "react";
import { useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import { GlobalStyles } from "../constants/style";
import Learn from "../screens/LearnScreen";
import HomeScreen from "../screens/Home/HomeScreen";

import Notification from "../screens/Notification";
import Help from "../screens/Help";
import Favorite from "../screens/FavoriteScreen";
import AboutUs from "../screens/Profile/AboutUs";
import Profile from "../screens/ProfileScreen";
import UserFeedback from "../screens/Profile/UserFeedback";
import ReportDamage from "../screens/Profile/ReportDamage";
import SearchResults from "../screens/SearchResultScreen";
import Search from "../screens/SearchScreen";
import Stepper from "../screens/service_order";

//testing screens
import SignUp1 from "../screens/Auth/SignUp1";
import SignUp2 from "../screens/Auth/SignUp2";
import SignUp3 from "../screens/Auth/SignUp3";
import SignUp4 from "../screens/Auth/SignUp4";
import SignUp5 from "../screens/Auth/SignUp5";
import BoardingScreen1 from "../screens/Auth/BoardingScreen1";
import BoardingScreen2 from "../screens/Auth/BoardingScreen2";
import SearchSection from "../LakshitModule/SearchSection";
import Substantiate from "../LakshitModule/Substantiate";
import WordCategory from "../LakshitModule/WordCategory";
import WordList from "../LakshitModule/WordList";
import Favs from "../LakshitModule/Favs";
import Resist from "../LakshitModule/Resist";
import SwipeList from "../LakshitModule/SwipeList";

import { AuthContext } from "../store/auth-context";

import { Ionicons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import LoginScreen from "../screens/Auth/login";
import SignupScreen from "../screens/Auth/signup";
import OTPPage from "../screens/Auth/otp";

const Stack = createNativeStackNavigator();
const BottomTabs = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

//used for navigating from one screen to other in stack navigation

//stacknavigation

//Authstack
function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="WordCategory"
      screenOptions={{
        animation: "slide_from_right", //<-- this is what will do the trick
        presentation: "card",
        headerStyle: { backgroundColor: "white" },
        headerTintColor: "white",
        contentStyle: { backgroundColor: "white" },
      }}
    >
      {/* <Stack.Screen name="Login" component={GoogleSignIn} options={{ headerShown: false }} /> */}

      {/* Lakshit Testing Stack Screen  ----------------------------------------*/}
      <Stack.Screen
        name="TopTab"
        component={TopTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Boarding1"
        component={BoardingScreen1}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Boarding2"
        component={BoardingScreen2}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SearchSection"
        component={SearchSection}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Substantiate"
        component={Substantiate}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="WordCategory"
        component={WordCategory}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="WordList"
        component={WordList}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Favs"
        component={Favs}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Resist"
        component={Resist}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="SwipeList"
        component={SwipeList}
        options={{ headerShown: false }}
      />
      {/* --------------------------------------------------------------- */}

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="OTP"
        component={OTPPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Signup"
        component={SignupScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

//TopTabNavigator

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

function NotificationsStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Notification"
        component={Notification}
        options={{
          title: "Notification",
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary800,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function HelpStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Help"
        component={Help}
        options={{
          title: "Help",
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary800,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function AboutStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="About"
        component={AboutUs}
        options={{
          title: "About",
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary800,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function FeedbackStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feedback"
        component={UserFeedback}
        options={{
          title: "Feedback",
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary800,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function ReportDamageStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Report Damage"
        component={ReportDamage}
        options={{
          title: "Report Damage",
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary800,
          },
        }}
      />
    </Stack.Navigator>
  );
}

function ServiceStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Service"
        component={Stepper}
        options={{
          title: "Service",
          headerTitleStyle: {
            color: "#fff",
          },
          headerStyle: {
            backgroundColor: GlobalStyles.colors.primary800,
          },
        }}
      />
    </Stack.Navigator>
  );
}
//Authenticated stack

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
        name="Favorite"
        component={Favorite}
        options={{
          title: "Favorites",
          headerShown: false,
          tabBarHideOnKeyboard: true,
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
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

function AuthenticatedStack() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          animation: "slide_from_right", //<-- this is what will do the trick
          presentation: "card",
          cardStyleInterpolator: ({ current, layouts }) => {
            return {
              cardStyle: {
                transform: [
                  {
                    translateX: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.width, 0],
                    }),
                  },
                ],
              },
            };
          },
          cardStyle: { backgroundColor: "transparent" },
          transitionSpec: {
            open: { animation: "timing", config: { duration: 150 } }, // Adjust the duration as needed
            close: { animation: "timing", config: { duration: 150 } }, // Adjust the duration as needed
          },
        }}
      >
        <Stack.Screen
          name="ExpensesOverview"
          component={BottomTabNavigationfun}
          options={{ headerShown: false }}
        />

        <Stack.Screen
        name="SearchSection"
        component={SearchSection}
        options={{ headerShown: false }}
      />
      
      <Stack.Screen
        name="Substantiate"
        component={Substantiate}
        options={{ headerShown: false }}
      />
        

        <Stack.Screen
          name="SearchResults"
          component={SearchResults}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Search"
          component={Search}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Notification"
          component={NotificationsStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Help"
          component={HelpStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="About"
          component={AboutStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Feedback"
          component={FeedbackStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Report Damage"
          component={ReportDamageStack}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Service"
          component={ServiceStack}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

//navigation
function Navigation() {
  const authCtx = useContext(AuthContext);

  return (
    <NavigationContainer>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}

export default Navigation;
