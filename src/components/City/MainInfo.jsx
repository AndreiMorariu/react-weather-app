import './MainInfo.css';
import { RiCelsiusFill } from 'react-icons/ri';

function MainInfo({ data }) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const date = new Date(data.location.localtime);
  const day = date.getDay();
  const hour = date.getHours() + ':' + date.getMinutes();

  return (
    <div className="main-info">
      <h2 className="city">{data.location.name}</h2>
      <img src={data.current.condition.icon} alt="" className="icon" />
      <p className="temperature">
        {data.current.temp_c} <RiCelsiusFill size={40} />{' '}
      </p>
      <p className="time">
        <span className="day">{days[day]}</span>,{' '}
        <span className="hour">{hour}</span>
      </p>
    </div>
  );
}

export default MainInfo;
