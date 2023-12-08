import React from 'react';
import header_jumbotron_bg from "./header_jumbotron_bg.jpg";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Login from './Login'; 


function Header() {
  return (
    <>
    <div className="main-title h2" s>Anti-Scatter: Release your Productivity!</div>
    <div className="jumbotron" style={{ backgroundImage: `url(${header_jumbotron_bg})` }}>

    {/* Google Translate Element */}
    <div id="google_translate_element" style={{ position: 'absolute', top: 0, right: 0, zIndex: 1000 }}></div>


  {/* TODO: add the logic to check if there is a user signed in. if there is a user, 
  change the text of this button to be 'HI, user!' else have it show the login button to the login page */}
  <Container>
    <div className="btn header-login-btn-wrapper">
      <Button  onClick={Login} variant="warning" className="header-login-btn">
      <div className="header-login-btn-text">Login</div></Button>
    </div>
    <p className="jumbotron-text">
      Don't have an account yet?  Please sign up here. 
    </p>
  </Container>

    </div>
    </>
  );
}

export default Header;
