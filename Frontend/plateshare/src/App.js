import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import About from "./pages/Home/About";
import Login from "./pages/Home/Login";
import Menu from "./pages/Home/Menu";
import Registration from "./pages/Home/Registration";

import AdminDashboard from "./admin/AdminDashboard";
import MenuDash from "./admin/MenuDash";
import Recipe from "./pages/Home/Recipe";
import NgoArticle from "./Ngo/NgoArticle";


import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import NgoDashboard from "./Ngo/NgoDashboard";
import Articles from "./pages/Home/Articles";
import Donation from "./pages/Home/Donation";
import Ngoevent from "./Ngo/Ngoevent";
import Event from "./pages/Home/Event";
import AdminDonation from "./admin/AdminDonation";
import NgoDonation from "./Ngo/NgoDonation";
import AdminOrder from "./admin/AdminOrder";


function App() {

  return (
    
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/About" element={<About />} />
          < Route path="/Login" element={<Login />} />
          <Route path="/Menu" element={<Menu />} />
          <Route path="/Registration" element={<Registration />} />
        
          <Route path="/AdminDashboard" element={<AdminDashboard />} />
          <Route path="/MenuDash" element={<MenuDash />} />
          <Route path="/Recipe" element={<Recipe />} />
          <Route path="/NgoDashboard" element={<NgoDashboard />} />
          <Route path="/NgoArticle" element={<NgoArticle />} />
          <Route path="/Articles" element={<Articles />} />
          <Route path="/Ngoevent" element={<Ngoevent />} />
          <Route path="/Donation" element={<Donation/>} />
          <Route path="/Event" element={<Event/>}/>
          <Route path="/AdminDonation" element={<AdminDonation/>}/>
          <Route path="/NgoDonation" element={<NgoDonation/>}/>
          <Route path="/AdminOrder" element={<AdminOrder/>}/>
         
         
        </Routes>
      </Router>
 

  );
}

export default App;