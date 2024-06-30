import React from "react";
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from "react-bootstrap/Modal";
import "../../styles/Articles.css";
import Header from "../../components/Header";
import Card from 'react-bootstrap/Card';
import { useEffect } from "react";
import Footer from "../../components/Footer";
import "../../styles/Recipe.css";

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


    const cookie= document.cookie;
    console.log(cookie)
    function getCookie(name) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    // Usage:
    const _name = getCookie('userName');
    const name=decodeURIComponent(_name)
  
  const handlePost = async (e) => {
    e.preventDefault();


    let formData = new FormData();

    formData.append('post_name', post_name);
    formData.append('posted_ingredients', posted_ingredients);
    formData.append('post_description', post_description);
    formData.append('posted_by', name);
    

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

    if (addPostResponse.status === 200) {
      alert('Recipe Posted successfully');
      window.location.reload();

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
  

  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = recipeList.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

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
                    <h6 className="mb-0">Recipe Description:</h6>
                  </MDBCol>

                  <MDBCol md='9' className='pe-5'>
                    <MDBTextArea id='textAreaExample' rows={3} value={post_description} onChange={(e) => setpostdescription(e.target.value)} />
                  </MDBCol>

                </MDBRow>

             
                <button  class="btn btn-primary btn-block" onClick={handlePost}>Post Recipe</button>

              </MDBCardBody>
            </MDBCard>

          </MDBCol>
        </MDBRow>

      </MDBContainer>

      <div className="home-container">
        {currentPost.map((post, index) => (
          <div className="contain" key={index}>
            <div className="left"style={{width:"100%"}}>
              <div className="heading">
                <div className="title">{post.post_name}</div>
              </div>
              <div className="content"style={{margin:"0",padding:"0"}}>
                <p><b>Ingredients:</b><br/>{post.posted_ingredients}</p>
              </div>
              <div className="content" style={{margin:"0",padding:"0"}}>
                <p><b>Recipe:</b><br/>{post.post_description}</p>
              </div>
              <div className="content"style={{margin:"0",padding:"0"}}>
                <p><b>Posted By:</b><br/>{post.posted_by}</p>
              </div>
              
            </div>
            
          </div>
        ))}
        <div className="pagination">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span> {currentPage}</span>
        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={indexOfLastPost >= recipeList.length}
        >
          Next
        </button>
      </div>
      </div>

<Footer/>
    </div>
   
  )
}


export default Recipe;