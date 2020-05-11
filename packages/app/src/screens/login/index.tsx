import React from "react";
import { Text, SafeAreaView, View, Dimensions, Button } from "react-native";
import { NavigationHelpers } from "@react-navigation/native";

import LoginForm from "./components/Form";

type ParamList = {
  Register: undefined;
  Admin: undefined;
};

interface Props {
  navigation: NavigationHelpers<ParamList>;
}

export const LoginScreen: React.FunctionComponent<Props> = ({ navigation }) => {
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
          Login
        </Text>
        <LoginForm onSuccess={() => navigation.navigate("Admin")} />
        <Button
          color="#999999"
          title="Need an account? Register here"
          onPress={() => navigation.navigate("Register")}
        />
      </View>
    </SafeAreaView>
  );
};
