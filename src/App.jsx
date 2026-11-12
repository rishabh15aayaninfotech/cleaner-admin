import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./App.css";
import LoginPage from "./pages/LoginPage";
import AppRoutes from "./routes/AppRoutes";
export default function App() {
  const [authenticated, setAuthenticated] = useState(
    () => localStorage.getItem("cleaner-auth") === "true",
  );
  const login = (result) => {
    localStorage.setItem("cleaner-auth", "true");
    localStorage.setItem("cleaner-token", result.token);
    localStorage.setItem("cleaner-refresh-token", result.refreshToken || "");
    const safeUser = { ...(result.data || {}) };
    delete safeUser.password;
    localStorage.setItem("cleaner-user", JSON.stringify(safeUser));
    setAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("cleaner-auth");
    localStorage.removeItem("cleaner-token");
    localStorage.removeItem("cleaner-refresh-token");
    localStorage.removeItem("cleaner-user");
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
