import { Navigate, Route, Routes } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Dashboard from "../pages/Dashboard";
import PlaceholderPage from "../pages/PlaceholderPage";
import ProfilePage from "../pages/ProfilePage";
import EventDetailsPage from "../pages/EventDetailsPage";
import EventsListPage from "../pages/EventsListPage";
const pages = [
  ["jobSchedulingManagement", "Job Management"],
  ["vehicleGpsTrack", "GPS Tracking"],
  ["employeeManagement", "Employee Management"],
  ["crm", "CRM"],
  ["manageInventory", "Manage Company Inventory"],
  ["troubleshootingDashboard", "Troubleshooting"],
  ["manageNotices", "Manage Notices"],
  ["manageVendors", "Vendor Management"],
];
export default function AppRoutes({ onLogout }) {
  return (
    <Routes>
      <Route element={<AdminLayout onLogout={onLogout} />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="event-details/:id" element={<EventDetailsPage />} />
        <Route path="events" element={<EventsListPage />} />
        {pages.map(([path, name]) => (
          <Route
            key={path}
            path={path}
            element={<PlaceholderPage name={name} />}
          />
        ))}
      </Route>
    </Routes>
  );
}
