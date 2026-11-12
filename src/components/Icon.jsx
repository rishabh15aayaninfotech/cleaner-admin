const icons={grid:'bi-grid',calendar:'bi-calendar3',users:'bi-people',user:'bi-person',card:'bi-credit-card',chart:'bi-bar-chart',settings:'bi-gear',logout:'bi-box-arrow-right',sun:'bi-sun',moon:'bi-moon'}
export default function Icon({name}){return <i className={`bi ${icons[name]||icons.grid}`} aria-hidden="true"/>}
