import React, { useEffect, useState } from 'react';
import { db } from '../src/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { ListGroup } from 'react-bootstrap';

const PantryList = ({ searchQuery }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = collection(db, 'pantryItems');
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const itemsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ListGroup>
      {items
        .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((item) => (
          <ListGroup.Item key={item.id}>
            {item.name} - Quantity: {item.quantity}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default PantryList;
