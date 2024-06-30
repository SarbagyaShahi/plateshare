import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";

import Header from "../../components/Header";
import Card from "react-bootstrap/Card";
import { useEffect } from "react";
import Footer from "../../components/Footer";

import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBTextArea,
  MDBFile,
} from "mdb-react-ui-kit";

function Donation() {
  const cookie= document.cookie;
  console.log(cookie)
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  }
  
  // Usage:
  const _name = getCookie('userName');
  const name=decodeURIComponent(_name)

  
  const [donate_name,setdonatename] =useState("");


  const [donated_price,setdonatedprice] = useState("");
  const [donation_location,setdonationlocation] = useState("");

  const getInitialCount = () => {
    const savedCount = localStorage.getItem('count');
    return savedCount !== null ? Number(savedCount) : 0;
  };

  const [count, setCount] = useState(getInitialCount);

  useEffect(() => {
 
    localStorage.setItem('count', count);
  
    
  }, [count]);

  const handlePost = async (e) => {
    e.preventDefault();

    let formData = new FormData();

    formData.append("donate_name",donate_name);
    formData.append("donated_by",name);

    formData.append("donated_price",donated_price);
    formData.append("donation_location",donation_location);

    let addDonate = "http://localhost:10000/donate/create_donate";

    let addDonateResponse = await fetch(addDonate, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    console.log(formData);
    let parsedData = await addDonateResponse.json();
    console.log(parsedData);
    console.log(formData);

    if (addDonateResponse.status === 200) {
      alert("You have successfully donated the food our team will connect to you");
      setCount(prevCount => {
        const newCount = prevCount + 1;
        if (newCount === 3) {
          alert('Count is 3');
          return 0; // Reset count to 0 if it reaches 3
        }
        return newCount;
      });
      window.location.reload();
    } else {
      if (parsedData.donate_name) {
        alert(parsedData.donate_name);
      } else if (parsedData.donated_by) {
        alert(parsedData.donated_by);
      } else if (parsedData.donation_location) {
        alert(parsedData.donation_location);
      } else if (parsedData.donated_price) {
        alert(parsedData.donated_price);
      } 
    }
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [donateList, setdonateList] = useState([]);
  const fetchDonateList = () => {
    fetch("http://localhost:10000/donate/get_donate")
      .then((response) => response.json())
      .then((data) => {
        setdonateList(data.data);
        console.log(donateList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetchDonateList();
  }, []);


  return (
    <div>
      <Header />


      <MDBContainer fluid>
        <MDBRow className="d-flex justify-content-center align-items-center">
          <MDBCol lg="9" className="my-5">
            
            <h1 class="text mb-4">Donation </h1>
            <p>Donate Food save life</p>

            <MDBCard>
              <MDBCardBody className="px-4">
                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Food Name</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      size="lg"
                      id="form1"
                      type="text"
                      value={donate_name}
                      onChange={(e) => setdonatename(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />
                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Donation Location</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                  <MDBInput
                      size="lg"
                      id="form2"
                      type="email"
                      value={donation_location}
                      onChange={(e) => setdonationlocation(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Donate Price </h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBInput
                      size="lg"
                      id="form2"
                      type="email"
                      value={donated_price}
                      onChange={(e) => setdonatedprice(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow>

                <hr className="mx-n3" />

              
                {/* <MDBRow className="align-items-center pt-4 pb-3">
                  <MDBCol md="3" className="ps-5">
                    <h6 className="mb-0">Donated by</h6>
                  </MDBCol>

                  <MDBCol md="9" className="pe-5">
                    <MDBTextArea
                      id="textAreaExample"
                      rows={3}
                      value={donated_by}
                      onChange={(e) => setdonatedby(e.target.value)}
                    />
                  </MDBCol>
                </MDBRow> */}
               
                <button  class="btn btn-primary btn-block" onClick={handlePost}>Donate</button>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>

    
      <Footer />
    </div>
  );
}

export default Donation;
