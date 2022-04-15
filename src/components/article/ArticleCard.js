
import React from "react"

export const ArticleCard = ({ article, handleDeleteArticle }) => {
  
  let currentUserId = parseInt(sessionStorage.getItem("nutshell_user", JSON.stringify()))

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
                ? <button type="button" className="btn btn-primary" onClick={() => alert('no edit yet')(article.id)}>Edit</button>
                : ''
              }
        </div>
      </div>
    );
  }


// export const ArticleCard = ( articl ) => {
   
//     return (
//         <div className="card">
//             <p className="article__title">{articl.title}</p>
//             <div className="card__content">
//                 <div>
//                     <img className="article__url" src={articl.url} />
//                 </div>
//                 <p>{articl.synopsis}</p>
//                 <p>{articl.timestamp}</p>
//             </div>
//         </div>
//     )
// }