import Tasks from './Tasks';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const UnitList = () => {
  const chapterId = '64848a1cd792d9e0909c70e0';
  const [units, setunits] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/units/')
      .then(response => {
        setunits(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  // useEffect(() => {
  //   axios.get(`http://localhost:1337/units?belongsToChapter=${chapterId}`)
  //     .then(response => {
  //       setunits(response.data);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // }, [chapterId]);


  return (
    <div>       
            <div> 
          {units.map(unit => {
            return (
              <Tasks key={unit._id} unit={unit} />
            )
          })}
          </div>         
          </div>  
  );
}

export default UnitList;
