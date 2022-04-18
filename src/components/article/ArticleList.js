import React, { useState, useEffect } from 'react';
//import { ArticleCard } from '/ArticleCard';
import { ArticleCard } from './ArticleCard';
import { getAllArticles, getArticleById, deleteArticle, addArticle, getAllFriends } from './ArticleManager';
import { useNavigate } from 'react-router-dom';
import "./ArticleList.css"

export const ArticleList = () => {

    let tmp = JSON.parse(sessionStorage.getItem("nutshell_user"));
    let currentUser = tmp.id;
   
    const [articles, setArticles] = useState([]);
    const [friendsArticles, setFriendsArticles] = useState([])
    const [friends, setFriends] = useState([]);

    
//----------------------------------------RETRIEVES ARTICLES FROM API AND FILTERS THEM BY USER---------------------------------------//

    const getArticles = () => {
       
        getAllArticles().then(articlesFromAPI => {

            const filteredArticles = filterArticles(articlesFromAPI)
            setArticles(filteredArticles)
        });
    };

    const filterArticles = (articles) => {
      const filteredByUser = articles.filter(article => article.userId === currentUser)
      return(filteredByUser)
    }

    useEffect(() => {
      getArticles();
    }, []);


//----------------------------------------RETRIEVES FRIENDS FROM API AND FILTERS THEM BY USER---------------------------------------//    

    const getFriends = () => {
      getAllFriends().then(friendsFromApi => {

        const filteredFriends = filterFriends(friendsFromApi)
        setFriends(filteredFriends)
      
      })

    }

    const filterFriends = (friends) => {
      const filteredByUser = friends.filter(article => article.userId === currentUser)
      return(filteredByUser)
    }
    
    useEffect(() => {
      getFriends()
    }, []);


//----------------------------------------RETRIEVES FRIENDS ARTICLES FROM THE API--------------------------------------------------//
    
const getFriendsArticles = () => {
       
  getAllArticles().then(articlesFromAPI => {
    
    const articlesArray = []
    
    for (let i = 0; i < friends.length; i++) {
      const filteredArticles = filterArticlesByFriend(articlesFromAPI, friends[i])
      if (filteredArticles.length > 0) {
        console.log(filteredArticles)
        articlesArray.push(filteredArticles)
      }
      else {}   
    }

    console.log(articlesArray)
    setFriendsArticles(articlesArray)

  });
};

const filterArticlesByFriend = (articles, friend) => {
  const filteredByUser = articles.filter(article => article.userId === friend.theirId)
  return(filteredByUser)
}


//----------------------------------------------------------------------------------------------------------------------------------//

    const handleDeleteArticle = id => {
        deleteArticle(id)
        .then(() => getAllArticles().then(setArticles));
    };

  const navigate = useNavigate()

  return (
    <main>
    <section className='article-header'>
    <h1>Articles</h1>
    <button type='button' className="btn btn-primary" onClick={() => {navigate("/articles/add")}}>Add new article</button>
    </section>
    <h2>My Articles</h2>
    <div className="card-container">
      {articles.map(article =>
        <ArticleCard
          key={article.id}
          article={article}
          handleDeleteArticle={handleDeleteArticle} />)}
    </div>
    <button type='button' className="btn btn-primary" onClick={() => {getFriendsArticles()}}>See Friends Articles</button>
    <div className="card-container">
      {/* {friendsArticles.map(article =>
        <ArticleCard
          key={article.id}
          article={article}
          handleDeleteArticle={handleDeleteArticle} />)} */}
    </div>
    </main>
  );
};
