import React, { useState } from 'react';
import '../../styles/Registration.css';
import logoImage from '../../Assets/logo/logo.png'
import { useNavigate, Link } from 'react-router-dom';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput
}
  from 'mdb-react-ui-kit';
function Registration() {
  const navigate = useNavigate();
  const [first_name, setfirst_name] = useState('');
  const [last_name, setlast_name] = useState('');
  const [number, setnumber] = useState('');

  const [email, setemail] = useState('');
  const [address, setaddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');

  // const [role, setRole] = useState('user');
  const role = 'user';

  const handleRegister = async (e) => {
    e.preventDefault();
    let register = 'http://localhost:10000/auth/register/'

    let registerResponse = await fetch(register, {
      method: 'POST',
      // body: formData
      body: JSON.stringify({ first_name, last_name, number, email, address, password, confirmPassword }),
      headers: {
        "Content-type": "application/json"
      },
      credentials: 'include'
    }).then(data => {
      data.json().then(body => {
        console.log(body)
        if (data.status === 200) {
          alert('User created');
          navigate("/Login");
        }
        else {
          if (body?.data?.email) {
            alert(body?.data?.email);
          }
          else if (body?.data?.password) {
            alert(body?.data?.password);
          }
          else {
            alert(body?.message);
          }
        }
      })
    }).catch(e => {
      console.log(e)
    })




  }


  return (
    <MDBContainer fluid>

      <MDBRow className='justify-content-center align-items-center m-5'>

        <MDBCard>
          <MDBCardBody className='px-4'>
            <div className="header-login mb-3">
              <div className="text-login">Register</div>
              <div className="underline-login"></div>
            </div>

            <MDBRow>

              <MDBCol md='6'>
                <label>First Name</label>
                <MDBInput required wrapperClass='mb-4' size='lg' id='form1' type='text' placeholder='Enter Your First Name' value={first_name} onChange={(e) => setfirst_name(e.target.value)} />
              </MDBCol>

              <MDBCol md='6'>
                <label>Last Name</label>
                <MDBInput required wrapperClass='mb-4' size='lg' id='form2' type='text' placeholder='Enter Your Last Name' value={last_name} onChange={(e) => setlast_name(e.target.value)} />
              </MDBCol>

            </MDBRow>

            <MDBRow>

              <MDBCol md='6'>
                <label>Email</label>
                <MDBInput required wrapperClass='mb-4' size='lg' id='form3' placeholder='Enter Your Email' value={email} onChange={(e) => setemail(e.target.value)} />
              </MDBCol>

              <MDBCol md='6'>
                <label>Phone</label>
                <MDBInput required wrapperClass='mb-4' size='lg' id='form3' type='number' placeholder='Enter Your Phone' value={number} onChange={(e) => setnumber(e.target.value)} />
              </MDBCol>

            </MDBRow>

            <MDBRow>

              <MDBCol md='6'>
                <label>Address</label>
                <MDBInput required wrapperClass='mb-4' size='lg' id='form4' type='text' placeholder='Enter Your Address' value={address} onChange={(e) => setaddress(e.target.value)} />
              </MDBCol>



            </MDBRow>

            <MDBRow>

              <MDBCol md='6'>
                <label>Password</label>
                <MDBInput required wrapperClass='mb-4' size='lg' id='form4' type='password' placeholder='Enter Your Password' value={password} onChange={(e) => setPassword(e.target.value)} />
              </MDBCol>

              <MDBCol md='6'>
                <label>Confirm Password</label>
                <MDBInput required wrapperClass='mb-4' size='lg' id='form5' type='password' placeholder='Enter Your Password' value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
              </MDBCol>

            </MDBRow>


            <button type='submit' class="btn btn-primary btn-block " onClick={handleRegister}>Register</button>


            <div className="haveaccount-login mt-5" style={{textAlign: "center"}}>
              Already have account?
              <Link to="/Login">
                <span>Login</span>

              </Link>
            </div>


          </MDBCardBody>
        </MDBCard>

      </MDBRow>
    </MDBContainer>
  );
}

export default Registration;
