import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import PantryForm from '../components/PantryForm';
import PantryList from '../components/PantryList';
import SearchBar from '../components/SearchBar';
import RemoveItem from '../components/RemoveItem';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <Container className="mt-5">
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">Pantry Tracker</h1>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={{ span: 6, offset: 3 }}>
          <PantryForm />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={{ span: 6, offset: 3 }}>
          <SearchBar onSearch={handleSearch} />
        </Col>
      </Row>
      <Row className="mb-4">
        <Col md={{ span: 6, offset: 3 }}>
          <RemoveItem />
        </Col>
      </Row>
      <Row>
        <Col md={{ span: 6, offset: 3 }}>
          <PantryList searchQuery={searchQuery} />
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
