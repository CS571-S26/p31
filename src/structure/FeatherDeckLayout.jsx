import { Container, Nav, Navbar } from "react-bootstrap";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./../App.css";

function FeatherDeckLayout() {
  return (
    <div>
      <Navbar variant="dark" className="fd-navbar">
        <Container>
          <Navbar.Brand as={Link} to="/">Feather Deck</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/browsebirds">Browse Birds</Nav.Link>
            <Nav.Link as={Link} to="/decks">Decks</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <Container>
        <Outlet />
      </Container>
    </div>
  );
}

export default FeatherDeckLayout;