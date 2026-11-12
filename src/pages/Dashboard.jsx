import DashboardSections from '../components/DashboardSections'

export default function Dashboard(){
  const user=JSON.parse(localStorage.getItem('user')||'{}')
  const name=user.name||'Admin'
  return <>
    <div className="page-heading">
      <div><p className="eyebrow">THURSDAY, NOVEMBER 12, 2026</p><h1>Good afternoon, {name} <span aria-hidden="true">👋</span></h1><p className="muted">Here’s what’s happening with your cleaning business today.</p></div>
      <button className="btn btn-primary"><i className="bi bi-plus-lg"/> New booking</button>
    </div>
    <DashboardSections/>
  </>
}
