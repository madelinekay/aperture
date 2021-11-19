import React, { useState, useEffect } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token, time) => { },
  logout: () => { },
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

  if (remainingTime <= 59 * 60 * 1000) {
    localStorage.clear();
    return null;
  }
  return {
    token: storedToken,
    remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const ssr = typeof window === "undefined";
  if (ssr) {
    return props.children;
  }

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

    window.location.href = "/";
  };

  const handleLogin = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    console.log("handleLogin token", token);
    const storedToken = localStorage.getItem("token");
    console.log("storedtoken", storedToken);

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(handleLogout, remainingTime);
  };

  console.log("token", token);

  useEffect(() => {
    if (tokenData) {
      console.log("useEffect", tokenData.remainingTime);
      logoutTimer = setTimeout(handleLogout, tokenData.remainingTime);
      console.log("here we should load user data using token", tokenData.token);
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

