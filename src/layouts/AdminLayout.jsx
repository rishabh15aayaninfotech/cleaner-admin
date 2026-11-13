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
  useEffect(() => { if (location.pathname === "/employees" || location.pathname === "/employeeManagement") { const timer = window.setInterval(() => { const heading=document.querySelector('.list-page-heading');const back=document.querySelector('.events-back-button');if(back)back.remove();const description=heading?.querySelector('p:not(.eyebrow)');if(description)description.remove();if(heading&&!heading.querySelector('.employee-actions')){const actions=document.createElement('div');actions.className='employee-actions';['Manage Job Titles','Manage Roles','Request change to Time card','Add Employee'].forEach(label=>{const button=document.createElement('button');button.textContent=label;button.onclick=()=>{};actions.appendChild(button)});heading.appendChild(actions)} },100);return()=>window.clearInterval(timer) } },[location.pathname]);
  useEffect(() => { if (location.pathname === "/employees" || location.pathname === "/employeeManagement") { const timer = window.setInterval(() => { const actions=document.querySelector('.employee-actions');const refresh=document.querySelector('.list-page-actions .small-action');if(actions&&refresh&&!actions.contains(refresh)){actions.insertBefore(refresh,actions.firstChild);refresh.classList.add('employee-refresh-button')} },100);return()=>window.clearInterval(timer) } },[location.pathname]);
  useEffect(() => { if (location.pathname === "/employees" || location.pathname === "/employeeManagement") { const timer = window.setInterval(() => { const page=document.querySelector('.all-events-page');if(!page||page.querySelector('.employee-filters'))return;const filters=document.createElement('div');filters.className='employee-filters';filters.innerHTML='<input placeholder="Search Employees" aria-label="Search Employees"/><label>Working Status:<select><option>All</option><option>Working</option><option>On Break</option><option>Traveling</option><option>Unavailable</option><option>Day Off</option><option>Custom</option></select></label><label>Status:<select><option>All</option><option>Active</option><option>Blocked</option></select></label>';page.insertBefore(filters,page.querySelector('.reference-table-card'));const apply=()=>{const search=filters.querySelector('input').value.toLowerCase(),work=filters.querySelectorAll('select')[0].value,status=filters.querySelectorAll('select')[1].value;page.querySelectorAll('.reference-table tbody tr').forEach(row=>{const text=row.innerText.toLowerCase();row.style.display=(!search||text.includes(search))&&(work==='All'||text.includes(work.toLowerCase()))&&(status==='All'||text.includes(status.toLowerCase()))?'table-row':'none'})};filters.querySelectorAll('input,select').forEach(control=>control.addEventListener('input',apply)); },100);return()=>window.clearInterval(timer) } },[location.pathname]);
  useEffect(() => { if (location.pathname === "/employees" || location.pathname === "/employeeManagement") { const timer=window.setInterval(()=>{const filters=document.querySelector('.employee-filters');if(filters&&!filters.querySelector('.filter-actions')){const actions=document.createElement('div');actions.className='filter-actions';actions.innerHTML='<button class="filter-submit"><i class="bi bi-funnel"></i> Filters</button><button class="filter-clear"><i class="bi bi-x-lg"></i> Clear</button>';actions.querySelector('.filter-clear').onclick=()=>{filters.querySelector('input').value='';filters.querySelectorAll('select').forEach(select=>select.value='All');filters.querySelector('input').dispatchEvent(new Event('input',{bubbles:true}))};filters.appendChild(actions)}},100);return()=>window.clearInterval(timer)}},[location.pathname]);
  useEffect(() => { if (location.pathname === "/employees" || location.pathname === "/employeeManagement") { const timer=window.setInterval(()=>{const filters=document.querySelector('.employee-filters'),actions=document.querySelector('.employee-actions');document.querySelector('.employee-refresh-button')?.remove();document.querySelector('.filter-actions')?.remove();if(filters&&actions&&!filters.contains(actions))filters.appendChild(actions)},100);return()=>window.clearInterval(timer)}},[location.pathname]);
  useEffect(() => { if (location.pathname === "/employees" || location.pathname === "/employeeManagement") { const timer=window.setInterval(()=>{const filters=document.querySelector('.employee-filters'),heading=document.querySelector('.list-page-heading');if(filters&&heading){document.querySelectorAll('.employee-actions').forEach(action=>{if(!filters.contains(action))action.remove()});if(!heading.querySelector('.employee-actions')){const marker=document.createElement('div');marker.className='employee-actions employee-actions-marker';heading.appendChild(marker)}}},100);return()=>window.clearInterval(timer)}},[location.pathname]);
  useEffect(() => { if (location.pathname === "/employees" || location.pathname === "/employeeManagement") { const timer=window.setInterval(()=>{const page=document.querySelector('.all-events-page');if(page&&!page.querySelector('.employee-page-banner')){const banner=document.createElement('div');banner.className='employee-page-banner';banner.innerHTML='<div><small><i class="bi bi-house"></i> Home <b>›</b> User Management <b>›</b> Employees</small><h2><i class="bi bi-people"></i> Employees Data</h2></div><strong><span>0</span><small>TOTAL EMPLOYEES</small></strong>';page.insertBefore(banner,page.firstChild)}const count=page?.querySelectorAll('.reference-table tbody tr').length;if(count&&page?.querySelector('.employee-page-banner strong span'))page.querySelector('.employee-page-banner strong span').textContent=count},100);return()=>window.clearInterval(timer)}},[location.pathname]);
  useEffect(() => { if (location.pathname === "/employees" || location.pathname === "/employeeManagement") { const timer=window.setInterval(()=>{const total=sessionStorage.getItem('employee-total'),counter=document.querySelector('.employee-page-banner strong span');if(total&&counter)counter.textContent=total},100);return()=>window.clearInterval(timer)}},[location.pathname]);
  useEffect(() => { if (location.pathname === "/employees" || location.pathname === "/employeeManagement") { const observer=new MutationObserver(()=>{const total=sessionStorage.getItem('employee-total'),counter=document.querySelector('.employee-page-banner strong span');if(total&&counter&&counter.textContent!==total)counter.textContent=total});observer.observe(document.body,{subtree:true,childList:true,characterData:true});return()=>observer.disconnect()}},[location.pathname]);
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

