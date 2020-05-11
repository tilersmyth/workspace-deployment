import React from "react";
import { ApolloProvider } from "@apollo/client";
import { SafeAreaProvider } from "react-native-safe-area-context";

import ApolloClient from "./src/apollo/apolloClient";
import { Main } from "./src/main";

export default () => (
  <SafeAreaProvider>
    <ApolloProvider client={ApolloClient}>
      <Main />
    </ApolloProvider>
  </SafeAreaProvider>
);
