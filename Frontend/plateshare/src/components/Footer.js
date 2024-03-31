import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

function Footer() {
    // Scroll State
    const [isVisible, setIsVisible] = useState(false);
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const listenToScroll = () => {
        let heightToHidden = 250;
        const windowScroll =
            document.body.scrollTop || document.documentElement.scrollTop;

        windowScroll > heightToHidden ? setIsVisible(true) : setIsVisible(false);
    };

    useEffect(() => {
        window.addEventListener("scroll", listenToScroll);
    });
    return (
        <>
            <footer>
                <Container>
                    <Row>
                        <Col sm={6} lg={3} className="mb-4 mb-lg-0">
                            <div className="text-center">
                                <h5>Location</h5>
                                <p>Pepsicola,Kathmandu</p>
                              
                                <p>Nepal</p>
                            </div>
                        </Col>
                        <Col sm={6} lg={3} className="mb-4 mb-lg-0">
                            
                        </Col>
                        <Col sm={6} lg={3} className="mb-4 mb-lg-0">
                            <div className="text-center">
                                <h5>Order Now</h5>
                                <p>We offer Quality Food</p>
                                <p>
                                    <Link to="tel:9862960929" className="calling">
                                        9861960929
                                    </Link>
                                </p>
                            </div>
                        </Col>
                        <Col sm={6} lg={3} className="mb-4 mb-lg-0">
                            <div className="text-center">
                                <h5>Follow Us</h5>
                               
                                <ul className="list-unstyled text-center mt-2">
                                    <li>
                                        <Link to="/">
                                            <i class="bi bi-facebook"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <i class="bi bi-twitter"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <i class="bi bi-instagram"></i>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link to="/">
                                            <i class="bi bi-youtube"></i>
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                    <Row className="copy_right">
                        <Col>
                            <div>
                                <ul className="list-unstyled text-center mb-0">
                                    <li>
                                        <Link to="/">
                                            © 2023 <span>Sarbagya Shahi</span>. All Rights Reserved
                                        </Link>
                                    </li>
                                   
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </footer>

            {isVisible && (
                <div className="scroll_top" onClick={scrollTop}>
                    <i class="bi bi-arrow-up"></i>
                </div>
            )}
        </>
    );
}

export default Footer;