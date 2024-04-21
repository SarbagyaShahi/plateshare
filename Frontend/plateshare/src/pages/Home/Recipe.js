import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";

import Header from "../../components/Header";
import Card from 'react-bootstrap/Card';
import { useEffect } from "react";
import Footer from "../../components/Footer";

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

function Recipe() {
  const [post_name, setpostname] = useState("");
  const [posted_ingredients, setpostedingredients] = useState("");
  const [posted_by, setpostedby] = useState("");
  const [post_description, setpostdescription] = useState("");

  const handlePost = async (e) => {
    e.preventDefault();


    let formData = new FormData();

    formData.append('post_name', post_name);
    formData.append('posted_ingredients', posted_ingredients);
    formData.append('post_description', post_description);
    formData.append('posted_by', posted_by);


    let addPost = 'http://localhost:10000/post/create_post'

    let addPostResponse = await fetch(addPost, {
      method: 'POST',
      body: formData,
      credentials: 'include'
    });
    console.log(formData)
    let parsedData = await addPostResponse.json();
    console.log(parsedData);
    console.log(formData)

    if (addPostResponse.status === 201) {
      alert('Recipe Posted successfully');
      setpostname('');
      setpostedingredients('');
      setpostdescription('');
      setpostedby('');



    }

    else {
      if (parsedData.post_name) {
        alert(parsedData.post_name);
      }

      else if (parsedData.posted_ingredients) {
        alert(parsedData.posted_ingredients);
      }
      else if (parsedData.post_description) {
        alert(parsedData.post_description);
      }
      else if (parsedData.posted_by) {
        alert(parsedData.posted_by);
      }


    }
  }

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false)
  const handleShow = () => setShow(true)

  const [recipeList, setRecipeList] = useState([])
  const fetchRecipeList = () => {
    fetch('http://localhost:10000/post/get_post')
      .then(response => response.json())
      .then(data => {
        setRecipeList(data.data);
        console.log(recipeList)
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  useEffect(() => {
    fetchRecipeList()
  }, [])



  return (

    <div>


      <Header />




      <MDBContainer fluid>

        <MDBRow className='d-flex justify-content-center align-items-center'>
          <MDBCol lg='9' className='my-5'>

            <h1 class="text mb-4">Recipe </h1>

            <MDBCard>
              <MDBCardBody className='px-4'>

                <MDBRow className='align-items-center pt-4 pb-3'>

                  <MDBCol md='3' className='ps-5'  >
                    <h6 className="mb-0">Recipe Name</h6>
                  </MDBCol>

                  <MDBCol md='9' className='pe-5'>
                    <MDBInput size='lg' id='form1' type='text' value={post_name} onChange={(e) => setpostname(e.target.value)} />
                  </MDBCol>

                </MDBRow>

                <hr className="mx-n3" />
                <MDBRow className='align-items-center pt-4 pb-3'>

                  <MDBCol md='3' className='ps-5' >
                    <h6 className="mb-0">Recipe Ingredients</h6>
                  </MDBCol>

                  <MDBCol md='9' className='pe-5'>
                    <MDBInput size='lg' id='form1' type='text' value={posted_ingredients} onChange={(e) => setpostedingredients(e.target.value)} />
                  </MDBCol>

                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className='align-items-center pt-4 pb-3'>

                  <MDBCol md='3' className='ps-5' >
                    <h6 className="mb-0">Posted By:</h6>
                  </MDBCol>

                  <MDBCol md='9' className='pe-5'>
                    <MDBInput size='lg' id='form2' type='email' value={posted_by} onChange={(e) => setpostedby(e.target.value)} />
                  </MDBCol>

                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className='align-items-center pt-4 pb-3'>

                  <MDBCol md='3' className='ps-5' >
                    <h6 className="mb-0">Recipe Description:</h6>
                  </MDBCol>

                  <MDBCol md='9' className='pe-5'>
                    <MDBTextArea id='textAreaExample' rows={3} value={post_description} onChange={(e) => setpostdescription(e.target.value)} />
                  </MDBCol>

                </MDBRow>


                <MDBBtn className='my-4' size='lg' onClick={handlePost}>Post Recipe</MDBBtn>

              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>

      <div class="container-fluid">
        <div class="row justify-content-around ">
          {recipeList.map((item) => (
            <Card style={{ width: '18rem', 'marginBottom': '2rem' }}>

              <Card.Body>
                <Card.Title>RecipeName:
                  {item.post_name}</Card.Title>
                <Card.Text>
                  <Card.Title>Recipe Description</Card.Title>
                    {item.post_description}
                </Card.Text>
                <Card.Text><Card.Title>Recipe Ingredients</Card.Title>
                  {item.posted_ingredients}
                </Card.Text>

                <Card.Text><Card.Title> Posted by</Card.Title>
                  {item.posted_by}
                </Card.Text>


                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          )
          )
          }
          
        </div>



      </div>
<Footer/>
    </div>
   
  )
}


export default Recipe;