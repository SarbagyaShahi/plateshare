import React, { useState } from 'react';
import './Register.css';
import logoImage from '../Assets/logo/logo.png';
import { useNavigate, Link } from 'react-router-dom';

function Registration() {
  const navigate = useNavigate();
  const [fname, setFName] = useState('');
  const [lname, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  // const [role, setRole] = useState('guest');
  const role = 'user';

  const handleRegister = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append('firstname', fname);
    formData.append('lastname', lname);
    formData.append('phone', phone);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('address', address);
    formData.append('role', role);

    let register = 'http://localhost:10000/auth/registration/'

    let registerResponse = await fetch(register, {
      method: 'POST',
      body: formData
    });

    let parsedData = await registerResponse.json();
    console.log(parsedData);


    if (registerResponse.status === 201) {
      alert('Registration Successful');
      setFName('');
      setLName('');
      setPhone('');
      setEmail('');
      setPassword('');
      setAddress('');
      navigate("/");
      return;
    }

    else {
      if (parsedData.email) {
        alert(parsedData.email);
      }
      else if (parsedData.phone) {
        alert(parsedData.phone);
      }
      else if (parsedData.password) {
        alert(parsedData.password);
      }
      else if (parsedData.firstname) {
        alert(parsedData.firstname);
      }
      else if (parsedData.lastname) {
        alert(parsedData.lastname);
      }
      else if (parsedData.address) {
        alert(parsedData.address);
      }
      else
        alert('Registration Failed');
    }
  }


  return (
    <div>
      <div className="logo-reg">
        <a href="/">
          <img src={logoImage} alt="" width="180px" />
        </a>
      </div>

      <div className='container-reg'>
        <div className="header-reg">
          <div className="text-reg">Register</div>
          <div className="underline-reg"></div>
        </div>

        <div className="inputs-reg">
          <div className='text-field-reg'>
            <div>
              <p>First Name</p>
              <input className="design-reg" type='text' placeholder='Enter Your First Name' value={fname} onChange={(e) => setFName(e.target.value)} />
            </div>

            <div>
              <p>Last Name</p>
              <input className="design-reg" type='text' placeholder='Enter Your Last Name' value={lname} onChange={(e) => setLName(e.target.value)} />
            </div>
          </div>

          <div className='text-field-reg'>
            <div>
              <p>Email</p>
              <input className="design-reg" type='text' placeholder='Enter Your Email' value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>

            <div>
              <p>Phone</p>
              <input className="design-reg" type='text' placeholder='Enter Your Phone' value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>

          <div className='text-field-reg'>
            <div>
              <p>Address</p>
              <input className="design-reg" type='text' placeholder='Enter Your Email' value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>

            <div>
              <p>Password</p>
              <input className="design-reg" type='text' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
          </div>
        </div>

        <div className="register-cointainer">
          <div className="register" onClick={handleRegister}>
            Register
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;