import React, { useState, useEffect } from 'react';
import { getAllArticles } from '../article/ArticleManager';
import { getFriendsOfActiveUser } from '../../modules/FriendManager';
import { ShowArticleCard } from './ShowArticleCard'
import './Dashboard.css'

export const ShowArticleList = () => {

    let tmp = JSON.parse(sessionStorage.getItem("nutshell_user"));
    let currentUser = tmp.id;
   
    const [articles, setArticles] = useState([]);
    
//----------------------------------------RETRIEVES ARTICLES FROM API AND FILTERS THEM BY USER---------------------------------------//

    const getArticles = () => {

        let ArticlesList = []
       
        getAllArticles().then(articlesFromAPI => {

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

  return (
    <>
        <h3> 
            Articles
        </h3>
        <hr></hr>
        <div className="article-container-cards">
            {articles.map(article =>
                <ShowArticleCard
                    key={article.id}
                    article={article}
                />)
            }        
        </div>
    </>
  );
};
