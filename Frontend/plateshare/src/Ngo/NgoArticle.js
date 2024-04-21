import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

import Header from "../components/Header";
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
import Footer from "../components/Footer";

function NgoArticle() {
    const [article_topic, setarticletopic] = useState("");
    const [article_description, setarticledescription] = useState("");
    const [article_publisheddate, setarticlepublisheddate] = useState("");


    const handlePost = async (e) => {
        e.preventDefault();


        let formData = new FormData();

        formData.append('article_topic', article_topic);
        formData.append('article_description', article_description);
        formData.append('article_publisheddate', article_publisheddate);



        let addArticle = 'http://localhost:10000/article/create_article'

        let addArticleResponse = await fetch(addArticle, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        console.log(formData)
        let parsedData = await addArticleResponse.json();
        console.log(parsedData);
        console.log(formData)

        if (addArticleResponse.status === 201) {
            alert('Article Posted successfully');
            setarticletopic('');
            setarticledescription('');
            setarticlepublisheddate('');




        }

        else {
            if (parsedData.article_topic) {
                alert(parsedData.article_topic);
            }

            else if (parsedData.artice_description) {
                alert(parsedData.artice_description);
            }
            else if (parsedData.article_publisheddate) {
                alert(parsedData.article_publisheddate);
            }



        }
    }

    const [show, setShow] = useState(false)
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const [articleList, setarticleList] = useState([])
    const fetcharticleList = () => {
        fetch('http://localhost:10000/article/get_article')
            .then(response => response.json())
            .then(data => {
                setarticleList(data.data);
                console.log(articleList)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }
    useEffect(() => {
        fetcharticleList()
    }, [])



    return (

        <div>


            




            <MDBContainer fluid>

                <MDBRow className='d-flex justify-content-center align-items-center'>
                    <MDBCol lg='9' className='my-5'>

                        <h1 class="text mb-4">Article </h1>

                        <MDBCard>
                            <MDBCardBody className='px-4'>

                                <MDBRow className='align-items-center pt-4 pb-3'>

                                    <MDBCol md='3' className='ps-5'  >
                                        <h6 className="mb-0">Article Topic</h6>
                                    </MDBCol>

                                    <MDBCol md='9' className='pe-5'>
                                        <MDBInput size='lg' id='form1' type='text' value={article_topic} onChange={(e) => setarticletopic(e.target.value)} />
                                    </MDBCol>

                                </MDBRow>

                                <hr className="mx-n3" />
                                <MDBRow className='align-items-center pt-4 pb-3'>

                                    <MDBCol md='3' className='ps-5' >
                                        <h6 className="mb-0">Artilce Description</h6>
                                    </MDBCol>

                                    <MDBCol md='9' className='pe-5'>
                                        <MDBInput size='lg' id='form1' type='text' value={article_description} onChange={(e) => setarticledescription(e.target.value)} />
                                    </MDBCol>

                                </MDBRow>

                                <hr className="mx-n3" />

                                <MDBRow className='align-items-center pt-4 pb-3'>

                                    <MDBCol md='3' className='ps-5' >
                                        <h6 className="mb-0">Posted Date:</h6>
                                    </MDBCol>

                                    <MDBCol md='9' className='pe-5'>
                                        <MDBInput size='lg' id='form2' type='email' value={article_publisheddate} onChange={(e) => setarticlepublisheddate(e.target.value)} />
                                    </MDBCol>

                                </MDBRow>

                                <hr className="mx-n3" />

                               


                                <MDBBtn className='my-4' size='lg' onClick={handlePost}>Post Article</MDBBtn>

                            </MDBCardBody>
                        </MDBCard>

                    </MDBCol>
                </MDBRow>

            </MDBContainer>

            <div class="container-fluid">
                <div class="row justify-content-around ">
                    {articleList.map((item) => (
                        <Card style={{ width: '18rem', 'marginBottom': '2rem' }}>

                            <Card.Body>
                                <Card.Title>Articletopic:
                                    {item.article_topic}</Card.Title>
                                <Card.Text>
                                    {item.article_description}
                                </Card.Text>
                                <Card.Text>
                                    {item.article_publisheddate}
                                </Card.Text>

                                <Card.Text>
                                    {item.posted_by}
                                </Card.Text>


                                <Button variant="primary">Go somewhere</Button>
                            </Card.Body>
                        </Card>
                    )
                    )
                    }
                </div>


<Footer/>
            </div>

        </div>
    )
}


export default NgoArticle;