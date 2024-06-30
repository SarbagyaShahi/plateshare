import React, { useState, useEffect } from "react";
import "../../styles/Articles.css";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

const Article = () => {
  const [ArticleList, setArticleList] = useState([]);

  const listArticle = async () => {
    let Api = await fetch("http://localhost:10000/article/get_article", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let articles = await Api.json();

    setArticleList(articles.data);
  };

  useEffect(() => {
    listArticle();
  }, []);

  console.log(ArticleList);
//pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);

  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = ArticleList.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />

      <div className="home-container">
        {currentPost.map((article, index) => (
          <div className="contain" key={index}>
            <div className="left">
              <div className="heading">
                <div className="title">{article.article_name}</div>
              </div>

              <div className="content">
                <p>{article.article_description}</p>
              </div>
            </div>
            <div className="right">
              <img
                width={200}
                src={`http://localhost:10000/public/images/${article.article_Image}`}
              />
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
          disabled={indexOfLastPost >= ArticleList.length}
        >
          Next
        </button>
        

      </div>
  
      
      </div>
     
    </>
    
  );
};

export default Article;

