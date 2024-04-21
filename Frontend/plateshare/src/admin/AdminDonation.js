import React from 'react'
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Footer from '../components/Footer';

 function AdminDonation() {
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
         <div class="container-fluid">
        <div class="row justify-content-around ">
          {donateList.map((item) => (
            <Card style={{ width: "18rem", marginBottom: "2rem" }}>
              <Card.Body>
                <Card.Title>
                  Donation Name:
                  {item.donate_name}
                </Card.Title>
                <Card.Text>
                  <Card.Title> Location</Card.Title>
                  {item.donated_location}
                </Card.Text>
                <Card.Text>
                  <Card.Title>Price</Card.Title>
                  {item.donated_price}
                </Card.Text>

                <Card.Text>
                  <Card.Title>Donated by</Card.Title>
                  {item.donated_by}
                </Card.Text>

                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <Footer/>
    </div>
  )
}
export default AdminDonation;