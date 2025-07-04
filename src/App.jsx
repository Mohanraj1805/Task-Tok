import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [todosItems, setTodosItems] = useState([]);
  const [inputChange, setInputChange] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currId, setCurrId] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false); // 🌙 Dark Mode state

  const handleCheck = (id) => {
    const updated = todosItems.map((item) =>
      item.id === id ? { ...item, checked: !item.checked } : item
    );
    setTodosItems(updated);
  };

  const handleedit = (id) => {
    const itemedit = todosItems.find((i) => i.id === id);
    if (itemedit) {
      setInputChange(itemedit.label);
      setCurrId(id);
      setIsEditing(true);
    }
  };

  const handleaddorsave = () => {
    if (inputChange.trim() === "") return; // prevent empty
    if (isEditing) {
      const updatingthetodo = todosItems.map((item) =>
        item.id === currId ? { ...item, label: inputChange } : item
      );
      setTodosItems(updatingthetodo);
    } else {
      setTodosItems([
        ...todosItems,
        { id: todosItems.length + 1, label: inputChange, checked: false },
      ]);
    }
    setInputChange("");
    setIsEditing(false);
    setCurrId(null);
  };

  const handledelete = (id) => {
    const deletedtodo = todosItems
      .filter((item) => item.id !== id)
      .map((item, index) => {
        return { ...item, id: index + 1 };
      });
    setTodosItems(deletedtodo);
  };

  return (
    <main className={`app-container ${isDarkMode ? "dark" : ""}`}>
      <div className="background-animation">
        <div className="emoji">🌮</div>
        <div className="emoji">🍕</div>
        <div className="emoji">😂</div>
        <div className="emoji">🎉</div>
        <div className="emoji">🍔</div>
        <div className="emoji">🍩</div>
        <div className="emoji">🕺</div>
        <div className="emoji">💃</div>
      </div>
      <div className="todo-box">
        <div className="header">
          <h1>🎨 TASK TOK 📝</h1>
          <button
            className="dark-mode-toggle"
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
        <div className="input-section">
          <input
            type="text"
            placeholder="What's on your mind? 💭"
            value={inputChange}
            onChange={(e) => setInputChange(e.target.value)}
          />
          <button onClick={handleaddorsave}>
            {isEditing ? "✅ Save" : "➕ Add"}
          </button>
        </div>
        <ul>
          {todosItems.map((item) => (
            <li key={item.id} className={item.checked ? "completed" : ""}>
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => handleCheck(item.id)}
              />
              <span>{item.label}</span>
              <div className="btn-group">
                <button onClick={() => handleedit(item.id)}>✏️</button>
                <button onClick={() => handledelete(item.id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default App;
