import React from "react";
import { Container, Row, Col } from "react-bootstrap";
// import Image1 from "../../Assets/menu/1.jpg";
import Image2 from "../../Assets/menu/2.jpg";
import Image3 from "../../Assets/menu/3.jpg";
import Image4 from "../../Assets/menu/4.jpg";
import Image5 from "../../Assets/menu/5.jpg";
import Image6 from "../../Assets/menu/6.jpg";
import Image7 from "../../Assets/menu/7.jpg";
// import Image8 from "../../Assets/menu/burger-18.jpg";
import Cards from "../../components/Layouts/Card";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import Button from 'react-bootstrap/Button';
import Footer from "../../components/Footer";

import Card from 'react-bootstrap/Card';

const mockData = [
    // {
    //     id: "0001",
    //     image: Image1,
    //     title: "Keema Noodles",
    //     paragraph: "This is a delicious chinese noodels",
    //     rating: 5,
    //     price: 150,
    // },
    {
        id: "0002",
        image: Image2,
        title: "Chicken  Chowmin",
        paragraph: "A typical nepali khaja which every one loves",
        rating: 3.5,
        price: 180,
    },
    {
        id: "0003",
        image: Image3,
        title: "Crunchy Burger",
        paragraph: "A delicious crunchy burger like nothing",
        rating: 4,
        price: 250,
    },
    {
        id: "0004",
        image: Image4,
        title: "Jhol Momo",
        paragraph: "Famous delicious Khaja",
        rating: 3.5,
        price: 250,
    },
    {
        id: "0005",
        image: Image5,
        title: "Keema Noodles",
        paragraph: "Tibetan dish",
        rating: 3.0,
        price: 150,
    },
    {
        id: "0006",
        image: Image6,
        title: "Panipuri",
        paragraph: "A magical combination of the  puri,pani and aalo",
        rating: 3,
        price: 80,
    },
    {
        id: "0007",
        image: Image7,
        title: "Maghiritta pizza",
        paragraph: "Pizza for everyone",
        rating: 5,
        price: 500,
    },
    // {
    //     id: "0008",
    //     image: Image8,
    //     title: "Classic Burger",
    //     paragraph: "cheddar cheese, ketchup, mustard, pickles, onion",
    //     rating: 2.0,
    //     price: 89.12,
    // },

];

const renderRatingIcons = (rating) => {
    const stars = [];

    for (let i = 0; i < 5; i++) {
        if (rating > 0.5) {
            stars.push(<i key={i} className="bi bi-star-fill"></i>);
            rating--;
        } else if (rating > 0 && rating < 1) {
            stars.push(<i key={"half"} className="bi bi-star-half"></i>);
            rating--;
        } else {
            stars.push(<i key={`empty${i}`} className="bi bi-star"></i>);
        }
    }
    return stars;
};

function Menu() {
    return (
        <>
            <Header />

            <section className="menu_section">
                <Container>
                    <Row>
                        <Col lg={{ span: 8, offset: 2 }} className="text-center mb-5">

                            <h2>Our Menu</h2>
                            <p className="para">
                                This is our menu.Here you  can find the food we can offer in reasonable price.Alsowe have created a folder where you can donate the food.
                            </p>
                        </Col>
                    </Row>
                  
                    <Row className="menu-row">

                        {mockData.map((cardData, index) => (
                            // <Cards
                            //     key={index}
                            //     image={cardData.image}
                            //     rating={cardData.rating}
                            //     title={cardData.title}
                            //     paragraph={cardData.paragraph}
                            //     price={cardData.price}
                            // //
                            //      renderRatingIcons={renderRatingIcons}
                            // />
                            <Card style={{ width: '18rem' }}>
                                <Card.Img variant="top" src={cardData.image} width ={'200px'} height={'250px'}/>
                                <Card.Body>
                                    <Card.Title>{cardData.title}</Card.Title>
                                    <Card.Text>
                                    {cardData.paragraph}

                                    </Card.Text>
                                    <Card.Text>
                                    {cardData.price}
                                    </Card.Text>
                                    <Card.Text>
                                    {cardData.rating}
                                    </Card.Text>
                                    <Button variant="primary">Add to cart</Button>
                                </Card.Body>
                            </Card>
                        ))}
                    </Row>



                </Container>
            </section>
            <Footer />
        </>
    );
}

export default Menu;