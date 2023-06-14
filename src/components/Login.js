import React from 'react';
import AuthProvider from '../Auth/AuthProvider';
import OutlookLoginButton from './OutlookLoginButton';
import OutlookProfile from './OutlookProfile';
import Home from './Home';


const Login = () => {
  return (
    <AuthProvider>
      <div>
        <h1>Microsoft Outlook Login </h1>
        <OutlookLoginButton />
        {/* <Home/> */}
        <OutlookProfile />
      </div>
    </AuthProvider>
  )
}

export default Login        