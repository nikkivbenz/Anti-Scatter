import React from "react";
import header_jumbotron_bg from "./header_jumbotron_bg.jpg";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

function Header() {
  return (
    <>
      <div className="main-title h2" s>
        Anti-Scatter: Release your Productivity!
      </div>
      <div
        className="jumbotron"
        style={{ backgroundImage: `url(${header_jumbotron_bg})` }}
      >
        <Container>
          <div className="btn header-login-btn-wrapper">
            <Button variant="warning" className="header-login-btn" href="/">
              <div className="header-login-btn-text">Login</div>
            </Button>{" "}
          </div>
          <p className="jumbotron-text">
            Don't have an account yet? Please sign up here.{" "}
          </p>
        </Container>

        {/* <p className="lead">
        This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
      </p>
      <hr className="my-4" /> */}
        {/* <p>
        It uses utility classes for typography and spacing to space content out within the larger container.
      </p>
      <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a> */}
      </div>
    </>
  );
}

export default Header;
