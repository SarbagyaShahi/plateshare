import React, { useState, useEffect } from 'react';
import '../admin/AdminDashboard.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Table from 'react-bootstrap/Table';
import  Modal  from 'react-bootstrap/Modal';
import Footer from '../components/Footer';



function NgoArticle() {
    const [article_Id, setarticleId] = useState("");
    const [article_name, setarticlename] = useState("");
    const [article_file, setarticlefile] = useState("");
    const [article_type, setarticletype] = useState("");
    const [article_description,setarticledescription] = useState("");
  
    console.log('article_name',article_name);
   

   

    const handleArticle = async (e) => {
        e.preventDefault();

        let formData = new FormData();
        formData.append('articlefile',article_file);
        if (article_file && article_file.length > 0) {
            formData.append('article_file',article_file);
        }
        formData.append('article_Id',article_Id);
        formData.append('article_name',article_name);
        formData.append('article_type',article_type);
        formData.append('article_description',article_description);

        let addarticle = 'http://localhost:10000/article/create_article'

        let addarticleResponse = await fetch(addarticle, {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });
        let parsedData = await addarticleResponse.json();
        console.log(parsedData);
        console.log(formData)

        if (addarticleResponse.status === 201) {
            alert('Article Added Successfully');
            setarticlename('');
            setarticledescription('');
            setarticlefile('');
            setarticletype('');
        }

        else {
            if (parsedData.article_name) {
                alert(parsedData.article_file);
            }

            else if (parsedData.article_description) {
                alert(parsedData.article_description);
            }
            else if (parsedData.article_type) {
                alert(parsedData.article_type);
            }
            else if (parsedData.article_file) {
                alert(parsedData.article_file);
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


    return (
        <div className="App">
            <div className="sidebar">
                <h3 className="sidebar-heading">Admin Panel</h3>
                <ul className="sidebar-menu">
                    <li><a href="/dashboard">Dashboard</a></li>

                    <li><a href="#">Order</a></li>
                    <li><a href="#">Menu</a></li>
                    <li><a href="#">Donations</a></li>
                </ul>
            </div>

            <div className="content">
                <h2 className='mb-3 text-start'>Add Article</h2>

                <Form>
                    <div className="row">
                        <div className="col">
                            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                                <Form.Label >Article Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter Article Name" value={article_name} onChange={(e) => setarticlename(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="mb-3">
                            <label for="formFile" className="form-label">Article File</label>
                            <input className="form-control" type="file" id="formFile" onChange={
                                (e) => {
                                    let file = e.target.files[0];
                                    setarticlefile(file)

                                }
                            } />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                                <Form.Label>Article Description</Form.Label>
                                <Form.Control type="text" placeholder="Enter Article description" value={article_description} onChange={(e) => setarticledescription(e.target.value)} />
                            </Form.Group>
                        </div>
                        <div className="col">
                            <Form.Group className="mb-3 text-start" controlId="formBasicEmail">
                                <Form.Label>article type</Form.Label>
                                <Form.Control type="text" placeholder="Enter your article type" value={article_type} onChange={(e) => setarticletype(e.target.value)} />
                            </Form.Group>
                        </div>
                        
                    </div>


                    <Button variant="primary" type="submit" onClick={handleArticle}>
                        Submit
                    </Button>
                </Form>

                <h2 className='mt-5 mb-3 text-start'>Artilce Details</h2>

                <Table responsive>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Article Name</th>
                            <th>Article Description</th>
                            <th>Article type</th>
                            <th>Article File</th>
                           

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
                                    <td>{article.article_type}</td>
    
                                    <td><img width={100} src={`http://localhost:10000/public/src/Assests/${article.article_file}`}/></td>
                        
                                    <td><Button variant="danger" onClick={()=>handleDelete(article.Id)}>Delete</Button></td>
                                </tr>
                            ))
                        }

                    </tbody>
                </Table>
               </div>
               </div>
    )
}

export default NgoArticle;