import { useState, useEffect } from 'react';
import './App.css';

import { FiWind } from 'react-icons/fi';
import { SlSpeedometer } from 'react-icons/sl';
import { TbUvIndex } from 'react-icons/tb';
import { WiCloudyGusts } from 'react-icons/wi';
import { BsCloudRainHeavy } from 'react-icons/bs';
import { AiOutlineCompass } from 'react-icons/ai';

import MainInfo from './components/City/MainInfo';
import CityForm from './components/City/CityForm';
import SecondaryInfo from './components/City/SecondaryInfo';
import Stat from './components/UI/Stat';
import ForecastItem from './components/UI/ForecastItem';

const stats = [
  { data: 'wind_kph', icon: FiWind, text: 'Wind status', unit: 'km/h' },
  { data: 'pressure_mb', icon: SlSpeedometer, text: 'Pressure', unit: 'mb' },
  { data: 'feelslike_c', icon: TbUvIndex, text: 'Uv Index', unit: 'mW/cm2' },
  { data: 'gust_kph', icon: WiCloudyGusts, text: 'Wind Gust', unit: 'km/h' },
  {
    data: 'precip_mm',
    icon: BsCloudRainHeavy,
    text: 'Precipitation',
    unit: 'mm',
  },
  {
    data: 'wind_dir',
    icon: AiOutlineCompass,
    text: 'Wind Direction',
    unit: 'km/h',
  },
];

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const userLocation = async () => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=b84c8fd19eca42bfb58d98d628b90821`
          );
          const userLocation = await response.json();

          const response2 = await fetch(
            `http://api.weatherapi.com/v1/forecast.json?key=bf3ca54e42ca49bda7e72248230204&q=${userLocation.results[0].components.city}&days=3&aqi=no&alerts=no`
          );
          const city = await response2.json();
          setData(city);
        },
        (err) => {
          console.log(err);
          return;
        }
      );
    };

    userLocation();
  }, []);

  const getData = async (city) => {
    try {
      const response = await fetch(
        `http://api.weatherapi.com/v1/forecast.json?key=bf3ca54e42ca49bda7e72248230204&q=${city}&days=3&aqi=no&alerts=no`
      );
      if (!response.ok) throw new Error('Something went wrong');
      const data = await response.json();
      console.log(data);
      setData(data);
    } catch (err) {
      console.error(err);
    }
  };

  const renderStats = () => {
    const element = data.current;
    return stats.map((stat, i) => {
      return (
        <Stat
          data={element[stats[i].data]}
          icon={stat.icon}
          text={stat.text}
          unit={stat.unit}
          key={i}
        />
      );
    });
  };

  return (
    <div className='container'>
      <div className='left-container'>
        <CityForm onSubmit={getData} />
        {data.location && data.current && (
          <>
            <MainInfo data={data} />
            <SecondaryInfo data={data} />
          </>
        )}
      </div>
      <div className='right-container'>
        <h2>Forecast</h2>
        <div className='forecast-container'>
          {data.forecast?.forecastday.map((item, i) => {
            return (
              <ForecastItem
                temperature={item.day.avgtemp_c}
                icon={item.day.condition.icon}
                date={item.date}
                key={i}
              />
            );
          })}
        </div>
        <h2>Today's highlights</h2>
        {data.current && renderStats()}
      </div>
    </div>
  );
}

export default App;
