import React, { useState } from 'react';
import { Form } from 'react-bootstrap';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    setQuery(e.target.value);
    onSearch(e.target.value);
  };

  return (
    <Form.Control
      type="text"
      placeholder="Filter Pantry Items"
      value={query}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
