import React, { useState } from 'react';
import { db, storage } from '../src/firebaseConfig';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { Form, Button } from 'react-bootstrap';

const PantryForm = () => {
  const [item, setItem] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = '';
    try {
      if (image) {
        const storageRef = ref(storage, `images/${image.name}`);
        const snapshot = await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      const q = query(collection(db, 'pantryItems'), where('name', '==', item));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const existingItem = querySnapshot.docs[0];
        const existingItemRef = doc(db, 'pantryItems', existingItem.id);
        const newQuantity = existingItem.data().quantity + quantity;
        await updateDoc(existingItemRef, { quantity: newQuantity, imageUrl: imageUrl || existingItem.data().imageUrl });
      } else {
        await addDoc(collection(db, 'pantryItems'), {
          name: item,
          quantity: quantity,
          imageUrl: imageUrl,
        });
      }
      setItem('');
      setQuantity(1);
      setImage(null);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <Form onSubmit={handleSubmit} style={{ background: 'rgba(255, 255, 255, 0.8)', padding: '20px', borderRadius: '10px', marginBottom: '20px', width: '100%' }}>
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
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
          required
        />
      </Form.Group>
      <Form.Group controlId="itemImage" className="mt-2">
        <Form.Label>Image</Form.Label>
        <Form.Control
          type="file"
          onChange={handleImageChange}
        />
      </Form.Group>
      <Button variant="primary" type="submit" className="mt-2">
        Add Item
      </Button>
    </Form>
  );
};

export default PantryForm;
