import React, { useState, useEffect } from 'react';
//import { ArticleCard } from '/ArticleCard';
import { ArticleCard } from './ArticleCard';
import { getAllArticles, getArticleById, deleteArticle } from './ArticleManager';

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

  console.log("ArticleList")
  return (
    <div className="container-cards">
      {articles.map(article =>
        <ArticleCard
          key={article.id}
          article={article}
          handleDeleteArticle={handleDeleteArticle} />)}
    </div>
  );
};
