import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Header from "../../components/Header";
import Card from 'react-bootstrap/Card';
import { useEffect } from "react";

import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBTextArea,
    MDBFile
}

    from 'mdb-react-ui-kit';

function Menu() {
    const [cart, setCart] = useState([])
    console.log(cart)
    function addToCart(data) {
        setCart([...cart, data])
    }


    const [menuList, setmenuList] = useState([])
    const fetchmenuList = () => {
        fetch('http://localhost:10000/menu/get_menu')
            .then(response => response.json())
            .then(data => {
                setmenuList(data.data);
                console.log(menuList)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        fetchmenuList()
    }, [])

    return (
        <div>
            <Header />
            <div class="container-fluid">
                <h1>Enjoy Our Menu</h1>

                <div class="row justify-content-around ">
                    {menuList.map((item) => (
                        <Card style={{ width: '18rem', 'marginBottom': '2rem' }}>

                            <Card.Body>
                                <Card.Title>
                                    {item.menu_name}</Card.Title>
                                <Card.Text>
                                    {item.menu_type}
                                </Card.Text>
                                <Card.Text>
                                    {item.menu_price}
                                </Card.Text>

                                <Card.Text>
                                    {item.menu_rating}
                                </Card.Text>
                                <Card.Text>
                                    {item.menu_}
                                </Card.Text>


                                <Button variant="primary">Add to Cart</Button>
                            </Card.Body>
                        </Card>
                    )
                    )
                    }
                </div>



            </div>

        </div>
    )
}


export default Menu;