import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/Home/About";
import Login from "./pages/Home/Login";
import Menu from "./pages/Home/Menu";
import Registration from "./pages/Home/Registration";
import Cartpage from "./pages/Home/Cartpage";
import AdminDashboard from "./admin/AdminDashboard";
import MenuDash from "./admin/MenuDash";
import Recipe from "./pages/Home/Recipe";
import NgoArticle from "./Ngo/NgoArticle";


import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NgoDashboard from "./Ngo/NgoDashboard";



function App() {

  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          < Route path="/Login" element={<Login />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Registration" element={<Registration />} />
          <Route path="/CartPage" element={<Cartpage />} />
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/MenuDash" element={<MenuDash />} />
          <Route path="/Recipe" element={<Recipe />} />
          <Route path="/NgoDashboard" element={<NgoDashboard />} />
          <Route path="/NgoArticle" element={<NgoArticle />} />
         
        </Routes>
      </Router>
 

  );
}

export default App;