import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import header_jumbotron_bg from "./header_jumbotron_bg.jpg";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import axios from "axios";


function Header() {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  const [storedToken, setStoredToken] = useState("");

  useEffect(() => {
    const verifyCookie = async () => {
        try {
            setStoredToken(localStorage.getItem("token"));
            if (!storedToken) {
                setLoggedIn(false);
                loggedOut();
                // If there is no 'token' cookie, return loggedOut() function.
            }
            
            // If there is a 'token' cookie, send a POST request to the server to verify it.
            const { data } = await axios.post(
                "https://anti-scatter-36f9c5f65c17.herokuapp.com/",
                {token: storedToken}
            );
    
            const { status, user } = data;
            setUsername(user.username);
            // Set the 'username' state with the user's name from the response.
    
            return status
                ? (console.log(`Verified ${user.username}!`), setLoggedIn(true), loggedIn)
                : (localStorage.removeItem("token"), setLoggedIn(false), loggedOut());
            // If the authentication is successful (status is true), console.log().
            // If not, remove the 'token' cookie, and return loggedOut() function.
        } catch (error) {
            console.log("Error verifying cookie:", error);
            loggedOut();
        }
    };

    verifyCookie();

}, [username, storedToken]); // Trigger the fetch when the component mounts

  // Quote of the Day
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
  }, [quote, quoteDate]);

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

  const handleLogin = () => {
    navigate("/login");
  }

  const loggedIn = () => {
    return (
      <>
      <div className="main-title h2" s>Anti-Scatter: Release your Productivity!</div>
      <div className="jumbotron" style={{ backgroundImage: `url(${header_jumbotron_bg})` }}>
        <Container>
          <div className="btn header-login-btn-wrapper">
            <Button variant="warning" className="header-login-btn">
              <div className="header-login-btn-text">Hi, {username}!</div>
            </Button>
          </div>
          <div className="quote-container">
            <blockquote>{quote} - {quoteAuthor}</blockquote>
          </div>
        </Container>
      </div>
      </>
    )
  }

  const loggedOut = () => {
    return (
      <>
      <div className="main-title h2" s>Anti-Scatter: Release your Productivity!</div>
      <div className="jumbotron" style={{ backgroundImage: `url(${header_jumbotron_bg})` }}>

      <Container>
        <div className="btn header-login-btn-wrapper">
          <Button  onClick={handleLogin} variant="warning" className="header-login-btn">
          <div className="header-login-btn-text">Login</div></Button>
        </div>
        <p className="jumbotron-text">
          Don't have an account yet? <Link to={"/signup"}> Please sign up here. </Link>
        </p>
      </Container>

      </div>
      </>
    )
  }

  return (
    <>
    {isLoggedIn ? loggedIn() : loggedOut()}
    </>
  )
}

export default Header;
