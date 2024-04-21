import React from 'react';
import "./NgoDashboard.css";


function NgoDashboard() {
    return (

        <div className="App">
            <div className="sidebar">
                <h3 className="sidebar-heading">Ngo</h3>
                <ul className="sidebar-menu">
                    <li><a href="#" className='active'>Dashboard</a></li>
                    <li><a href="/order">Article</a></li>

                    <li><a href="#">Donations</a></li>
                    <li><a href="#">Donations</a></li>

                </ul>
            </div>
            s
            <div className="content">
                <h2>Dashboard</h2>
                <p>Welcome to the Ngo dashboard.</p>
            </div>
        </div>

    )
}
export default NgoDashboard;