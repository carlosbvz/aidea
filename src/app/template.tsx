"use client";

import { Amplify } from "aws-amplify";
import { withAuthenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsconfig from "../aws-exports";

Amplify.configure({ ...awsconfig, ssr: true });

function Template({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

export default withAuthenticator(Template);
