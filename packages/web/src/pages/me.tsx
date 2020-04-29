import React from "react";
import { NextPage } from "next";

import Layout from "../components/Layout";
import { withApollo } from "../apollo/config/withApollo";
import { withAuth } from "../auth/withAuth";
import { UserEntity } from "../apollo/generated";

interface Props {
  user?: Partial<UserEntity>;
}

const MePage: NextPage<Props> = ({ user }) => {
  return (
    <Layout title="Me | Next.js + TypeScript Example">
      <h1>Me</h1>
      {!user && <p>Error loading user</p>}
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </Layout>
  );
};

export default withApollo()(withAuth()(MePage));
