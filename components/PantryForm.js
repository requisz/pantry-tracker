import React, { useState } from 'react';
import { db } from '../src/firebaseConfig';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { Form, Button } from 'react-bootstrap';

const PantryForm = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const q = query(collection(db, 'pantryItems'), where('name', '==', item));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const existingItem = querySnapshot.docs[0];
        const existingItemRef = doc(db, 'pantryItems', existingItem.id);
        const newQuantity = existingItem.data().quantity + quantity;
        await updateDoc(existingItemRef, { quantity: newQuantity });
      } else {
        await addDoc(collection(db, 'pantryItems'), {
          name: item,
          quantity: quantity,
        });
      }
      setItem('');
      setQuantity(1);
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
      <Form.Group controlId="itemQuantity" className="mt-2">
        <Form.Label>Quantity</Form.Label>
        <Form.Control
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
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
