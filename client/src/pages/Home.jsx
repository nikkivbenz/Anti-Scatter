import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
// Start of Home and Login
const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState("");


  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        navigate("/login");
      }
      const { data } = await axios.post(
        "http://localhost:4000",
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return status
          ? toast(`Hello ${user}`, {
              position: "top-right",
          })
          : (removeCookie("token"), navigate("/login"));
      };
      verifyCookie();
  }, [cookies, navigate, removeCookie]);

  const Logout = () => {
    removeCookie("token");
    navigate("/signup");
  };
   // End of Login and Home

  // Start of Quote of the Day

  const [quote, setQuote] = useState("");
  const [quoteAuthor, setQuoteAuthor] = useState("");
  const [quoteDate, setQuoteDate] = useState('');
  const [isQuoteRefreshing, setIsQuoteRefreshing] = useState(false); 

  useEffect(() => {
    // Check if a stored quote exists for today
    const storedQuote = localStorage.getItem('quoteOfTheDay');
    const storedQuoteAuthor = localStorage.getItem('quoteAuthor');
    const storedQuoteDate = localStorage.getItem('quoteDate');
    const currentDate = new Date().toLocaleDateString();

    if (storedQuote && storedQuoteDate === currentDate) {
      setQuote(storedQuote);
      setQuoteAuthor(storedQuoteAuthor);
    } else {
      // Fetch a new quote if none exists for today
      fetchQuoteOfTheDay();
    }
  }, []);

  const fetchQuoteOfTheDay = () => {
    // Fetch a new quote from the API
    fetch('https://type.fit/api/quotes')
      .then((resp) => resp.json())
      .then((data) => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const newQuote = data[randomIndex].text;
        const newQuoteAuthor = data[randomIndex].author || 'Unknown';
        setQuote(newQuote);
        setQuoteAuthor(newQuoteAuthor);
        setQuoteDate(new Date().toLocaleDateString());
        setIsQuoteRefreshing(false);

        // Store the new quote in local storage
        localStorage.setItem('quoteOfTheDay', newQuote);
        localStorage.setItem('quoteAuthor', newQuoteAuthor);
        localStorage.setItem('quoteDate', new Date().toLocaleDateString());
      });
  };

  const refreshQuote = () => {
    setIsQuoteRefreshing(true);
    fetchQuoteOfTheDay();
  };
// End of Quote of the Day

// Display
  return (
    <>
      <div className="home_page">
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={Logout}>LOGOUT</button>
      </div>
      <div className="quote-container">
        <h1>Quote of the Day</h1>
        <blockquote>{quote}</blockquote>
        <p>- {quoteAuthor}</p>
        <button onClick={refreshQuote} disabled={isQuoteRefreshing}>
          {isQuoteRefreshing ? 'Refreshing...' : 'Get Another Quote'}
        </button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Home;
