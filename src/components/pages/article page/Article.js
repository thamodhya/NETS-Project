import React from 'react'
import { useState } from 'react';

import AddArticle from './AddArticle';
import Header from '../Header';
import ArticleList from './ArticleList';
 
function Article() {
    const [showAddTask, setShowAddTask] = useState(false);  
  return (
    <div>
        <div className="container">
        <h4 style={{ font: "25px" , color: "#000000" }}>Articles</h4>
          <Header showForm={() => setShowAddTask(!showAddTask)} changeTextAndColor={showAddTask}  />
            {showAddTask && <AddArticle   />}
            <br></br>

          <ArticleList></ArticleList>
        </div>
    </div> 
    
  )
}

export default Article