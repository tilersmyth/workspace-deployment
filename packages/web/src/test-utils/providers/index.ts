import { createApolloMockedProvider } from "./createApolloMockedProvider";
import { createApolloErrorProvider } from "./createApolloErrorProvider";
import { createApolloLoadingProvider } from "./createApolloLoadingProvider";

import { typeDefs } from "../../apollo/generated";

export const ApolloMockedProvider = createApolloMockedProvider(typeDefs);
export const ApolloErrorProvider = createApolloErrorProvider();
export const ApolloLoadingProvider = createApolloLoadingProvider();
