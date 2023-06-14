// AuthProvider.js
import React from 'react';
import { MsalProvider } from '@azure/msal-react';
import { msalConfig } from './msalConfig';
import { PublicClientApplication } from '@azure/msal-browser';

const msalInstance = new PublicClientApplication(msalConfig);

const AuthProvider = ({ children }) => {
  return <MsalProvider instance={msalInstance}>{children}</MsalProvider>;
};

export default AuthProvider;
