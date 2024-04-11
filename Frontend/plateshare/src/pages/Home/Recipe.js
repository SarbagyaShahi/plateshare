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
function Recipe() {

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

                  <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Recipe Name</h6>
                  </MDBCol>

                  <MDBCol md='9' className='pe-5'>
                    <MDBInput size='lg' id='form1' type='text' />
                  </MDBCol>

                </MDBRow>

                <hr className="mx-n3" />
                <MDBRow className='align-items-center pt-4 pb-3'>

                  <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Recipe Ingredients</h6>
                  </MDBCol>

                  <MDBCol md='9' className='pe-5'>
                    <MDBInput size='lg' id='form1' type='text' />
                  </MDBCol>

                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className='align-items-center pt-4 pb-3'>

                  <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Posted By:</h6>
                  </MDBCol>

                  <MDBCol md='9' className='pe-5'>
                    <MDBInput size='lg' id='form2' type='email' />
                  </MDBCol>

                </MDBRow>

                <hr className="mx-n3" />

                <MDBRow className='align-items-center pt-4 pb-3'>

                  <MDBCol md='3' className='ps-5'>
                    <h6 className="mb-0">Recipe Description:</h6>
                  </MDBCol>

                  <MDBCol md='9' className='pe-5'>
                    <MDBTextArea id='textAreaExample' rows={3} />
                  </MDBCol>

                </MDBRow>





                <MDBBtn className='my-4' size='lg'>Post Recipe</MDBBtn>

              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>

      <div class="container-fluid">
        <div class="row justify-content-around ">
        {recipeList.map((item) => (
          <Card style={{ width: '18rem','marginBottom':'2rem' }}>

            <Card.Body>
              <Card.Title>RecipeName: 
                {item.post_name}</Card.Title>
              <Card.Text>
                {item.post_description}
              </Card.Text>
              <Card.Text>
                {item.posted_ingredients}
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



      </div>

    </div>
  )
}


export default Recipe;