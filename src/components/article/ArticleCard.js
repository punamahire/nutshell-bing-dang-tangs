
import React from "react"
import { Link } from "react-router-dom";

export const ArticleCard = ({ article, handleDeleteArticle }) => {
  
  let tmp = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUserId = tmp.id;
  
  console.log(article.userId)
  console.log(currentUserId)

  return (
      <div className={article.userId != currentUserId ? "styleFriendEventCardArticle" : "styleYourEventCardArticle"}>
        <div className="article-card-content">

            {currentUserId === article.userId
            ? <h3><span className="article-title">
                {article.title}
              </span></h3>

            : <h3><span className="article-title">
                <i>{article.title}</i>
              </span></h3>
            }

            {currentUserId === article.userId
              ? <p>{article.synopsis}</p>

              : <p><i>{article.synopsis}</i></p>
            } 

            {currentUserId === article.userId
              ? <a href={article.url}>{article.url}</a>

              : <i><a href={article.url}>{article.url}</a></i>
            } 

            {currentUserId === article.userId
              ? <p>{(new Date(article.timestamp)).toLocaleString()}</p>


              : <p><i>{(new Date(article.timestamp)).toLocaleString()}</i></p>
            } 
                
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

