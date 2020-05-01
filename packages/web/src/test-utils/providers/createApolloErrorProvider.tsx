import React from "react";
import {
  ApolloCache,
  ApolloLink,
  Observable,
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { GraphQLError } from "graphql";

import { ApolloMockedProviderOptions } from "./types";

interface Props {
  graphQLErrors: GraphQLError[];
  cache?: ApolloCache<any>;
  children: React.ReactNode | JSX.Element;
}

export const createApolloErrorProvider = ({
  cache: globalCache,
  provider,
}: ApolloMockedProviderOptions = {}) => ({
  graphQLErrors,
  cache,
  children,
}: Props) => {
  // Link always returns the specified error if provided
  const link = new ApolloLink(() => {
    return new Observable((observer) => {
      observer.next({
        errors: graphQLErrors || [
          { message: "Unspecified error from ErrorProvider." },
        ],
      });
      observer.complete();
    });
  }) as any;

  const client = new ApolloClient({
    link,
    cache: cache || globalCache || new InMemoryCache(),
  });

  const Provider = provider ? provider : ApolloProvider;
  return <Provider client={client}>{children}</Provider>;
};
