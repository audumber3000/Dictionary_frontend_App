import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BackHandler, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { GlobalStyles } from "../constants/style";
import Help from "../screens/Help";
import Favorite from "../screens/FavoriteScreen";
import AboutUs from "../screens/Profile/AboutUs";
import Profile from "../screens/ProfileScreen";
import UserFeedback from "../screens/Profile/UserFeedback";
import ReportDamage from "../screens/Profile/ReportDamage";
import SearchResults from "../screens/SearchResultScreen";
import Search from "../screens/Home/Dictionary/SearchScreen";
import Stepper from "../screens/service_order";
//testing screens
import SignUp1 from "../screens/Auth/SignUp1";
import SignUp2 from "../screens/Auth/SignUp2";
import SignUp3 from "../screens/Auth/SignUp3";
import SignUp4 from "../screens/Auth/SignUp4";
import SignUp5 from "../screens/Auth/SignUp5";
import BoardingScreen1 from "../screens/Auth/BoardingScreen1";
import BoardingScreen2 from "../screens/Auth/BoardingScreen2";
import Substantiate from "../screens/Home/Dictionary/Substantiate";
import WordList from "../screens/Home/Dictionary/WordList";
import Resist from "../screens/Home/Quiz/Resist";
import SwipeList from "../screens/Home/Dictionary/SwipeList";
import Plans from "../LakshitModule/Plans";
import NotificationPermission from "../components/HomeScreenComp/notificationPermission";
import ContactPermission from "../components/HomeScreenComp/contactPermission";
import NewNotification from "../screens/NewNotification";
import LoginOptions from "../screens/Auth/loginOptions";
import LoginScreen from "../screens/Auth/login";
import SignupScreen from "../screens/Auth/signup";
import OTPPage from "../screens/Auth/otp";
import TagScreen from "../screens/Home/Dictionary/TagScreen";
import Quiz from "../screens/Home/Quiz/Quiz";
import Instructions from "../screens/Home/Quiz/Instructions";
import { BottomTabNavigationfun } from "./bottomTab";
import { LeadBoard, TopTabNavigation } from "./topTab";
import Result from "../screens/Home/Quiz/Result";
const Stack = createNativeStackNavigator();

function AuthStack() {
  
  return (
    <Stack.Navigator
      initialRouteName="LoginOptions"
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
        name="Favorite"
        component={Favorite}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Plans"
        component={Plans}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
          name="NewNotify"
          component={NewNotify}
          options={{ headerShown: false }}
          /> */}

      <Stack.Screen
        name="Sheets"
        component={NotificationPermission}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="TurnContact"
        component={ContactPermission}
        options={{ headerShown: false }}
      />
      {/* --------------------------------------------------------------- */}

      <Stack.Screen
        name="LoginOptions"
        component={LoginOptions}
        options={{ headerShown: false }}
      />

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

function NotificationsStack() {
  return (
    <Stack.Navigator>
      {/* <Stack.Screen
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
        /> */}
      <Stack.Screen
        name="NewNotification"
        component={NewNotification}
        options={{ headerShown: false }}
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

        {/* <Stack.Screen
          name="SearchSection"
          component={SearchSection}
          options={{ headerShown: false }}
        /> */}

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
        <Stack.Screen
          name="Substantiate"
          component={Substantiate}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="WordList"
          component={WordList}
          options={{ headerShown: false,animation:"slide_from_bottom" }}
        />
        {/* new added screen (Tag Screen) */}
        <Stack.Screen
          name="TagScreen"
          component={TagScreen}
          options={{ headerShown: false,animation:"slide_from_bottom" }}
        />
        <Stack.Screen
          name="Resist"
          component={Resist}
          options={{ headerShown: false }}
        />
        {/* new added screen (Quiz) */}
        <Stack.Screen
          name="Quiz"
          component={Quiz}
          options={{ headerShown: false }}
        />
        {/* new added screen (Quiz) */}
        <Stack.Screen
          name="Instructions"
          component={Instructions}
          
          options={{
            headerShown: false,
            animation:"slide_from_right"
          }}
        />
        <Stack.Screen
          name="Result"
          component={Result}

          options={{
            headerTransparent: true,
            animation:"slide_from_right",
            headerBackVisible: true,
            headerTintColor: 'black',
            headerTitle:''
          }}
        />

        <Stack.Screen
          name="SwipeList"
          component={SwipeList}
          options={{ headerShown: false,animation:"slide_from_bottom" }}
        />

        <Stack.Screen
          name="LeadBoard"
          component={LeadBoard}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </>
  );
}

export { AuthenticatedStack, AuthStack };
