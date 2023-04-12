import { useState, useEffect } from 'react';
import { RxMagnifyingGlass } from 'react-icons/rx';
import { AiOutlineArrowRight } from 'react-icons/ai';
import './CityForm.css';
import cities from 'cities.json';

function CityForm({ onSubmit }) {
  const [input, setInput] = useState('');
  const [options, setOptions] = useState();

  const handleSelectOptionClick = (option) => {
    setInput(option);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    onSubmit(input);
    setInput('');
  };

  useEffect(() => {
    const options = cities.filter((city) => city.name.startsWith(input));

    const unique = [
      ...new Map(options.map((item) => [item.name, item])).values(),
    ];
    setOptions(unique);
  }, [input]);

  const renderOptions =
    input &&
    options.slice(0, 4).map((option) => (
      <li
        className="option"
        onClick={() => handleSelectOptionClick(option.name)}
      >
        <AiOutlineArrowRight />
        {option.name}
      </li>
    ));

  return (
    <>
      <form onSubmit={formSubmitHandler}>
        <div className="form-group">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            placeholder="Search for places..."
            value={input}
          />
          <button type="submit">
            <RxMagnifyingGlass size={20} />
          </button>
        </div>
      </form>
      <ul className="options">{renderOptions}</ul>
    </>
  );
}

export default CityForm;
