import React from "react";
import Link from "next/link";

import Layout from "../../components/Layout";
import RegisterForm from "./_components/Form";
import { withApollo } from "../../apollo/config/withApollo";
import { withAuth } from "../../auth/withAuth";

const RegisterPage: React.FunctionComponent = () => (
  <Layout title="Register | Next.js + TypeScript Example">
    <h1>Register</h1>
    <RegisterForm />
    <p>
      <Link href="/login">
        <a>Already have an account? Login here</a>
      </Link>
    </p>
  </Layout>
);

export default withApollo()(withAuth()(RegisterPage));
