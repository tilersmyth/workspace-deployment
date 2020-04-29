import Link from "next/link";
import Layout from "../components/Layout";

import { withApollo } from "../apollo/config/withApollo";
import { withAuth } from "../auth/withAuth";

const IndexPage = () => (
  <Layout title="Home | Next.js + TypeScript Example">
    <h1>Hello Next.js 👋</h1>
    <p>
      <Link href="/about">
        <a>About</a>
      </Link>
    </p>
  </Layout>
);

export default withApollo()(withAuth()(IndexPage));
