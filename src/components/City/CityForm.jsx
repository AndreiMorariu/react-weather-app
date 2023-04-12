import { useState } from 'react';
import { RxMagnifyingGlass } from 'react-icons/rx';
import './CityForm.css';

function CityForm({ onSubmit }) {
  const [city, setCity] = useState('');

  const formSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(city);
    setCity('');
  };

  return (
    <form onSubmit={formSubmitHandler}>
      <div className="form-group">
        <input
          type="text"
          onChange={(e) => setCity(e.target.value)}
          placeholder="Search for places..."
          value={city}
        />
        <button type="submit">
          <RxMagnifyingGlass size={20} />
        </button>
      </div>
    </form>
  );
}

export default CityForm;
