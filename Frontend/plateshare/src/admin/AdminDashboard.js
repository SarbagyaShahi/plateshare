import React from 'react';
import "./AdminDashboard.css";
import "../pages/Home/Menu";
import swal from "sweetalert";
function AdminDashboard () {

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
            window.location="http://localhost:3000/"
          }
        });
      };
    return (

        <div className="App">
            <div className="sidebar">
                <h3 className="sidebar-heading">Admin Panel</h3>
                <ul className="sidebar-menu">
                    <li><a href="/AdminDashboard">Dashboard</a></li>
                    <li><a href="/AdminOrder">Order</a></li>  
                    <li><a href="/MenuDash">Menu </a></li>
                    <li><a href="AdminDonation">Donations</a></li>
                    <li onClick={handleLogout}><i class="fa-solid fa-right-from-bracket"> </i> signout</li>

                
                </ul>
            </div>
s
            <div className="content">
                <h2>Dashboard</h2>
                <p>Welcome to the admin dashboard.</p>

            </div>
            
          
        </div>
    

    )
}
export default AdminDashboard;