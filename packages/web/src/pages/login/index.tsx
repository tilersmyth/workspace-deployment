import React from "react";
import Link from "next/link";

import Layout from "../../components/Layout";
import LoginForm from "./_components/Form";
import { withApollo } from "../../apollo/config/withApollo";
import { withAuth } from "../../auth/withAuth";

const LoginPage: React.FunctionComponent = () => (
  <Layout title="Login | Next.js + TypeScript Example">
    <h1>Login</h1>
    <LoginForm />
    <p>
      <Link href="/register">
        <a>Need an account? Register here</a>
      </Link>
    </p>
  </Layout>
);

export default withApollo()(withAuth()(LoginPage));
