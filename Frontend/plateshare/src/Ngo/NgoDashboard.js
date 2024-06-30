import React from 'react';
import "./NgoDashboard.css";
import { useState,useEffect } from 'react';
import swal from "sweetalert";
function NgoDashboard() {
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
        
            swal("See you soon!", "", "success");
            window.location = "http://localhost:3000/";
          }
        });
      };
   
    return (

        <div className="App">
            
            <div className="sidebar">
                <h3 className="sidebar-heading">Ngo Panel</h3>
                <ul className="sidebar-menu">
                    <li><a href="/NgoDashboard">Ngo pannel</a></li>

                    <li><a href="/NgoDonation">Donation</a></li>
                    <li><a href="/NgoArticle">Article</a></li>
                    <li><a href="/NgoEvent">Event</a></li>
                 
                    <li onClick={handleLogout}>
            <i class="fa-solid fa-right-from-bracket"> </i> signout
          </li>
                </ul>
            </div>

            <div className="content">
                <h2>Dashboard</h2>
                <p>Welcome to the Ngo dashboard.</p>
            </div>
        </div>

    )
}
export default NgoDashboard;