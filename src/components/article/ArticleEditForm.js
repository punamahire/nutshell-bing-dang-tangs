import React, { useState, useEffect } from "react";
import {useNavigate, useParams} from "react-router-dom";
import { updateArticle, getArticleById } from "./ArticleManager"
import "./ArticleForm.css"


export const ArticleEditForm = () => {
  const [article, setArticle] = useState({ title: "", synopsis: "", url: ""});
  const [isLoading, setIsLoading] = useState(false);

  const {articleId} = useParams();
  const navigate = useNavigate();

  const handleFieldChange = evt => {
    const stateToChange = { ...article };
    stateToChange[evt.target.id] = evt.target.value;
    setArticle(stateToChange);
  };

  const ClickCancel = (event) => {
    navigate("/articles")
}

  const updateExistingArticle = evt => {
    evt.preventDefault()
    setIsLoading(true);

    
    const editedArticle = {
      id: articleId,
      title: article.title,
      synopsis: article.synopsis,
      url: article.url,
    };

    
    updateArticle(editedArticle)
        .then(() => navigate("/articles")
        )
  }

  useEffect(() => {
    getArticleById(articleId)
      .then(article => {
        setArticle(article);
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <form className="articleForm">
        <fieldset>
          <div className="formgrid">
            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="title"
              value={article.title}
            />
            <label htmlFor="name">Article title</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="synopsis"
              value={article.synopsis}
            />
            <label htmlFor="synopsis">Synopsis</label>

            <input
              type="text"
              required
              className="form-control"
              onChange={handleFieldChange}
              id="url"
              value={article.url}
            />
            <label htmlFor="url">url</label>

          </div>
         
          <div className="alignRight">
            <button
              type="button" disabled={isLoading}
              onClick={updateExistingArticle}
              className="btn btn-primary"
            >Submit</button>
             <button type="button" className="btn btn-primary"
              onClick={ClickCancel}>
              Cancel
                </button> 
          </div>
        </fieldset>
      </form>
    </>
  );
}
