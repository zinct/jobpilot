import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor } from "@dfinity/agent";
import { useNavigate } from "react-router";
import { getInternetIdentityNetwork } from "@/core/utils/canisterUtils";
import { hirex_backend } from "../../../../declarations/hirex_backend";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [authClient, setAuthClient] = useState(null);
  const [user, setUser] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create({
        identityProvider: getInternetIdentityNetwork(),
      });
      setAuthClient(client);
      await updateIdentity(client);
    };
    initAuth();
  }, []);

  const updateIdentity = async (client) => {
    const authenticated = await client.isAuthenticated();

    setIsAuthenticated(authenticated);
    if (authenticated) {
      const newIdentity = client.getIdentity();
      setIdentity(newIdentity);
      Actor.agentOf(hirex_backend).replaceIdentity(newIdentity);
      const userResponse = await hirex_backend.login();
      setIsLoading(false);

      if ("ok" in userResponse) {
        setUser(userResponse.ok);

        if (userResponse.ok.is_registered[0] === 0) {
          navigate("/register");
        }
      } else if ("err" in userResponse) {
        console.log("Error:", userResponse.err);
      }
    } else {
      setIsLoading(false);
    }
  };

  const login = async () => {
    if (!authClient) return;
    await new Promise((resolve, reject) =>
      authClient.login({
        identityProvider: getInternetIdentityNetwork(),
        onSuccess: resolve,
        onError: reject,
      })
    );
    await updateIdentity(authClient);
  };

  const logout = async () => {
    await authClient.logout();
    setUser(null);
    setIsAuthenticated(false);
    window.localStorage.removeItem("identity");
    navigate("/get-started");
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        login,
        identity,
        logout,
        isLoading,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
