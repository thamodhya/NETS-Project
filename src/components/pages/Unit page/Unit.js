import React from 'react'
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import AddKT from './AddKT';
import Header from '../Header';
import UnitList from './UnitList';

function Unit(props) {
  const { id } = useParams();

    const [showAddTask, setShowAddTask] = useState(false);  
  return (
    <div>
        <div className="container">
        <h4 style={{ font: "25px" , color: "#000000" }}>KT Sessions</h4>
<Header showForm={() => setShowAddTask(!showAddTask)}  changeTextAndColor={showAddTask} />
 
{showAddTask && <AddKT id={id}  />}
 <br></br>

<UnitList id={id}></UnitList>
</div>
</div> 
     
  )
}

export default Unit