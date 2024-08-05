import React, { useState } from 'react';
import { db } from '../src/firebaseConfig';
import { doc, query, where, getDocs, updateDoc, deleteDoc, collection } from 'firebase/firestore';
import { Form, Button } from 'react-bootstrap';

const RemoveItem = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const handleRemove = async (e) => {
    e.preventDefault();
    try {
      const q = query(collection(db, 'pantryItems'), where('name', '==', item));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const existingItem = querySnapshot.docs[0];
        const existingItemRef = doc(db, 'pantryItems', existingItem.id);
        const currentQuantity = existingItem.data().quantity;
        if (currentQuantity > quantity) {
          await updateDoc(existingItemRef, { quantity: currentQuantity - quantity });
          setMessage(`${quantity} of ${item} removed from pantry.`);
        } else {
          await deleteDoc(existingItemRef);
          setMessage(`${item} removed from pantry.`);
        }
      } else {
        setMessage("Item not in pantry.");
      }
      setItem('');
      setQuantity(1);
    } catch (error) {
      console.error("Error removing document: ", error);
      setMessage("Error removing item.");
    }
  };

  return (
    <Form onSubmit={handleRemove}>
      <Form.Group controlId="removeItem">
        <Form.Label>Pantry Item</Form.Label>
        <Form.Control
          type="text"
          value={item}
          onChange={(e) => setItem(e.target.value)}
          required
        />
      </Form.Group>
      <Form.Group controlId="removeQuantity" className="mt-2">
        <Form.Label>Quantity to Remove</Form.Label>
        <Form.Control
          type="text"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          required
        />
      </Form.Group>
      <Button variant="danger" type="submit" className="mt-2">
        Remove Item
      </Button>
      {message && <p className="mt-2">{message}</p>}
    </Form>
  );
};

export default RemoveItem;
