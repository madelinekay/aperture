import React from "react";
import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";

import { UserContextProvider } from "../store/user-context";
import { AuthContextProvider } from "../store/auth-context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <UserContextProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </UserContextProvider>
    </AuthContextProvider>
  );
}
export default MyApp;
