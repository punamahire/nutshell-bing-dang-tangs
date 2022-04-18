import React, {useState, useEffect} from "react"
import { useNavigate } from "react-router-dom"
import { addArticle } from "./ArticleManager"
import "./ArticleForm.css";

export const ArticleForm = () => {

  let tmp = JSON.parse(sessionStorage.getItem("nutshell_user"));
  let currentUserId = tmp.id;
    
      const navigate = useNavigate()
    
      const [article, setArticle] = useState({
          "userId": currentUserId,
          "url": '',
          "title": '',
          "synopsis": '', 
          "timestamp": '' 
      })

      const handleControlledInputChange = (event) => {
		//Create a copy of the friend array
		const newArticle = { ...article }
    //target the value of the input field
		let selectedVal = event.target.value
		//convert the id value of the object in the input field to a string
		if (event.target.id.includes("Id")) {
			selectedVal = parseInt(selectedVal)}
		//Change the property of the input field to a new value
		newArticle[event.target.id] = selectedVal
		// update state
		setArticle(newArticle)
	}

    const ClickAddArticle = (event) => {
		//Prevents the browser from submitting the form
    event.preventDefault()
    //Display error message if input fields are left empty
		if (article.title === "" || article.synopsis === "" || article.url === "") {
			window.alert("Please input all the info")
		} else {
			article.timestamp = (new Date()).toISOString()
            addArticle(article)
				.then(() => navigate("/articles"))
		}
	}

    const ClickCancel = (event) => {
        navigate("/articles")
    }

    return (
        <form className="articleForm">
          <h2>New Article</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="title">Title:</label>
                        <input type="text" id="title" onChange={handleControlledInputChange} required autoFocus className="form-control" placeholder="title" value={article.title} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="synopsis">Synopsis:</label>
                        <input type="text" id="synopsis" onChange={handleControlledInputChange} required className="form-control" placeholder="synopsis" value={article.synopsis} />
                    </div>
                </fieldset>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="url">URL:</label>
                        <input type="text" id="url" onChange={handleControlledInputChange} required className="form-control" placeholder="url" value={article.url} />
                    </div>
                </fieldset>
          <div className="buttons">
            <button type="button" className="btn btn-primary"
              onClick={ClickAddArticle}>
              Add Article
                </button>
                <button type="button" className="btn btn-primary"
              onClick={ClickCancel}>
              Cancel
                </button>   
          </div>    
        </form>
      )
    }

