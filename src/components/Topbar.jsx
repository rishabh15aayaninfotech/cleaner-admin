import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Icon from './Icon'
export default function Topbar({open,onMenu,dark,onTheme,collapsed,onCollapse,onLogout,title,user}){const [profileOpen,setProfileOpen]=useState(false),navigate=useNavigate();return <header className="topbar"><button className="mobile-menu collapse-toggle" aria-label="Toggle sidebar" onClick={()=>{onMenu(!open);onCollapse(!collapsed)}}><i className="bi bi-list"/></button><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{title}</strong></div><div className="top-actions"><button className="icon-btn theme-toggle" aria-label="Toggle theme" onClick={onTheme}><Icon name={dark?'sun':'moon'}/></button><div className="profile-menu-wrap"><button className="top-profile" onClick={()=>setProfileOpen(!profileOpen)} aria-expanded={profileOpen}><span className="avatar">{user?.imageUrl?<img src={user.imageUrl} alt={user.name||'Profile'}/>:user?.initials||'AD'}</span><span><strong>{user?.name||'Admin'}</strong><small>{user?.role||'Admin'}</small></span><i className="bi bi-chevron-down chevron"/></button>{profileOpen&&<div className="profile-dropdown"><p>Profile</p><button onClick={()=>{navigate("/profile");setProfileOpen(false)}}><Icon name="user"/>Profile</button><button><Icon name="card"/>Orders</button><p>Settings</p><button><Icon name="settings"/>Policies</button><button><Icon name="calendar"/>Terms and Conditions</button><div className="dropdown-divider"/><button onClick={onLogout}><Icon name="logout"/>Log Out</button></div>}</div></div></header>}




