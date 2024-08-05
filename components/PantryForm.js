import React, { useState } from 'react';
import { db } from '../src/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { Form, Button } from 'react-bootstrap';

const PantryForm = () => {
  const [item, setItem] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, 'pantryItems'), {
        name: item,
      });
      setItem('');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="pantryItem">
        <Form.Label>Pantry Item</Form.Label>
        <Form.Control
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Add Item
      </Button>
    </Form>
  );
};

export default PantryForm;
