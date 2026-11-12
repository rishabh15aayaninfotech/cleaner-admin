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
  const login = () => {
    localStorage.setItem("cleaner-auth", "true");
    setAuthenticated(true);
  };
  const logout = () => {
    localStorage.removeItem("cleaner-auth");
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
