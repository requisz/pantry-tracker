import React, { useEffect, useState } from 'react';
import { db } from '../src/firebaseConfig';
import { collection, query, where, onSnapshot } from 'firebase/firestore';

const PantryList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'pantryItems'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const itemsArray = [];
      querySnapshot.forEach((doc) => {
        itemsArray.push({ id: doc.id, ...doc.data() });
      });
      setItems(itemsArray);
    });

    return () => unsubscribe();
  }, []);

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
};

export default PantryList;
