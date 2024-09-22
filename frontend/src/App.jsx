import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import { useState } from 'react';

function App() {
  const [searchResult, setsearchResult] = useState();

  console.log('app', searchResult);
  return (
    <div>
      <Header setSearchResult={setsearchResult} />
      <Outlet context={searchResult} />
    </div>
  );
}

export default App;
