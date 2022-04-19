import React, { useState, useEffect } from 'react';
//import { ArticleCard } from '/ArticleCard';
import { ArticleCard } from './ArticleCard';
import { getAllArticles, getArticleById, deleteArticle, addArticle, getAllFriends } from './ArticleManager';
import { useNavigate } from 'react-router-dom';
import "./ArticleList.css"
import { getFriendsOfActiveUser } from '../../modules/FriendManager';

export const ArticleList = () => {

    let tmp = JSON.parse(sessionStorage.getItem("nutshell_user"));
    let currentUser = tmp.id;
   
    const [articles, setArticles] = useState([]);
    const [friendsArticles, setFriendsArticles] = useState([])
    const [friends, setFriends] = useState([]);

    
//----------------------------------------RETRIEVES ARTICLES FROM API AND FILTERS THEM BY USER---------------------------------------//

    const getArticles = () => {

        let ArticlesList = []
       
        return getAllArticles().then(articlesFromAPI => {

            console.log(articlesFromAPI)

            getFriendsOfActiveUser(currentUser).then(friends =>{

              const userIds = [currentUser, friends.map(f => f.theirId)].flat()
              console.log(userIds)

              articlesFromAPI.map(evt => {
          
                // if the event is posted by the active user or a friend 
                // of the active user then add the event to the array
                if (userIds.includes(evt.userId)) {
                  ArticlesList.push(evt)
                }
            })            
            console.log(ArticlesList)
            setArticles(ArticlesList)
        });
        
    })

  }


    useEffect(() => {
      getArticles();
    }, []);


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
    <div className="container-cards">
      {articles.map(article =>
        <ArticleCard
          key={article.id}
          article={article}
          handleDeleteArticle={handleDeleteArticle} />)}
    </div>
    </main>
  );
};
