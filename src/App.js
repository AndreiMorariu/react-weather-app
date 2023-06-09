import { useState, useEffect } from 'react';
import MainInfo from './components/City/MainInfo';
import CityForm from './components/City/CityForm';
import SecondaryInfo from './components/City/SecondaryInfo';
import Stat from './components/UI/Stat';
import ForecastItem from './components/UI/ForecastItem';
import { FiWind } from 'react-icons/fi';
import { SlSpeedometer } from 'react-icons/sl';
import { TbUvIndex } from 'react-icons/tb';
import { WiCloudyGusts } from 'react-icons/wi';
import { BsCloudRainHeavy } from 'react-icons/bs';
import { AiOutlineCompass } from 'react-icons/ai';

import './App.css';

function App() {
  const [data, setData] = useState();

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

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <div className="container">
      <div className="left-container">
        <CityForm onSubmit={getData} />
        {data && <MainInfo data={data} />}
        {data && <SecondaryInfo data={data} />}
      </div>
      <div className="right-container">
        <h2>Forecast</h2>
        <div className="forecast-container">
          {data && (
            <ForecastItem
              temperature={data.forecast.forecastday[0].day.avgtemp_c}
              icon={data.forecast.forecastday[0].day.condition.icon}
              date={data.forecast.forecastday[0].date}
            />
          )}
          {data && (
            <ForecastItem
              temperature={data.forecast.forecastday[1].day.avgtemp_c}
              icon={data.forecast.forecastday[0].day.condition.icon}
              date={data.forecast.forecastday[1].date}
            />
          )}
          {data && (
            <ForecastItem
              temperature={data.forecast.forecastday[2].day.avgtemp_c}
              icon={data.forecast.forecastday[2].day.condition.icon}
              date={data.forecast.forecastday[2].date}
            />
          )}
        </div>
        <h2>Today's highlights</h2>
        {data && (
          <Stat
            data={data.current.wind_kph}
            icon={FiWind}
            text="Wind Status"
            unit="km/h"
          />
        )}
        {data && (
          <Stat
            data={data.current.pressure_mb}
            icon={SlSpeedometer}
            text="Pressure"
            unit="mb"
          />
        )}
        {data && (
          <Stat
            data={data.current.feelslike_c}
            icon={TbUvIndex}
            text="Uv Index"
          />
        )}
        {data && (
          <Stat
            data={data.current.gust_kph}
            icon={WiCloudyGusts}
            text="Wind Gust"
          />
        )}
        {data && (
          <Stat
            data={data.current.precip_mm}
            icon={BsCloudRainHeavy}
            text="Precipitation"
            unit="mm"
          />
        )}
        {data && (
          <Stat
            data={data.current.wind_dir}
            icon={AiOutlineCompass}
            text="Wind Direction"
          />
        )}
      </div>
    </div>
  );
}

export default App;
