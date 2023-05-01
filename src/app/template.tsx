"use client";

import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "../aws-exports";
import Nav from "@organisms/Nav";

Amplify.configure({ ...awsconfig, ssr: true });

function Template({ children }: { children: React.ReactElement }) {
  return (
    <>
      <Nav />
      <div className="container max-w-screen-xxl mx-auto px-4 my-8">
        {children}
      </div>
    </>
  );
}

export default withAuthenticator(Template);
