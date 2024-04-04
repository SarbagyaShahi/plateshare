import React from 'react';
import "../styles/AdminDashboard"

function AdminDashboard () {
    return (

        <div className="App">
            <div className="sidebar">
                <h3 className="sidebar-heading">Admin Panel</h3>
                <ul className="sidebar-menu">
                    <li><a href="#" className='active'>Dashboard</a></li>
                    <li><a href="/room_dash">Order</a></li>
                    <li><a href="#">Menu </a></li>
                    <li><a href="#">Donations</a></li>
                
                </ul>
            </div>

            <div className="content">
                <h2>Dashboard</h2>
                <p>Welcome to the admin dashboard.</p>
            </div>
        </div>

    )
}
export default AdminDashboard;