import { Text } from '@fluentui/react-components';
import SearchBar from './SearchBar';
import '../index.css';
import { Link } from 'react-router-dom';
export default function Header({ setSearchResult }) {
  return (
    <div className="header">
      <Link to="/" style={{ color: '#FFFFFF' }}>
        <Text size={500} align="center" style={{ marginLeft: '4px' }}>
          Chrysalis
        </Text>
      </Link>
      <SearchBar setSearchResult={setSearchResult} />
      <nav>
        <ul>
          <li>Home</li>
          <li>About</li>
          <li>Contact Us</li>
        </ul>
      </nav>
    </div>
  );
}
