import {React,useState} from 'react'
import { Card,Button } from 'react-bootstrap'
import Footer from '../../components/Footer'
import { useEffect } from 'react'
import Header from '../../components/Header'



 function Articles() {
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
    console.log(articleList)
  return (
    
    <div>

      
<Header/>
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

      </div>
      <div> 

        <Footer/>
      </div>

    </div>
    
  )
}
export default Articles
