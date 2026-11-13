import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";
import { getAdminProfile } from "../lib/api";
import LogoLoader from "../components/LogoLoader";
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
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user") || "{}"));
  const [loading, setLoading] = useState(true);
  useEffect(() => { if (user._id) getAdminProfile(user._id).then((result) => { if (result?.data) { const safeUser = { ...result.data }; delete safeUser.password; localStorage.setItem("user", JSON.stringify(safeUser)); setUser(safeUser); } }).catch(() => {}); }, [user._id]);
  const readableRole = typeof user.role === "object" ? user.role.role : /^[a-f\d]{24}$/i.test(user.role || "") ? "Admin" : user.role;
  const displayUser = { ...user, initials: (user.name || "Admin").split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase(), role: readableRole, imageUrl: user.profilePicture?.[0]?.url || (user.profilePicture?.[0]?.filename ? `${import.meta.env.VITE_API_BASE_URL.replace(/\/api\/?$/, "")}/${user.profilePicture[0].filename}` : "") };
  useEffect(() => {
    document.documentElement.dataset.theme = dark ? "dark" : "light";
      localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);
  useEffect(() => { if (location.pathname === "/events" || location.pathname === "/dashboard") { const timer = window.setInterval(() => { const button = document.querySelector(".events-back-button"); if (button) button.onclick = () => { window.close(); window.setTimeout(() => window.location.assign("/dashboard"), 100); }; document.querySelectorAll(".reference-table tbody tr").forEach(row => { const title = row.querySelector("td:nth-child(2)"); const view = row.querySelector(".row-view-action"); if (title && view && !title.dataset.linked) { title.dataset.linked = "true"; title.classList.add("event-title-link"); title.onclick = () => view.click(); } }); }, 100); return () => window.clearInterval(timer); } }, [location.pathname]);
  useEffect(() => { if (location.pathname === "/dashboard") { const timer = window.setInterval(() => { document.querySelectorAll(".reference-card-head .small-action").forEach(button => { if (button.textContent.trim() === "All Employees") button.onclick = () => window.open(`${window.location.origin}/employees`, "_blank"); }); const employeeKeys=Object.keys(sessionStorage).filter(key=>key.startsWith('employee:'));let employeeIndex=0;document.querySelectorAll(".reference-table tbody tr").forEach(row=>{if(row.querySelectorAll('td').length!==7)return;const employeeId=employeeKeys[employeeIndex++]?.replace('employee:','');if(!employeeId)return;const name=row.querySelector('td:nth-child(2)'),view=row.querySelector('.row-view-action');const target=()=>window.open(`${window.location.origin}/employee-details/${employeeId}`,'_blank');if(name){name.classList.add('event-title-link');name.onclick=target}if(view)view.onclick=target}); }, 100); return () => window.clearInterval(timer); } }, [location.pathname]);
  useEffect(() => { if (location.pathname === "/employees") { const timer = window.setInterval(() => { document.querySelectorAll(".all-events-page tbody tr").forEach((row,index) => { const button=row.querySelector('.row-view-action'); const employeeKeys=Object.keys(sessionStorage).filter(key=>key.startsWith('employee:')); const employeeId=employeeKeys[index]?.replace('employee:',''); if(button&&employeeId&&!button.dataset.linked){button.dataset.linked='true';button.onclick=()=>window.open(`${window.location.origin}/employee-details/${employeeId}`,'_blank')}}); },100); return()=>window.clearInterval(timer) } },[location.pathname]);
  const title = titles[location.pathname.slice(1)] || "Dashboard";
  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 550);
    return () => window.clearTimeout(timer);
  }, [location.pathname]);
  return (
    <div className="app-shell">
      {loading && <LogoLoader />}
      <Sidebar
        open={open}
        collapsed={collapsed}
        onClose={() => setOpen(false)}
        onLogout={onLogout}
        user={displayUser}
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
          user={displayUser}
        />
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

