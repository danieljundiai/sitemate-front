import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [id, setId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    const response = await axios.get('http://localhost:3000/item');
    setItems(response.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description) {
      alert('Id, Title and description are required');
      return;
    }
    const newItem = { id: id, title: title, description: description };
    await axios.post('http://localhost:3000/item', newItem);
    setId('');
    setTitle('');
    setDescription('');
    fetchItems(); 
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/item/${id}`);
      fetchItems();
    } catch (error) {
      console.error(`Failed to delete item with id ${id}:`, error);
    }
  };

  return (
    <div className="App">
      <h1>Items</h1>
      <form onSubmit={handleSubmit}>
      <input
          type="number"
          placeholder="Id"
          value={id}
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map((item) => (
          <li key={item.id} onClick={() => handleDelete(item.id)} style={{ cursor: 'pointer' }}>
            {item.id} - {item.title} - {item.description}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
