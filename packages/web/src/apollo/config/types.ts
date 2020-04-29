import { NextPageContext } from "next";
import { AppContext } from "next/app";
import { ApolloClient, NormalizedCacheObject } from "@apollo/client";

import { UserEntity } from "../generated";

export interface WithApolloParams {
  apolloClient: ApolloClient<NormalizedCacheObject>;
  apolloState: NormalizedCacheObject;
}

type NextContextWithApollo = NextPageContext & AppContext & WithApolloParams;

export interface NextPageContextWithApollo extends NextContextWithApollo {
  ctx: NextPageContextWithApollo;
  user?: Partial<UserEntity>;
}
