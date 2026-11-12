import DashboardSections from '../components/DashboardSections'
export default function Dashboard(){const user=JSON.parse(localStorage.getItem('user')||'{}');const name=user.name||'Admin';return <><div className="page-heading"><div><p className="eyebrow">WEDNESDAY, NOVEMBER 12, 2026</p><h1>Good morning, {name} 👋</h1><p className="muted">Here’s what’s happening with your business today.</p></div><button className="btn btn-primary">＋ New booking</button></div><DashboardSections/></>}







