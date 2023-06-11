import React from 'react'
import { useState } from 'react';

import AddUnit from './AddUnit';
import TodosList from './Task';
import Header from '../Header';

function Chapter() {
    const [showAddTask, setShowAddTask] = useState(false);  

  return (
    <div>
        <div className="container">
        <h4 style={{ font: "25px" , color: "#000000" }}>Units</h4>
 
<Header showForm={() => setShowAddTask(!showAddTask)}  changeTextAndColor={showAddTask} />
 
{showAddTask && <AddUnit   />}
 <br></br>

<TodosList></TodosList> 
</div> 

</div>
     
  )
}

export default Chapter

 