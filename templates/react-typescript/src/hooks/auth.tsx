import api from "../services/api";
import jwt_decode from "jwt-decode";
interface AuthInterface {
  getToken: () => string;
  signIn: (username: string, password: string) => Promise<void>;
  signUp: (username: string, password: string) => Promise<void>;
  signOut: () => void;
  isAuthenticated: () => boolean;
}

export const useAuth = (): AuthInterface => {
  return useProvideAuth();
};

function useProvideAuth() {
  const signIn = async (username: string, password: string) => {
    const { data } = await api.post("/login", {
      username: username,
      password: password
    });
    localStorage.setItem("@token", data);
  };

  const signUp = async (username: string, password: string) => {
    await api.post("/signup", {
      username: username,
      password: password
    });
  };

  const signOut = () => {
    localStorage.removeItem("@token");
  };

  const getToken = () => {
    const token = localStorage.getItem("@token") || "";
    return token;
  };

  const isAuthenticated = () => {
    const token = getToken();
    if (token) {
      const { exp } = jwt_decode<{ exp: number }>(token);
      if (Date.now() > exp * 1000) {
        return false;
      }
      return true;
    }
    return false;
  };

  return {
    signIn,
    signUp,
    signOut,
    getToken,
    isAuthenticated
  };
}
