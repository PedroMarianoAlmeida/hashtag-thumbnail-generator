"use client";
import { Amplify } from "aws-amplify";
import { Authenticator, withAuthenticator } from "@aws-amplify/ui-react";
import awsExports from "./../aws-exports";

Amplify.configure(awsExports);

import "@aws-amplify/ui-react/styles.css";
export const AuthenticatorAws = () => <Authenticator></Authenticator>;
