import React, { useState, useEffect } from "react";

let logoutTimer: number;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, time) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime(); //gettime converts to milliseconds for usecallback

  const remainingDuration = expirationTime - currentTime; //new Date(expirationTime).getTime() for expirationTime stored in a new constant
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationTime);

  if (remainingTime <= 6000) {
    localStorage.clear();
    return null;
  }
  return {
    token: storedToken,
    remainingTime,
  };
};

export const AuthContextProvider = (props) => <>{props.children}</>;

export const BrokenAuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const isLoggedIn = !!token;

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  };

  const handleLogin = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(handleLogout, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log("useEffect", tokenData.remainingTime);
      logoutTimer = setTimeout(handleLogout, tokenData.remainingTime);
    }
  }, [tokenData]);
  const contextValue = {
    token,
    isLoggedIn,
    login: handleLogin,
    logout: handleLogout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
