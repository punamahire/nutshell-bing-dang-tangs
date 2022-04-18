
import React from "react"
import { Link } from "react-router-dom";

export const ArticleCard = ({ article, handleDeleteArticle }) => {
  
  let tmp = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUserId = tmp.id;
  
  return (
      <div className="card">
        <div className="card-content">
            <h3><span className="article-title">
            {article.title}
           </span></h3>
              <p>{article.synopsis}</p>
              <a href={article.url}>{article.url}</a><br />
              <p>{(new Date(article.timestamp)).toLocaleString()}</p>
            {currentUserId == article.userId
                ? <button type="button" className="btn btn-primary" onClick={() => handleDeleteArticle(article.id)}>Delete</button>
                : ''
              }
            {currentUserId == article.userId
                ? <Link to={`/articles/${article.id}/edit`}>
                    <button type="button" className="btn btn-primary">Edit</button>
                  </Link>
                : ''
              }
        </div>
      </div>
    );
  }

