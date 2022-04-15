import React, { useState, useEffect } from 'react';
//import { ArticleCard } from '/ArticleCard';
import { ArticleCard } from './ArticleCard';
import { getAllArticles, getArticleById, deleteArticle, addArticle } from './ArticleManager';
import { useNavigate } from 'react-router-dom';
import "./ArticleList.css"

export const ArticleList = () => {
   
    const [articles, setArticles] = useState([]);
    
    const getArticles = () => {
       
        getAllArticles().then(articlesFromAPI => {
            setArticles(articlesFromAPI)
        });
    };
    
    const handleDeleteArticle = id => {
        deleteArticle(id)
        .then(() => getAllArticles().then(setArticles));
    };
      
  useEffect(() => {
    getArticles();
  }, []);

  const navigate = useNavigate()

  return (
    <main>
    <section className='article-header'>
    <h1>Articles</h1>
    <button type='button' className="btn btn-primary" onClick={() => {navigate("/articles/add")}}>Add new article</button>
    </section>
    <div className="card-container">
      {articles.map(article =>
        <ArticleCard
          key={article.id}
          article={article}
          handleDeleteArticle={handleDeleteArticle} />)}
    </div>
    </main>
  );
};
