import { useState, useEffect } from "react";
import {
  loginUser,
  logoutUser,
  registerUser,
  getCurrentUser,
} from "../services/auth";

export default function useAuth() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    function syncUser() {
      setUser(getCurrentUser());
    }

    syncUser();

    window.addEventListener("storage", syncUser);

    return () => {
      window.removeEventListener("storage", syncUser);
    };
  }, []);

  function login(identifier, password) {
    loginUser(identifier, password);
    setUser(getCurrentUser());
  }

  function register(data) {
    registerUser(data);
    setUser(getCurrentUser());
  }

  function logout() {
   logoutUser();
   setUser(null);

   window.dispatchEvent(new Event("storage"));
 }

  return {
    user,
    login,
    register,
    logout,
  };
}