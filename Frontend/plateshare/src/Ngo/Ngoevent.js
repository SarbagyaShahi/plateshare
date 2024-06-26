import React, { useState, useEffect } from "react";
import "../admin/AdminDashboard.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import swal from "sweetalert";
function NgoEvent() {
  const [event_name, seteventname] = useState("");
  const [event_location, seteventlocation] = useState("");
  const [event_time, seteventtime] = useState("");
  const [event_descripion, seteventdescription] = useState("");
  const [event_Image, seteventImage] = useState("");

  
 

  const handleEvent = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("eventImage", event_Image);
    if (event_Image && event_Image.length > 0) {
      formData.append("eventImage", event_Image[0]);
    }
    formData.append("event_name", event_name);
    formData.append("event_location", event_location);
    formData.append("event_time", event_time);
    formData.append("event_description", event_descripion);
    formData.append("event_Image", event_Image);

    let addEvent = "http://localhost:10000/event/create_event";

    let addEventResponse = await fetch(addEvent, {
      method: "POST",
      body: formData,
      credentials: "include",
    });
    console.log(formData);
    let parsedData = await addEventResponse.json();
    console.log(parsedData);
    console.log(formData);

    if (addEventResponse.status === 200) {
      alert("Event Added Successfully");
      window.location.reload();
    } else {
      if (parsedData.event_name) {
        alert(parsedData.event_name);
      } else if (parsedData.event_Image) {
        alert(parsedData.event_Image);
      } else if (parsedData.event_descripion) {
        alert(parsedData.event_descripion);
      } else if (parsedData.event_location) {
        alert(parsedData.event_location);
      } else if (parsedData.event_time) {
        alert(parsedData.event_time);
      }
    }
  };
  const [eventList, seteventList] = useState([]);
  const fetcheventList = () => {
    fetch("http://localhost:10000/event/get_event")
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
 

  const handleDelete = (Id) => {
    console.log(Id);
    fetch(`http://localhost:10000/event/delete_event?id=${Id}/`, {
      method: "DELETE",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        //       // Optionally, refresh the room list after a successful delete
        fetcheventList();
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
console.log(eventList)
  return (
    <div className="App">
      <div className="sidebar">
        <h3 className="sidebar-heading">Ngo Panel</h3>
        <ul className="sidebar-menu">
          <li>
            <a href="/NgoDashboard">Ngo pannel</a>
          </li>

          <li>
            <a href="/NgoDonation">Donation</a>
          </li>
          <li>
            <a href="/NgoArticle">Article</a>
          </li>
          <li>
            <a href="/NgoDonation">Donations</a>
          </li>
          <li onClick={handleLogout}>
            <i class="fa-solid fa-right-from-bracket"> </i> signout
          </li>
        </ul>
      </div>

      <div className="content">
        <h2 className="mb-3 text-start">Add Event</h2>

        <Form>
          <div className="row">
            <div className="col">
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label>Event Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event Name"
                  value={event_name}
                  onChange={(e) => seteventname(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="mb-3">
              <label for="formFile" className="form-label">
                Event Image
              </label>
              <input
                className="form-control"
                type="file"
                id="formFile"
                onChange={(e) => {
                  let file = e.target.files[0];
                  seteventImage(file);
                }}
              />
            </div>
          </div>

          <div className="row">
            <div className="col">
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label>Event description</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event description"
                  value={event_descripion}
                  onChange={(e) => seteventdescription(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label>event location</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter your event Location"
                  value={event_location}
                  onChange={(e) => seteventlocation(e.target.value)}
                />
              </Form.Group>
            </div>
            <div className="col">
              <Form.Group
                className="mb-3 text-start"
                controlId="formBasicEmail"
              >
                <Form.Label>event time</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter event time"
                  value={event_time}
                  onChange={(e) => seteventtime(e.target.value)}
                />
              </Form.Group>
            </div>
          </div>

          <Button variant="primary" type="submit" onClick={handleEvent}>
            Submit
          </Button>
        </Form>

        <h2 className="mt-5 mb-3 text-start">Event Details</h2>

        <Table responsive>
          <thead>
            <tr>
              <th>ID</th>
              <th>Event Name</th>
              <th>Event description</th>
              <th>Event Location</th>
              <th>Event time</th>
              <th>Event Image</th>

              <th colSpan={2}>Action</th>
            </tr>
          </thead>

          <tbody>
            {eventList.map((event) => (
              <tr key={event.Id}>
                <td>{event.Id}</td>
                <td>{event.event_name}</td>

                <td>{event.event_description}</td>
                <td>{event.event_location}</td>
                <td>{event.event_time}</td>
                <td>
                  <img
                    width={100}
                    src={`http://localhost:10000/public/images/${event.event_Image}`}
                  />
                </td>
                
                 
             
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(event.Id)}
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
  );
};

export default NgoEvent;