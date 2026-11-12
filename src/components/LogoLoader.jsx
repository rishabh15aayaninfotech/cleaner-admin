import cleanerLogo from '../assets/cleaner-logo.png'

export default function LogoLoader(){
  return <div className="logo-loader" role="status" aria-label="Loading"><div className="logo-loader-orbit"><img src={cleanerLogo} alt="Cleaner"/></div><span>Loading...</span></div>
}
