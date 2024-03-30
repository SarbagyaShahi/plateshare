import React from "react";
// import Layout from "../../components/Layouts/Layout";
import "../../styles/HomeStyle.css";



import Section3 from "./Menu";
import Section4 from "./Section4";
import Section5 from "./Section5";
import Section6 from "./Section6";
import Section7 from "./Section7";
import Layout from "../../components/Layout";
import Homepage from "./Homepage";
import About from "./About";
import Login from "./Login";

const Home = () => {
    
    return (
        <>
            <Layout>
             
             
                <Homepage />

               
                <About />

                {/* Home Section Menu */}
                <Section3 />

                {/* Home Section Promotion */}
                <Section4 />

                {/* Home Section Shop */}
                <Section5 />

                {/* Home Section Blog */}
                <Section6 />

                {/* Home Section Contact */}
                <Login/>
            </Layout>
        </>
    );
};

export default Home;