import { NextPage } from "next";
import App from "next/app";

import { MeQuery, MeDocument, UserEntity } from "../apollo/generated";
import { NextPageContextWithApollo } from "../apollo/config/types";
import { redirect } from "../utils/redirect";

const nonAuthPages = ["/register", "/login"];
const authPages = ["/me"];

interface Props {
  user?: Partial<UserEntity>;
}

/**
 * withAuth HOC
 * provides route protection and redirection
 */
export const withAuth = () => (PageComponent: NextPage): NextPage<Props> => {
  const WithAuth = (pageProps: any): any => {
    return <PageComponent {...pageProps} />;
  };

  WithAuth.getInitialProps = async (
    ctx: NextPageContextWithApollo
  ): Promise<object> => {
    const inAppContext = Boolean(ctx.ctx);

    // Query current user
    const { data } = await ctx.apolloClient.query<MeQuery>({
      query: MeDocument,
    });

    if (data && data.me) {
      ctx.user = data.me;
    }

    // Load props
    let pageProps = {};
    if (PageComponent.getInitialProps) {
      pageProps = await PageComponent.getInitialProps(ctx);
    } else if (inAppContext) {
      pageProps = await App.getInitialProps(ctx);
    }

    // Current page is nonAuthPage
    if (nonAuthPages.includes(ctx.pathname)) {
      // Continue if not auth on nonAuth page
      if (!data || !data.me) {
        return pageProps;
      }

      // Redirect to authPage
      redirect(ctx, "/me");
      return {};
    }

    // Current page is authPage
    if (authPages.includes(ctx.pathname)) {
      // Redirect if not auth on authPage
      if (!data || !data.me) {
        redirect(ctx, "/register");
        return {};
      }

      // Continue if auth on authPage
      return { ...pageProps, user: data.me };
    }

    // Continue if not auth/nonAuth page
    return pageProps;
  };

  return WithAuth;
};
