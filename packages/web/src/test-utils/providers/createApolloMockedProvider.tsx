import React from "react";
import {
  makeExecutableSchema,
  addMockFunctionsToSchema,
  ITypeDefinitions,
} from "graphql-tools";
import {
  ApolloCache,
  ApolloClient,
  ApolloLink,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import { onError } from "@apollo/link-error";
import { SchemaLink } from "apollo-link-schema";

import { ApolloMockedProviderOptions } from "./types";

export const createApolloMockedProvider = (
  typeDefs: ITypeDefinitions,
  { cache: globalCache, provider }: ApolloMockedProviderOptions = {}
) => ({
  customResolvers = {},
  cache,
  children,
}: {
  customResolvers?: any;
  children: React.ReactChild | JSX.Element;
  cache?: ApolloCache<any>;
}) => {
  const schema = makeExecutableSchema({
    typeDefs,
    resolverValidationOptions: { requireResolversForResolveType: false },
  });

  addMockFunctionsToSchema({ schema, mocks: customResolvers });

  const client = new ApolloClient({
    link: ApolloLink.from([
      onError(() => {}),
      (new SchemaLink({ schema }) as unknown) as ApolloLink,
    ]),
    cache: cache || globalCache || new InMemoryCache(),
    defaultOptions: {
      mutate: { errorPolicy: "all" },
    },
  });

  const Provider = provider ? provider : ApolloProvider;
  return <Provider client={client}>{children}</Provider>;
};
