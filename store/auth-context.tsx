import React, { useState, useEffect, FC } from "react";
import { useRouter } from "next/router";

let logoutTimer: ReturnType<typeof setTimeout>;

interface AuthContext {
  token: string | null;
  isLoggedIn: boolean;
  login: (token: string, time: number) => void;
  logout: () => void;
}

const AuthContext = React.createContext<AuthContext>({
  token: "",
  isLoggedIn: false,
  login: () => { },
  logout: () => { },
});

const calculateRemainingTime = (expirationTime: number) => {
  const currentTime = new Date().getTime();

  const remainingDuration = expirationTime - currentTime;
  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationTime = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(Number(storedExpirationTime));

  if (remainingTime <= 6000) {
    // if (remainingTime <= 59 * 60 * 1000) {
    localStorage.clear();
    return null;
  }
  return {
    token: storedToken,
    remainingTime,
  };
};

export const AuthContextProvider: FC = (props) => {
  const ssr = typeof window === "undefined";
  if (ssr) {
    return <>{props.children}</>;
  }
  const router = useRouter()

  const tokenData = retrieveStoredToken();
  let initialToken: null | string = null;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);
  const isLoggedIn = Boolean(token);

  const handleLogout = () => {
    setToken(null);
    localStorage.clear();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    router.push("/")
  };

  const handleLogin = (token: string, expirationTime: number) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime.toString());

    const storedToken = localStorage.getItem("token");

    const remainingTime = calculateRemainingTime(expirationTime);

    logoutTimer = setTimeout(handleLogout, remainingTime);

  };

  useEffect(() => {
    if (tokenData) {
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

