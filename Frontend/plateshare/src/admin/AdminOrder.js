import React from "react";
import { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";

import { Table } from "react-bootstrap";
import swal from "sweetalert";

function AdminOrder() {
  const [orderList, setorderList] = useState([]);
  const fetchOrderList = () => {
    fetch("http://localhost:10000/order/get_order")
      .then((response) => response.json())
      .then((data) => {
        setorderList(data.data);
        console.log(orderList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleLogout = () => {
    swal({
      title: "Log out?",
      text: "Are you sure want to log out?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("http://localhost:10000/auth/logout", {
          method: "GET",
          credentials: "include",
        });
        localStorage.clear();
        swal("See you soon!", "", "success");
        window.location = "http://localhost:3000/";
      }
    });
  };
  useEffect(() => {
    fetchOrderList();
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
        fetchOrderList();
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
            <a href="/AdminDashboard">Dashboard</a>
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
          <li onClick={handleLogout}>
            <i class="fa-solid fa-right-from-bracket"> </i> signout
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

          <h2 className="mt-5 mb-3 text-start">Order Details</h2>
          {console.log(orderList)}
          <Table responsive>
            <thead>
              <tr>
                <th>ID</th>
                <th>Order_items:</th>
                <th>Order Price</th>

                <th>Order Location</th>
                <th>Ordered by</th>
               
              </tr>
            </thead>

            <tbody>
              {orderList &&
                orderList.map((orderList) => (
                  <tr key={orderList.Id}>
                    <td>{orderList.Id}</td>
                    <td>{orderList.items.map((item) => (<p>{item.menu_name}</p>))}</td>
                    <td>{orderList.order_totalprice}</td>
                    <td>{orderList.order_location}</td>
                    <td>{orderList.ordered_by}</td>
      
                    <td></td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
}
export default AdminOrder;
