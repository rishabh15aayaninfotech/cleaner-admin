import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import "./layout-fixes.css";
import LoginPage from "./pages/LoginPage";
import AppRoutes from "./routes/AppRoutes";
export default function App() {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem("auth") === "true",
  );
  const login = (result) => {
    localStorage.setItem("auth", "true");
    localStorage.setItem("auth-token", result.token);
    localStorage.setItem("refresh-token", result.refreshToken || "");
    const safeUser = { ...(result.data || {}) };
    delete safeUser.password;
    localStorage.setItem("user", JSON.stringify(safeUser));
    setAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("auth");
    localStorage.removeItem("auth-token");
    localStorage.removeItem("refresh-token");
    localStorage.removeItem("user");
    setAuthenticated(false);
  };
  return (
    <BrowserRouter>
      {authenticated ? (
        <AppRoutes onLogout={logout} />
      ) : (
        <LoginPage onLogin={login} />
      )}
    </BrowserRouter>
  );
}
