import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import '../index.css';
import GenericTable from '../components/Table';
export default function Home() {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [suggester, setSuggester] = useState('');
  const searchResult = useOutletContext();
  const [value, setValue] = useState('');

  useEffect(() => {
    if (searchResult) {
      setData([searchResult]);
      setFilteredData([searchResult]);
    } else {
      getData();
    }
  }, [searchResult]);

  const columns = [
    { key: 'name', label: 'Name', sortable: true },
    { key: 'ingredients', label: 'Ingredients' },
    { key: 'diet', label: 'Diet type' },
    { key: 'prep_time', label: 'Preparation time', sortable: true },
    { key: 'cook_time', label: 'Cooking time', sortable: true },
    { key: 'flavor_profile', label: 'Flavour' },
    { key: 'course', label: 'Course' },
    { key: 'state', label: 'State' },
    { key: 'region', label: 'Region' },
  ];

  // Fetching data function
  // Replace this to react query for managing UI data state efficiently
  // TODO: Use env for URL
  async function getData() {
    const response = await fetch(`http://localhost:9000/items`, {
      headers: {
        Authorization: 'Bearer Tmm0thXXWKOm1A5i_yHFRLz2Ttej3bo2',
      },
    });

    const data = await response.json();
    setData(data);
    setFilteredData(data);
  }

  const updateData = (value) => {
    const filteredData = data.filter((data) => {
      return (
        data.diet.toLowerCase().includes(value.toLowerCase()) ||
        String(data.state).toLowerCase().includes(value.toLowerCase()) ||
        String(data.flavor_profile).toLowerCase().includes(value.toLowerCase()) ||
        data.name.toLowerCase().includes(value.toLowerCase())
      );
    });

    setFilteredData(filteredData);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    updateData(value);
    setValue(value);
  };

  const handleSuggestion = () => {
    const filteredData = data.filter((data) => {
      const ingredients = data.ingredients
        .toLowerCase()
        .split(',')
        .map((word) => word.trim());

      const value = suggester
        .toLowerCase()
        .split(',')
        .map((word) => word.trim());

      ingredients.sort();
      value.sort();

      return value.every((word) => ingredients.includes(word)) && ingredients.length === value.length;
    });

    setFilteredData(filteredData);
  };

  return (
    <div className="home">
      <div
        className="home-search"
        style={{ marginTop: '6px', marginBottom: '6px', display: 'flex', justifyContent: 'space-evenly' }}
      >
        <div className="search">
          <label>Filter table: </label>
          <input type="text" value={value} placeholder="Enter dish name" onChange={handleChange} />
          <button type="submit" onClick={() => updateData(value)}>
            Search
          </button>
        </div>
        <div className="search">
          <label>Dish Suggester: </label>
          <input
            type="text"
            value={suggester}
            placeholder="Enter ingredients"
            onChange={(e) => setSuggester(e.target.value)}
          />
          <button type="submit" onClick={handleSuggestion}>
            Search
          </button>
          <button
            type="submit"
            onClick={() => {
              setFilteredData(data);
              setSuggester('');
            }}
          >
            Clear
          </button>
        </div>
      </div>
      {filteredData.length === 0 ? (
        <div>No dish found</div>
      ) : (
        <GenericTable columns={columns} tableData={filteredData} pagination={false} pageSize={20} />
      )}
    </div>
  );
}
