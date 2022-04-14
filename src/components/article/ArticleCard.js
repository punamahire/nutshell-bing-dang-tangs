
import React from "react"

export const ArticleCard = ({ article, handleDeleteArticle }) => {
    return (
      <div className="card">
        <div className="card-content">
            <h3><span className="article-title">
            {article.title}
          </span></h3>
          <p>{article.synopsis}</p>
          <a>{article.url}</a><br />
          <button type="button" onClick={() => handleDeleteArticle(article.id)}>Delete</button>
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