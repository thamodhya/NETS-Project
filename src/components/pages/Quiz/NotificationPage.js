
 //name from userid submitted the quizname from unitid of unitname from unitid
 
 import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
 
const NotificationPage = () => {
  const id = '642ef6155b2fdc5d0f4c2ccf';
  const [notifications, setnotifications] = useState([]);
  const [units, setunits] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:1337/submissions/")
      .then(response => {
        setnotifications(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:1337/units/${id}`)
      .then(response => {
        setunits(response.data.quiz);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <React.Fragment>
      <div style={{backgroundColor: "#fefefe"}}>
        <NavBar></NavBar>
        <div className="container p-4">
          {[...notifications].reverse().map(notification => (
            <div>
              <div className='card'>
                <div className='card-body' style={{ backgroundColor: '#DDEDF8' }}>
                  <div class='col-lg-12'> 
                    <p style={{ font: '25px', color: '#000000' }}>
                      {notification._id} submitted the {units.quizName}
                    </p>
                    <div>
                      {notification.submittedTime}  
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <br />
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotificationPage;
