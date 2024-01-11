import AsyncStorage from '@react-native-async-storage/async-storage';
import {v4 as uuidv4 } from 'uuid'
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext({
  token: '',
  contact:'',
  userid:'',
  isAuthenticated: false,
  authenticate: (token) => {},
  authenticateContact:(contact)=>{},
  authenticateUserId:(userid)=>{},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [authToken, setAuthToken] = useState();
  const [authContact, setContact] = useState();
  const [authUserID, setUserID] = useState();

  
  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }

  function authenticateContact (contact) {
     setContact(contact);
      AsyncStorage.setItem('contact', contact);
}

  function authenticateUserId (userid) {
    setUserID(userid)
    console.log('auth id data',userid)
    AsyncStorage.setItem('userid',userid);
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem("@user");
  }

  const value = {
    token: authToken,
    contact:authContact,
    userid:authUserID,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    authenticateContact:authenticateContact,
    authenticateUserId:authenticateUserId,
    logout: logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthContextProvider;