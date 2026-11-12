import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import PlaceholderPage from "../pages/PlaceholderPage";
const pages = [
  "bookings",
  "cleaners",
  "customers",
  "payments",
  "reports",
  "settings",
];
export default function AppRoutes({ onLogout }) {
  return (
    <Routes>
      <Route element={<AdminLayout onLogout={onLogout} />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        {pages.map((page) => (
          <Route
            key={page}
            path={page}
            element={
              <PlaceholderPage name={page[0].toUpperCase() + page.slice(1)} />
            }
          />
        ))}
      </Route>
    </Routes>
  );
}
