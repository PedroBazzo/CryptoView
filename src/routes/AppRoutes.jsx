import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import History from "../pages/History";
import News from "../pages/News";
import Profile from "../pages/Profile";

import { getCurrentUser } from "../services/auth";

function PrivateRoute({ children }) {
  const user = getCurrentUser();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🌐 públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* 🔓 públicas */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/news" element={<News />} />

        {/* 🔒 privadas */}
        <Route
          path="/history"
          element={
            <PrivateRoute>
              <History />
            </PrivateRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />

        {/* fallback */}
        <Route path="*" element={<Navigate to="/" />} />

      </Routes>
    </BrowserRouter>
  );
}