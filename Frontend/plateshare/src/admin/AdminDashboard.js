import React from 'react';
import "./AdminDashboard.css";
import "../pages/Home/Menu";

function AdminDashboard () {
    return (

        <div className="App">
            <div className="sidebar">
                <h3 className="sidebar-heading">Admin Panel</h3>
                <ul className="sidebar-menu">
                    <li><a href="#" className='active'>Dashboard</a></li>
                    <li><a href="/order">Order</a></li>
                    <li><a href="/menu">Menu </a></li>
                    <li><a href="#">Donations</a></li>
                
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