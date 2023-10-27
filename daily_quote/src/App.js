import React, { useState, useEffect } from 'react';
import './App.css';
import Quote from './Quote';

const App = () => {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    const category = 'happiness'; // Change this to your desired category
    const apiKey = 'cMaMA9kZvA5zQKEDBpIFvw==FFH42gO9nLTanwq8'; // Replace with your actual API key

    fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setQuote(data[0].quote);
          setAuthor(data[0].author);
        }
      })
      .catch((error) => {
        console.error('Error: ', error);
      });
  }, []); // The empty dependency array ensures this effect runs once on component mount

  return (
    <div className="App">
      <h1>Quote of the Day</h1>
      <Quote quote={quote} author={author} />
    </div>
  );
};

export default App;
