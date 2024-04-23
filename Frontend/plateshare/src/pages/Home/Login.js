import React, { useState } from 'react';
import '../../styles/Login.css';
import logoImage from '../../Assets/logo/logo2.png'
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Registration from './Registration';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);

        let login = 'http://localhost:10000/auth/login/'  // Backend API  URL for login 

        fetch(login, {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: {
                "Content-type": "application/json"
            },
            credentials: 'include'
        }).then(data => {
            data.json().then(body => {
                if (data.status === 200) {
                    alert('Login Successful');
                    if(data.role ==="admin"){
                        alert ("Admin Logged in sucessfully")
                    }
                    else{
                        window.location="http://localhost:3000/Menu"
                    }

                }
                
                else {
                    if (body?.data?.email) {
                        alert(body?.data?.email);
                    }
                    else if (body?.data?.password) {
                        alert(body?.data?.password);
                    }
                    else {
                        alert('Invalid Credentials');
                    }
                }
            })
        }).catch(e => {
            console.log(e)
        })
        // if (data.status === 200) {
        //     if (parsedData.role === "admin") {
        //       navigate("/admin-dashboard");
        //     } else if (parsedData.role === "guide") {
        //       navigate("/guide/complete");
        //     } else if (parsedData.role === "seller") {
        //       navigate("/seller/complete");
        //     } else {
        //       navigate("/AdminDashboard");
        //     }
            
        //   }
        
        //   if (data.status === 200) {
        //     if (parsedData.role === "admin") {
        //       navigate("/admin-dashboard");
        //     } else if (parsedData.role === "guide") {
        //       navigate("/guide/complete");
        //     } else if (parsedData.role === "seller") {
        //       navigate("/seller/complete");
        //     } else {
        //       navigate("/NgoDashboard");
        //     }
        //   }

    }
    return (

        <div className='container-login'>
            <div className="logo-login">
                <a href="/">
                    <img src={logoImage} alt="" width="120px" />
                </a>
            </div>

            <div className="header-login">
                <div className="text-login">Login</div>
                <div className="underline-login"></div>
            </div>

            <form>

                <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form1Example1">Email address</label>
                    <input required type="email" id="form1Example1" class="form-control" placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>

                <div data-mdb-input-init class="form-outline mb-4">
                    <label class="form-label" for="form1Example2">Password</label>
                    <input required  type="password" id="form1Example2" class="form-control" placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>

                <div class="row mb-4">

                

                    <div className="haveaccount-login mt-3  ">
                        Does not have account?
                        <Link to="/Registration">
                            <span>Register</span>

                        </Link>
                    </div>

                </div>


                <button type='submit' class="btn btn-primary btn-block" onClick={handleLogin}>Sign in</button>
            </form>

        </div>


    );
}

export default Login;