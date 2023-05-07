import KTs from './KTs';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
 
const UnitList = () => {
  const [KTsessions, setKTsessions] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:1337/kts/')
      .then(response => {
        setKTsessions(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

   

  return (
    <div>
       
            <div> 
          {KTsessions.map(KTsession => {
            return (
              <KTs key={KTsession._id} KTsession={KTsession} />
            )
          })}
          </div>
           
          </div>
         
    
  );
}

export default UnitList;

