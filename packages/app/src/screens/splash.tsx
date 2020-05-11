import React from "react";
import { ActivityIndicator, SafeAreaView } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";

interface Props {
  navigation: StackNavigationProp<{}>;
}

export const SplashScreen: React.FunctionComponent<Props> = ({
  navigation,
}) => {
  navigation.setOptions({ headerTitle: "Loading..." });
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};
