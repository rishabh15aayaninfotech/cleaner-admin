import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
const titles = {
  dashboard: "Dashboard",
  jobSchedulingManagement: "Job Management",
  vehicleGpsTrack: "GPS Tracking",
  employeeManagement: "Employee Management",
  crm: "CRM",
  manageInventory: "Manage Company Inventory",
  troubleshootingDashboard: "Troubleshooting",
  manageNotices: "Manage Notices",
  manageVendors: "Vendor Management",
  settings: "Settings",
};
export default function AdminLayout({ onLogout }) {
  const [open, setOpen] = useState(false),
    [collapsed, setCollapsed] = useState(false),
    [dark, setDark] = useState(
      () => localStorage.getItem("theme") === "dark",
    ),
    location = useLocation();
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
      localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  const title = titles[location.pathname.slice(1)] || "Dashboard";
  return (
    <div className="app-shell">
      <Sidebar
        open={open}
        collapsed={collapsed}
        onClose={() => setOpen(false)}
        onLogout={onLogout}
      />
      <div className="main-area">
        <Topbar
          open={open}
          onMenu={setOpen}
          collapsed={collapsed}
          onCollapse={setCollapsed}
          dark={dark}
          onTheme={() => setDark(!dark)}
          title={title}
        />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

