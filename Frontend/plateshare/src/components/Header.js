import React, { useEffect, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../Assets/logo/logo.png";
import "../styles/HeaderStyle.css";
import swal from "sweetalert";

const Header = () => {
  const [nav, setNav] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  // const Location =userLocation();
  // const shouldDisplayNavbar = ![
  //   "./pages/home/Homepage"
  // ]
  useEffect(()=> {
    const getToken = document.cookie.split("=")[1];
    if(getToken!== undefined)
     {
       setLoggedIn(true)
     }
  })
  const handleLogout = () => {
    swal({
      title: "Log out?",
      text: "Are you sure want to log out?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("http://localhost:10000/auth/logout", {

          method: "GET",
          credentials: "include",
         
        });
        localStorage.clear();
        swal("See you soon!", "", "success");
        window.location="http://localhost:3000"
      }
    });
  };
 
  // Scroll Navbar

  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        className={`${nav === true ? "sticky" : ""}`}
      >
        <Container>
          <Navbar.Brand href="#home"></Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {loggedIn === false ? (
                <>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/about">
                    About
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Login">
                    Login
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/">
                    Home
                  </Nav.Link>
                  <Nav.Link as={Link} to="/about">
                    About
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Menu">
                    Our Menu
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Articles">
                    Article
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Recipe">
                    Recipes
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Event">
                    Events
                  </Nav.Link>
                  <Nav.Link as={Link} to="/Donation">
                    Donation
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout}>
                    <i class="fa-solid fa-right-from-bracket"></i>
                    Logout
                  </Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
