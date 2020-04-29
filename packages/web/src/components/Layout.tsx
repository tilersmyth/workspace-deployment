import * as React from "react";
import Link from "next/link";
import Head from "next/head";
import { useQuery, useMutation } from "@apollo/client";
import Router from "next/router";

import {
  MeDocument,
  MeQuery,
  LogoutDocument,
  LogoutMutation,
  LogoutMutationVariables,
} from "../apollo/generated";

type Props = {
  title?: string;
};

const Layout: React.FunctionComponent<Props> = ({
  children,
  title = "This is the default title",
}) => {
  const { data, loading } = useQuery<MeQuery>(MeDocument);
  const [logout] = useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );

  const onLogout = async (
    e: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    e.stopPropagation();

    await logout({
      async update(cache) {
        cache.writeQuery<MeQuery>({
          query: MeDocument,
          data: { me: null },
        });
        Router.push("/login");
      },
    });
  };

  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <header>
        <nav>
          <Link href="/">
            <a>Home</a>
          </Link>{" "}
          |{" "}
          <Link href="/about">
            <a>About</a>
          </Link>{" "}
          | {loading && <span>loading...</span>}
          {!loading && data && data.me && (
            <a href="#" onClick={onLogout}>
              Logout
            </a>
          )}
          {!loading && data && !data.me && (
            <Link href="/login">
              <a>Login</a>
            </Link>
          )}
        </nav>
      </header>
      {children}
      <footer>
        <hr />
        <span>I'm here to stay (Footer)</span>
      </footer>
    </div>
  );
};

export default Layout;
