import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../screens/login";
import { RegisterScreen } from "../screens/register";

const Stack = createStackNavigator<any>();

export const AuthNavigator = () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: "Login" }}
      />
      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ headerTitle: "Register" }}
      />
    </Stack.Navigator>
  );
};
