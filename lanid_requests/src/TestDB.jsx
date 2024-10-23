// src/components/ItemForm.js
import React, { useState } from "react";
import axios from "axios";

const ItemForm = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/items", {
        name,
        description,
      });
      console.log("Item created:", response.data);
    } catch (err) {
      console.error("Error creating item:", err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        required
      />
      <button type="submit">Add Item</button>
    </form>
  );
};

export default ItemForm;
