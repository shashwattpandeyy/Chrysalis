import { useState } from 'react';

export default function SearchBar({ setSearchResult }) {
  const [result, setResult] = useState([]);
  const [value, setValue] = useState('');

  const getResult = async (value) => {
    const response = await fetch(`http://localhost:9000/items?name[_contains]=${value}`, {
      headers: {
        Authorization: 'Bearer Tmm0thXXWKOm1A5i_yHFRLz2Ttej3bo2',
      },
    });

    const data = await response.json();
    setResult(data);
  };

  let timer;

  const handleChange = (e) => {
    const { value } = e.target;
    setValue(value);
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      if (value) {
        getResult(value);
      }
    }, 500);

    if (!value) {
      setSearchResult();
    }
  };

  const handleSearch = () => {
    if (value) {
      getResult(value);
    }
  };

  return (
    <div className="search">
      <div className="search-bar">
        <input type="text" value={value} onChange={handleChange} />
        <button type="button" onClick={handleSearch}>
          Search
        </button>
      </div>
      <div className="search-result">
        <ul>
          {value &&
            result.map((item, index) => (
              <li
                key={index}
                onClick={() => {
                  setSearchResult(item);
                  setResult([]);
                }}
              >
                {item.name}
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
}
