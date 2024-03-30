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
        title: "JholMomo",
        paragraph: "Jhol momo is the typical nepali snacks with tasty jhol favourable for the winter season.",
        rating: 3.5,
        price: 180,
    },
    {
        id: "0003",
        image: Image3,
        title: "Chicken Chowmin",
        paragraph: "Quite Favourable for the ",
        rating: 4,
        price: 250,
    },
    {
        id: "0004",
        image: Image4,
        title: "",
        paragraph: "House patty, cheddar cheese, bacon, onion, mustard",
        rating: 3.5,
        price: 99.25,
    },
    {
        id: "0005",
        image: Image5,
        title: "Double Burger",
        paragraph: "2 patties, cheddar cheese, mustard, pickles, tomatoes",
        rating: 3.0,
        price: 59.25,
    },
    {
        id: "0006",
        image: Image6,
        title: "Turkey Burger",
        paragraph: "Turkey, cheddar cheese, onion, lettuce, tomatoes, pickles",
        rating: 3,
        price: 79.18,
    },
    {
        id: "0007",
        image: Image7,
        title: "Smokey House",
        paragraph: "patty, cheddar cheese, onion, lettuce, tomatoes, pickles",
        rating: 2.5,
        price: 99.19,
    },
    // {
    //     id: "0008",
    //     image: Image8,
    //     title: "Classic Burger",
    //     paragraph: "cheddar cheese, ketchup, mustard, pickles, onion",
    //     rating: 2.0,
    //     price: 89.12,
    // },
    // Add more mock data objects as needed
];

// Rating Logical Data
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
        <Header/>
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
                <Row>
                    {mockData.map((cardData, index) => (
                        <Cards
                            key={index}
                            image={cardData.image}
                            rating={cardData.rating}
                            title={cardData.title}
                            paragraph={cardData.paragraph}
                            price={cardData.price}
                            renderRatingIcons={renderRatingIcons}
                        />
                    ))}
                </Row>

                <Row className="pt-5">
                    <Col sm={6} lg={5}>
                        <div className="ads_box ads_img1 mb-5 mb-md-0">
                            <h4 className="mb-0">GET YOUR FREE</h4>
                            <h5>CHEESE FRIES</h5>
                            <Link to="/" className="btn btn_red px-4 rounded-0">
                                Learn More
                            </Link>
                        </div>
                    </Col>
                    <Col sm={6} lg={7}>
                        <div className="ads_box ads_img2">
                            <h4 className="mb-0">GET YOUR FREE</h4>
                            <h5>CHEESE FRIES</h5>
                            <Link to="/" className="btn btn_red px-4 rounded-0">
                                Learn More
                            </Link>
                        </div>
                    </Col>
                </Row>
            </Container>
        </section>
        </>
    );
}

export default Menu;