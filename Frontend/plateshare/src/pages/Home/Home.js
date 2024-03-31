import React from "react";
// import Layout from "../../components/Layouts/Layout";
import "../../styles/HomeStyle.css";



import menu from "./Menu";

import Layout from "../../components/Layout";
import Homepage from "./Homepage";
import About from "./About";


const Home = () => {

    return (
        <>
            <Layout>


                <Homepage />


                <About />






            </Layout>
        </>
    );
};

export default Home;