import React, { useState, useEffect } from 'react';
//import { ArticleCard } from '/ArticleCard';
import { ArticleCard } from './ArticleCard';
import { getAllArticles, getArticleById, deleteArticle, addArticle, getAllFriends } from './ArticleManager';
import { useNavigate } from 'react-router-dom';
import "./ArticleList.css"
import { getFriendsOfActiveUser } from '../friends/FriendManager';

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
      getFriendsOfActiveUser(currentUser).then(friendsFromApi => {
        console.log(friendsFromApi)
        setFriends(friendsFromApi)
      })

    }
    
    useEffect(() => {
      getFriends()
    }, []);


//----------------------------------------RETRIEVES FRIENDS ARTICLES FROM THE API--------------------------------------------------//
    
const getFriendsArticles = () => {
       
  getAllArticles().then(articlesFromAPI => {
    
    const articlesArray = []
    const userIds = friends.map(f => f.theirId)
    console.log(userIds)
    articlesFromAPI.map(article => {
      // if the event is posted by the active user or a friend 
      // of the active user then add the event to the array
      if (userIds.includes(article.userId)) {
        articlesArray.push(article)
      }
  
    });

    console.log(articlesArray)
    setFriendsArticles(articlesArray)
  });
};

useEffect(() => {
  getFriendsArticles()
}, []);


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
    <div className="card-container">
      {friendsArticles.map(article =>
        <ArticleCard
          key={article.id}
          article={article}
          handleDeleteArticle={handleDeleteArticle} />)}
    </div>
    </main>
  );
};
