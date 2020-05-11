import React from "react";
import { View, Text, Dimensions, SafeAreaView, Button } from "react-native";
import { NavigationHelpers } from "@react-navigation/native";

import RegisterForm from "./components/Form";

type ParamList = {
  Login: undefined;
};

interface Props {
  navigation: NavigationHelpers<ParamList>;
}

export const RegisterScreen: React.FunctionComponent<Props> = ({
  navigation,
}) => {
  const { height } = Dimensions.get("window");

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: height * 0.2, padding: 10 }}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          Register
        </Text>
        <RegisterForm onSuccess={() => navigation.navigate("Login")} />
        <Button
          color="#999999"
          title="Already have an account? Login here"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </SafeAreaView>
  );
};
