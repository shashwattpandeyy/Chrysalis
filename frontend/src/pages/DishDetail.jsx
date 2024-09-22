import { Text } from '@fluentui/react-components';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function DishDetail() {
  const [item, setItem] = useState({});
  const location = useLocation();

  console.log('location', location, item);
  const getSelectedItem = async () => {
    const name = location.state?.name;
    const response = await fetch(`http://localhost:9000/items/${name}`, {
      headers: {
        Authorization: 'Bearer Tmm0thXXWKOm1A5i_yHFRLz2Ttej3bo2',
      },
    });

    const data = await response.json();
    setItem(data[0]);
  };

  useEffect(() => {
    getSelectedItem();
  }, [location.state?.name]);

  return (
    <div
      className="card"
      style={{
        padding: '10px',
        margin: '0 auto',
        marginTop: '10px',
        border: '1px solid white',
        borderRadius: '4px',
        maxWidth: '300px',
        backgroundColor: '#c7c7c7',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Food Detail</h2>
      <div className="card-item" style={{ display: 'flex', flexDirection: 'column' }}>
        <Text>Name: {item.name}</Text>
        <Text>Ingredients: {item.ingredients}</Text>
        <Text>Type: {item.diet}</Text>
        <Text>Preparation Time: {item.prep_time}</Text>
        <Text>Cooking Time: {item.cook_time}</Text>
        <Text>Flavor: {item.flavor_profile}</Text>
        <Text>Course: {item.course}</Text>
      </div>
    </div>
  );
}
