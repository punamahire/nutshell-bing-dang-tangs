
import React from "react"
import './Dashboard.css'

export const ShowArticleCard = ({ article }) => {

  return (
      <div className="dashboard-article-card">
        <div className="article-card-content">
            <h4 className="article-title">
                {article.title}
            </h4>
            <p>{article.synopsis}</p>
            <a href={article.url}>{article.url}</a> 
            <p className="article-timestamp">{(new Date(article.timestamp)).toLocaleString()}</p>
        </div>
      </div>
    );
  }
