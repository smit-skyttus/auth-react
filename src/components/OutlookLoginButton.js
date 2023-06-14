// OutlookLoginButton.js
import React, { useState } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';

const OutlookLoginButton = () => {

 
  const navigate = useNavigate();
  const[account,setAccount] = useState(false);
  const { instance } = useMsal();
  const handleLogout = async () => {
    instance.logout();
    };

  const handleLogin = async () => {
    const loginRequest = {
      scopes: ['user.read', 'Mail.Read'],
     
    };

    try {
      await instance.loginPopup(loginRequest).then((res)=>{
        // console.log(res.accessToken);
        localStorage.setItem('token', res.accessToken);
        setAccount(true);
        navigate('/home');
      });
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <>
    {account ? ( <button onClick={handleLogout}>LogOut with Outlook</button>) : 
    (
    <button onClick={handleLogin}>Login with Outlook</button>
    )}
    
   
    </>
  );
};

export default OutlookLoginButton;
