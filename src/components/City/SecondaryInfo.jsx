import { AiOutlineCloud } from 'react-icons/ai';
import { WiHumidity } from 'react-icons/wi';
import './SecondaryInfo.css';
import { useState, useEffect } from 'react';

function SecondaryInfo({ data }) {
  const [imageUrl, setImageUrl] = useState();

  const getImage = async () => {
    const response = await fetch(
      'https://api.unsplash.com/photos/random?client_id=p61wNmp2QLB2-rrG6QkaikyC-SplxPFbTIvAPyM8Ulc&query=weather&orientation=landscape'
    );
    const data = await response.json();
    setImageUrl(data.urls.thumb);
  };

  useEffect(() => {
    getImage();
  }, []);

  return (
    <div className="secondary-info">
      <div className="clouds">
        <AiOutlineCloud size={30} className="secondary-info-icon" />
        <p className="clouds-info">
          Percentage of clouds: {data.current.cloud}%
        </p>
      </div>
      <div className="humidity">
        <WiHumidity size={30} className="secondary-info-icon" />
        <p className="humidity-info">
          Percentage of humidity: {data.current.humidity}%
        </p>
      </div>
      {imageUrl && (
        <img src={imageUrl} alt="weather image " className="weather-img" />
      )}
    </div>
  );
}

export default SecondaryInfo;
