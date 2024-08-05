import React, { useState } from 'react';
import { db } from '../src/firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';

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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={item}
        onChange={(e) => setItem(e.target.value)}
        placeholder="Add pantry item"
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default PantryForm;
