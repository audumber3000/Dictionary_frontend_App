import React from "react";
import { useContext } from "react";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { AuthContext } from "../store/auth-context";
import { AuthStack, AuthenticatedStack } from "./stack";

//used for navigating from one screen to other in stack navigation

//stacknavigation

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
