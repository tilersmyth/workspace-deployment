import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { useQuery } from "@apollo/client";

import { MeDocument, MeQuery } from "../apollo/generated";
import { AuthNavigator } from "./auth-navigator";
import { SplashScreen } from "../screens/splash";
import { AdminScreen } from "../screens/admin";

type AppNavigatorParams = {
  Admin: undefined;
  Splash: undefined;
  Auth: undefined;
};

const Stack = createStackNavigator<AppNavigatorParams>();

type StackNavigatorProps = React.ComponentProps<typeof Stack.Navigator>;

export const RootNavigator = (
  props: Partial<StackNavigatorProps>
): React.ReactElement => {
  const { data, loading } = useQuery<MeQuery>(MeDocument);

  return (
    <Stack.Navigator {...props} mode="modal">
      {loading && (
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerTitle: "Loading" }}
        />
      )}

      {!loading && data && data.me ? (
        <Stack.Screen
          name="Admin"
          options={{ headerShown: false }}
          component={AdminScreen}
        />
      ) : (
        <Stack.Screen
          name="Auth"
          options={{ headerShown: false }}
          component={AuthNavigator}
        />
      )}
    </Stack.Navigator>
  );
};
