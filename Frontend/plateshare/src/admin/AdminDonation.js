import React from "react";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import Footer from "../components/Footer";
import { Table } from "react-bootstrap";

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
  const handleDelete = (Id) => {
    console.log(Id);
    fetch(`http://localhost:10000/donate/delete_donate?id=${Id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        //       // Optionally, refresh the room list after a successful delete
        fetchDonateList();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <div className="sidebar">
        <h3 className="sidebar-heading">Admin Panel</h3>
        <ul className="sidebar-menu">
          <li>
            <a href="#" className="active">
              Dashboard
            </a>
          </li>
          <li>
            <a href="/AdminOrder">Order</a>
          </li>
          <li>
            <a href="/MenuDash">Menu </a>
          </li>
          <li>
            <a href="AdminDonation">Donations</a>
          </li>
        </ul>
      </div>

      <div class="content">
        <div class="row justify-content-around ">
          {/* {donateList.map((item) => (
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
          ))} */}
          
          <h2 className="mt-5 mb-3 text-start">Donation Details</h2>

          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Donation Name:</th>
                <th>Location</th>
                <th>Donated by</th>
                <th>Price</th>
                <th>Manage Donation</th>

        
              </tr>
            </thead>

            <tbody>
              {donateList.map((donateList) => (
                <tr key={donateList.Id}>
                  <td>{donateList.Id}</td>
                  <td>{donateList.donate_name}</td>

                  <td>{donateList.donation_location}</td>
                  <td>{donateList.donated_by}</td>
                  <td>{donateList.donated_price}</td>

                  <td>
                    <Button
                      variant="danger"
                      onClick={() => handleDelete(donateList.Id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default AdminDonation;
