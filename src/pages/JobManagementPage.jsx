import { useEffect, useState } from 'react'
import DashboardSections from '../components/DashboardSections'
import { getAllJobIds } from '../lib/api'

const displayDate = value => value ? new Date(value).toLocaleDateString('en-GB') : '—'
const displayTime = value => value ? new Date(value).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '—'

function RecentJobs(){
  const [jobs,setJobs]=useState([])
  const adminId=JSON.parse(localStorage.getItem('user')||'{}')._id
  useEffect(()=>{if(adminId)getAllJobIds(adminId).then(result=>setJobs((result?.data||[]).slice(0,10))).catch(()=>setJobs([]))},[adminId])
  return <section className="panel reference-table-card recent-jobs-panel"><div className="reference-card-head"><h3>Recent Jobs</h3><button className="small-action" onClick={()=>window.location.reload()}><i className="bi bi-arrow-clockwise"/> Refresh</button></div><div className="table-responsive"><table className="reference-table recent-jobs-table"><thead><tr><th>SERIAL NO.</th><th>TITLE</th><th>DATE</th><th>TIME</th><th>ASSIGN</th><th>JOB ID</th><th>PRICE</th><th>STATUS</th><th>ACTION</th></tr></thead><tbody>{jobs.length?jobs.map((job,index)=><tr key={job._id||job.jobId}><td>{index+1}</td><td><strong>{job.title||'Untitled job'}</strong></td><td>{displayDate(job.createdAt)}</td><td>{displayTime(job.createdAt)}</td><td>{job.clientName||'Unassigned'}</td><td>{job.jobId||'—'}</td><td>—</td><td><span className="pill-status working">{job.eventType||'Pending'}</span></td><td><button className="row-view-action" aria-label="View job" onClick={()=>window.open(`${window.location.origin}/event-details/${job._id}`,'_blank')}><i className="bi bi-eye"/></button><button className="row-action" aria-label="Delete job" onClick={()=>setJobs(current=>current.filter(item=>item._id!==job._id))}><i className="bi bi-trash3"/></button></td></tr>):<tr><td colSpan="9" className="table-state">No recent jobs found.</td></tr>}</tbody></table></div></section>
}

export default function JobManagementPage(){
  useEffect(()=>{const arrangeSections=()=>{document.querySelectorAll('.job-management-page .reference-card-head h3').forEach(title=>{if(title.textContent.trim()==='Current Employees')title.closest('.reference-table-card')?.style.setProperty('display','none','important')});const jobs=document.querySelector('.recent-jobs-panel'),estimate=[...document.querySelectorAll('.job-management-page .reference-card-head h3')].find(title=>title.textContent.trim()==='Estimates Section')?.closest('.reference-table-card');if(jobs&&estimate&&jobs.parentElement!==estimate.parentElement)estimate.parentElement.insertBefore(jobs,estimate)};arrangeSections();const timer=window.setInterval(arrangeSections,100);return()=>window.clearInterval(timer)},[])
  return <div className="job-management-page"><DashboardSections/><RecentJobs/></div>
}
