import React from "react";
import {
  ApolloCache,
  ApolloLink,
  Observable,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";

import { ApolloMockedProviderOptions } from "./types";

export const createApolloLoadingProvider = ({
  cache: globalCache,
  provider,
}: ApolloMockedProviderOptions = {}) => ({
  children,
  cache,
}: {
  children: React.ReactChild | JSX.Element;
  cache?: ApolloCache<any>;
}) => {
  const link = new ApolloLink(() => {
    return new Observable(() => {});
  });

  const client = new ApolloClient({
    link,
    cache: cache || globalCache || new InMemoryCache(),
  });

  const Provider = provider ? provider : ApolloProvider;
  return <Provider client={client}>{children}</Provider>;
};
