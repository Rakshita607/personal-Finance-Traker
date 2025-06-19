import React, { useState, useEffect } from "react";

const TransactionForm = ({ addTransaction }) => {
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("General");
  const [customCategories, setCustomCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  
  useEffect(() => {
    const storedCategories =
      JSON.parse(localStorage.getItem("customCategories")) || [];
    setCustomCategories(storedCategories);
  }, []);

  
  useEffect(() => {
    localStorage.setItem(
      "customCategories",
      JSON.stringify(customCategories)
    );
  }, [customCategories]);

  const handleAdd = (e) => {
    e.preventDefault();

    if (amount && description) {
      addTransaction({
        id: Date.now(),
        amount: parseFloat(amount),
        description,
        type,
        category,
      });

      
      setAmount(0);
      setDescription("");
      setType("income");
      setCategory("General");
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();

    if (newCategory.trim()) {
      setCustomCategories((prev) => [...prev, newCategory.trim()]);
      setNewCategory("");
    }
  };

  return (
    <form onSubmit={handleAdd}>
      <h3>Add Transaction</h3>

      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <select value={type} onChange={(e) => setType(e.target.value)}>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="General">General</option>
        {customCategories.map((cat, idx) => (
          <option key={idx} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      <button type="submit">Add Transaction</button>

      <div>
        <input
          type="text"
          placeholder="Add new category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />
        <button onClick={handleAddCategory}>Add Category</button>
      </div>
    </form>
  );
};

export default TransactionForm;
