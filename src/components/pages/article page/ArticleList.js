import Articles from './Articles';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ArticleList = () => {
  const chapterId = '64848a1cd792d9e0909c70e0';
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

  // useEffect(() => {
  //   axios.get(`http://localhost:1337/kts?chapterId=${chapterId}`)
  //     .then(response => {
  //       setarticles(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [chapterId]);

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