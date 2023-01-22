import React, { useEffect, useState, createContext } from 'react';
import { me } from '../api/auth';

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [token, settoken] = useState(''); //initially token is an empty string.
  //if the empty string is found we should be logged out.
  const [shouldUpdate, setShouldUpdate] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    settoken(localStorage['juice-token'] || '');
    if (!localStorage['juice-token']) {
      const getMe = async () => {
        const result = await me(localStorage['juice-token']);
        setUser(result);
      };
      getMe();
    }
  }, [shouldUpdate]);

  const updateAuthStatus = () => setShouldUpdate(!shouldUpdate);

  const logout = () => {
    delete localStorage['juice-token'];
    updateAuthStatus();
  };

  const providerValue = {
    token,
    isLoggedIn: !!token,
    logout,
    updateAuthStatus,
    user,
  };

  return (
    <AuthContext.Provider value={providerValue}>
      {children}
    </AuthContext.Provider>
  );
}
