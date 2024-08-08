import React, { useEffect, useState } from 'react';
import { db } from '../src/firebaseConfig';
import { collection, onSnapshot } from 'firebase/firestore';
import { ListGroup, Image } from 'react-bootstrap';

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
    <ListGroup style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px' }}>
      {items
        .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
        .map((item) => (
          <ListGroup.Item key={item.id} style={{ display: 'flex', alignItems: 'center' }}>
            {item.imageUrl && <Image src={item.imageUrl} rounded style={{ width: '50px', height: '50px', marginRight: '10px' }} />}
            {item.name} - Quantity: {item.quantity}
          </ListGroup.Item>
        ))}
    </ListGroup>
  );
};

export default PantryList;
