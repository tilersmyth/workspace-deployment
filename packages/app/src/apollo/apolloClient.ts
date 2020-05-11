import {
  ApolloClient,
  HttpLink,
  ApolloLink,
  concat,
  InMemoryCache,
} from "@apollo/client";
import { AsyncStorage } from "react-native";

import { API_HOST, COOKIE_NAME } from "../utils/expo-env";

const httpLink = new HttpLink({ uri: API_HOST });

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext({
    headers: {
      authorization: AsyncStorage.getItem(COOKIE_NAME) || null,
    },
  });

  return forward(operation);
});

export default new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});
