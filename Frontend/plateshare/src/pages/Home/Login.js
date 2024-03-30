import React, { useState } from 'react';
import '../../styles/Login.css';
import logoImage from '../../Assets/logo/logo.png'
import { useNavigate, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

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
                    navigate("/Menu");
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


    }
    return (

        <div>
            <div className="logo-login">
                <a href="/">
                    <img src={logoImage} alt="" width="90px" />
                </a>
            </div>


            <div className='container-login'>
                <div className="header-login">
                    <div className="text-login">Login</div>
                    <div className="underline-login"></div>
                </div>


                <div className="inputs-login">
                    <div className='text-field-login'>
                        <p>Email</p>
                        <input className="design-login" type='text' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>

                    <div className='text-field-login'>
                        <p>Password</p>
                        <input className="design-login" type='text' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>



                </div>
                <div className="forget-password-login">
                    Forget Password? <span>Click here</span>
                </div>

                <div className="submit-container-login">
                    <div className="submit" >
                    <Button variant="info"onClick={handleLogin}>login</Button>
                        
                    </div>
                </div>
                <div className="haveaccount-login">
                    Does not have account?
                    <Link to="/register">
                        <span>Register</span>
                    </Link>
                </div>
            </div>
        </div>

    );
}

export default Login;