import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  NormalizedCacheObject,
  createHttpLink,
} from "@apollo/client";
import { onError } from "@apollo/link-error";
import { setContext } from "@apollo/link-context";
import fetch from "isomorphic-unfetch";
import Router from "next/router";
import { IncomingMessage } from "http";
import cookie, { CookieParseOptions } from "cookie";

import { NextPageContextWithApollo } from "./types";

const parseCookies = (
  req?: IncomingMessage,
  options: CookieParseOptions = {}
) => {
  return cookie.parse(
    req ? req.headers.cookie || "" : document.cookie,
    options
  );
};

export default function createApolloClient(
  initialState: NormalizedCacheObject,
  ctx?: NextPageContextWithApollo
) {
  const errLink = onError(({ graphQLErrors }) => {
    if (graphQLErrors) {
      const notAuth = graphQLErrors.filter(({ message }) =>
        Object.entries(message).some(
          ([key, val]: any) => key === "statusCode" && val === 403
        )
      );

      if (typeof window !== "undefined" && notAuth.length > 0) {
        Router.replace("/register");
      }
    }
  });

  const httpLink = createHttpLink({
    uri: process.env.API_URL,
    credentials: "include",
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    const token = parseCookies(ctx && ctx.req).sid;

    return {
      headers: {
        ...headers,
        cookie: token ? `sid=${token}` : "",
      },
    };
  });

  // The `ctx` (NextPageContext) will only be present on the server.
  // use it to extract auth headers (ctx.req) or similar.
  return new ApolloClient({
    ssrMode: Boolean(ctx),
    link: ApolloLink.from([errLink, authLink, httpLink]),
    cache: new InMemoryCache().restore(initialState),
  });
}
