import './ForecastItem.css';
import { RiCelsiusFill } from 'react-icons/ri';

function ForecastItem({ temperature, icon, date }) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  const dateObj = new Date(date);
  const day = dateObj.getDay();

  return (
    <div className="forecast">
      <p className="stat-name">{days[day]} AVG:</p>
      <br />
      <p className="temperature">
        {temperature}
        <RiCelsiusFill size={30} />{' '}
      </p>
      <img src={icon} alt="" />
    </div>
  );
}

export default ForecastItem;
