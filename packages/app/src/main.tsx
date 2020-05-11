import React from "react";
import { NavigationContainer } from "@react-navigation/native";

import { RootNavigator } from "./navigation/root-navigator";

export const Main: React.FunctionComponent = () => (
  <NavigationContainer>
    <RootNavigator />
  </NavigationContainer>
);
