import React, { useState } from 'react';
import './App.css';

function App() {
  const [blockedWords, setBlockedWords] = useState([]);
  const [newWord, setNewWord] = useState('');

  const addBlockedWord = () => {
    if (newWord.trim() !== '') {
      setBlockedWords([...blockedWords, newWord.trim()]);
      setNewWord('');
    }
  };

  return (
    <div className="App">
      <h1>Blocked Words</h1>
      <div className="blocked-words">
        <ul>
          {blockedWords.map((word, index) => (
            <li key={index}>{word}</li>
          ))}
        </ul>
      </div>
      <div className="add-word">
        <input
          type="text"
          placeholder="Add a blocked word..."
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
        />
        <button onClick={addBlockedWord}>Add</button>
      </div>
    </div>
  );
}

export default App;