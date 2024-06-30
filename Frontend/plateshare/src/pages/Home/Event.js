import React from "react";
import { Card, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function Event() {
  const [eventList, seteventList] = useState([]);
  const fetcheventList = () => {
    fetch("http://localhost:10000/Event/get_event")
      .then((response) => response.json())
      .then((data) => {
        seteventList(data.data);
        console.log(eventList);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  useEffect(() => {
    fetcheventList();
  }, []);
  return (
    <div>
      <div class="container-fluid">
        <div class="row justify-content-around ">
          <Header />
          {eventList.map((item) => (
            <Card style={{ width: "18rem", marginBottom: "2rem" }}>
              <Card.Body>
                <>
                  <img
                    width={200}
                    src={`http://localhost:10000/public/images/${item.event_Image}`}
                    style={{ marginBottom: "10px" }}
                  />
                </>
                <Card.Title>
                  <b>Event Name:</b>
                  <br />
                  {item.event_name}
                </Card.Title>
                <Card.Text>
                  <b>Event Location:</b>
                  <br />
                  {item.event_location}
                </Card.Text>
                <Card.Text>
                  <b>Event time:</b>
                  <br />
                  {item.event_time}
                </Card.Text>

                <Card.Text>
                  <b>Event description:</b>
                  <br />
                  {item.event_description}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default Event;
