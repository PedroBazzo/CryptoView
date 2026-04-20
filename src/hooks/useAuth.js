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
    const current = getCurrentUser();
    if (current) setUser(current);
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
  }

  return {
    user,
    login,
    register,
    logout,
  };
}