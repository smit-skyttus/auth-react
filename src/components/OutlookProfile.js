// OutlookProfile.js
import React, { useEffect, useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { PublicClientApplication } from '@azure/msal-browser';
import { Client } from '@microsoft/microsoft-graph-client';
import { msalConfig } from '../Auth/msalConfig';

const OutlookProfile = () => {
  const { accounts } = useMsal();
  const [userProfile, setUserProfile] = useState(null);

  console.log(accounts);
  useEffect(() => {
    if (accounts.length > 0) {
      const msalInstance = new PublicClientApplication(msalConfig);

      const graphClient = Client.init({
        authProvider: async (done) => {
          const tokenRequest = {
            scopes: ['user.read'],
            account: accounts[0],
          };

          try {
            const response = await msalInstance.acquireTokenSilent(tokenRequest);
            done(null, response.accessToken);
          } catch (error) {
            console.error('Error acquiring token:', error);
            done(error, null);
          }
        },
      });

      graphClient
        .api('/me')
        .get()
        .then((response) => {
          setUserProfile(response);
        })
        .catch((error) => {
          console.error('Error getting user profile:', error);
        });
    }
  }, [accounts]);

  return (
    <div>
      <h2>User Profile</h2>
      {userProfile ? (
        <div>
          <p>Name: {userProfile.displayName}</p>
          <p>Email: {userProfile.mail}</p>
        </div>
      ) : (
        <p>Login to retrieve profile information</p>
      )}
    </div>
  );
};

export default OutlookProfile;
