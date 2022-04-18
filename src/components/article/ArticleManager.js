const remoteURL = "http://localhost:8088"

export const getArticleById = (articleId) => {
  return fetch(`${remoteURL}/articles/${articleId}`)
  .then(res => res.json())
}

export const getAllArticles = () => {
  return fetch(`${remoteURL}/articles?_sort=timestamp&_order=desc`)
  .then(res => res.json())
}

export const deleteArticle = id => {
    return fetch(`${remoteURL}/articles/${id}`, {
      method: "DELETE"
    }).then(result => result.json())
  }

export const addArticle = newArticle => {
    return fetch(`${remoteURL}/articles/`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newArticle)
    }).then(response => response.json())
}

export const updateArticle  = (editedArticle) => {
	return fetch(`${remoteURL}/articles/${editedArticle.id}`, {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json"
		},
		body: JSON.stringify(editedArticle)
	}).then(data => data.json());
}

export const getAllFriends = () => {
  return fetch (`${remoteURL}/friends`)
    .then(response => response.json())
}




