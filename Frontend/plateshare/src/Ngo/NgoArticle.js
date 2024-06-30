import React, { useState, useEffect } from 'react';
import '../admin/AdminDashboard.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import  Modal  from 'react-bootstrap/Modal';
import swal from "sweetalert";
import Article from '../pages/Home/Articles';

function NgoArticle() {
    const [article_name,setarticlename] = useState("");
    const [article_description,setarticledescription] = useState("");
    const [article_Image, setarticleImage] = useState("");
    const[modelIsOpen,setModelIsOpen]=useState(false);
const closeModal =()=>{
    setModelIsOpen(false);

}
const handleLogout = () => {
    swal({
      title: "Log out?",
      text: "Are you sure want to log out?",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch("http://localhost:10000/auth/logout", {
          method: "GET",
          credentials: "include",
        });
        localStorage.clear();
        swal("See you soon!", "", "success");
        window.location = "http://localhost:3000/";
      }
    });
  };

const openModal =(menuList) => {
    setModelIsOpen(true);
}

    const handleArticle = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('articleImage',article_Image);
        if (article_Image && article_Image.length > 0) {
            formData.append('articleImage',article_Image[0]);
        }
        formData.append('article_name',article_name);
       ;
        formData.append('article_description',article_description);
        formData.append('article_Image',article_Image);

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

        if (addArticleResponse.status === 200) {
            
            alert('Article Posted successfully');
            window.location.reload();

            
        }

        else {
            if (parsedData.article_name) {
                alert(parsedData.article_name);
            }

            else if (parsedData.article_Image) {
                alert(parsedData.article_Image);
            }
            else if (parsedData.article_descripion) {
                alert(parsedData.article_descripion);
            }
           

        }
    }
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
    const handleEdit = (Id) => {
        fetch(`http://localhost:10000/article/put_article${Id}/`)
            .then(response => response.json())
            .then(data => {
                setarticlename(data.article_name);
                setarticleImage(data.event_Image);
                setarticledescription(data.event_descripion);
               

            });
    }

    const handleDelete = (Id) => {
        console.log(Id)
        fetch(`http://localhost:10000/article/delete_article?id=${Id}/`, {
            method: 'DELETE',
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                //       // Optionally, refresh the room list after a successful delete
                fetcharticleList();
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

console.log(articleList)
    return (
        <div className="App">
            <div className="sidebar">
                <h3 className="sidebar-heading">Ngo Panel</h3>
                <ul className="sidebar-menu">
                    <li><a href="/NgoDashboard">Ngo pannel</a></li>

                    <li><a href="/NgoDonation">Donation</a></li>
                    <li><a href="/NgoArticle">Article</a></li>
                    <li><a href="/NgoEvent">Event</a></li>
                
                    <li onClick={handleLogout}>
            <i class="fa-solid fa-right-from-bracket"> </i> signout
          </li>
                </ul>
            </div>

            <div className="content">
                <h2 className='mb-3 text-start'>Post Article</h2>

                <Form>
                    <div className="row">
                        <div className="col">
                            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                                <Form.Label >Article Tilte</Form.Label>
                                <Form.Control type="text" placeholder="Enter Article Title " value={article_name} onChange={(e) => setarticlename(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <label for="formFile" className="form-label">Article Image</label>
                            <input className="form-control" type="file" id="formFile" onChange={
                                (e) => {
                                    let file = e.target.files[0];
                                    setarticleImage(file)

                                }
                            } />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                                <Form.Label>Article  Content</Form.Label>
                                <Form.Control type="text" placeholder="Enter article content" value={article_description} onChange={(e) => setarticledescription(e.target.value)} />
                            </Form.Group>
                        </div>
                       
                        
                    </div>



                    <Button variant="primary" type="submit" onClick={handleArticle}>
                        Post Article
                    </Button>
                </Form>

                <h2 className='mt-5 mb-3 text-start'>Article Details</h2>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Article Name</th>
                            <th>Article Content</th>
                           
                            <th>Article Image</th>

                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            articleList.map((article) => (
                                <tr key={article.Id}>
                                    <td>{article.Id}</td>
                                    <td>{article.article_name}</td>

                                    <td>{article.article_description}</td>
                                   
                                    <td><img width={100} src={`http://localhost:10000/public/images/${article.article_Image}`}/></td>
                                   
                                    <td><Button variant="danger" onClick={()=>handleDelete(article.Id)}>Delete</Button></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
               
                
            </div>
        </div>
    );
}

export default NgoArticle;