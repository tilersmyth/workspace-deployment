import { ApolloCache } from "@apollo/client";
import { ApolloProviderProps } from "@apollo/client/react/context/ApolloProvider";

export interface ApolloMockedProviderOptions {
  cache?: ApolloCache<any>;
  provider?: React.ComponentType<ApolloProviderProps<any>>;
}
