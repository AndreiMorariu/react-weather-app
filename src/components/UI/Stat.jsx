import './Stat.css';

function Stat({ data, icon, text, unit }) {
  const TheIcon = icon;
  return (
    <div className="stat">
      <p className="stat-name">{text}</p>
      <p className="stat-value">
        {data} {unit}
      </p>
      <TheIcon size={40} />
    </div>
  );
}

export default Stat;
