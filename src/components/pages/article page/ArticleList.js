import Articles from './Articles';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
 

const ArticleList = () => {
  const [articles, setarticles] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/arts/')
      .then(response => {
        setarticles(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

   

  return (
    <div>
       
            <div> 
          {articles.map(article => {
            return (
              <Articles key={article._id} article={article} />
            )
          })}
          </div>
           
          </div>
         
    
  );
}

export default ArticleList;