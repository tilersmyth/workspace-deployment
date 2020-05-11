import React from "react";
import { View, Text, SafeAreaView, Button, AsyncStorage } from "react-native";
import { NavigationHelpers } from "@react-navigation/native";
import { useQuery, useMutation } from "@apollo/client";

import {
  MeQuery,
  MeDocument,
  MeQueryVariables,
  LogoutMutation,
  LogoutMutationVariables,
  LogoutDocument,
} from "../../apollo/generated";
import { COOKIE_NAME } from "../../utils/expo-env";

type ParamList = {
  Login: undefined;
};

interface Props {
  navigation: NavigationHelpers<ParamList>;
}

export const AdminScreen: React.FunctionComponent<Props> = ({ navigation }) => {
  const { loading, error, data } = useQuery<MeQuery, MeQueryVariables>(
    MeDocument
  );
  const [logout] = useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );

  const onLogout = async () => {
    await logout({
      async update(cache) {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: null },
        });

        await AsyncStorage.removeItem(COOKIE_NAME);
        navigation.navigate("Login");
      },
    });
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error || !data) {
    return <Text>Error loading user</Text>;
  }

  if (!data.me) {
    return null;
  }

  const { me } = data;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ marginTop: 50, padding: 20 }}>
        <Text>
          Logged in as {me.first_name} {me.last_name}
        </Text>

        <Button title="Logout" onPress={onLogout} />
      </View>
    </SafeAreaView>
  );
};
