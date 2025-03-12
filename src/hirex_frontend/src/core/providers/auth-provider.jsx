import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthClient } from "@dfinity/auth-client";
import { Actor, HttpAgent } from "@dfinity/agent";
// import { hirex_backend } from "declarations/hirex_backend";
import { getInternetIdentityNetwork } from "@/core/utils/canisterUtils";
import { useNavigate } from "react-router";
import { hirex_backend } from "../utils/agentUtils";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [authClient, setAuthClient] = useState(null);
  const [identity, setIdentity] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const initAuth = async () => {
      const client = await AuthClient.create();
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

      // Check user from smartcontract
      const principal = newIdentity.getPrincipal();
      const user = await hirex_backend.login(principal);
      setUser(user);
      setIsLoading(false);

      if (user.ok.is_registered === 0) {
        // navigate("/register");
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
    if (!authClient) return;
    await authClient.logout();
    setIdentity(null);
    setUser(null);
    setIsAuthenticated(false);
    navigate("/get-started");
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, identity, login, logout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
