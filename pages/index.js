import React, { useState } from 'react';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';
import SearchBar from '../components/SearchBar';
import RemoveItem from '../components/RemoveItem';
import '../styles/animatedBackground.css';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="container">
      <h1>Pantry Tracker</h1>
      <div className="form-container">
        <PantryForm />
      </div>
      <div className="form-container">
        <SearchBar onSearch={handleSearch} />
      </div>
      <div className="form-container">
        <RemoveItem />
      </div>
      <div className="list-container">
        <PantryList searchQuery={searchQuery} />
      </div>
    </div>
  );
};

export default Home;
