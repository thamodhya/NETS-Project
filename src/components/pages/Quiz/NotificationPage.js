
 //name from userid submitted the quizname from unitid of unitname from unitid
 
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import NavBar from '../NavBar';
// import moment from 'moment';
 
// const NotificationPage = () => {
//   const id = '6448faec8320cebe40896624';
//   const [notifications, setnotifications] = useState([]);
//   const [units, setunits] = useState([]);

//   useEffect(() => {
//     axios.get("http://localhost:1337/submissions/")
//       .then(response => {
//         setnotifications(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, []);

//   useEffect(() => {
//     axios.get(`http://localhost:1337/units/${id}`)
//       .then(response => {
//         setunits(response.data);
//         console.log(response.data.quiz);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <React.Fragment>
//       <div style={{backgroundColor: "#fefefe"}}>
//         <NavBar></NavBar>
//         <div className="container p-4">
//           {[...notifications].reverse().map(notification => (
//             <div>
//               <div className='card'>
//                 <div className='card-body' style={{ backgroundColor: '#DDEDF8' }}>
//                   <div class='col-lg-12'> 
//                     <p style={{ font: '25px', color: '#000000' }}>
//                       {notification._id} submitted the {units.quiz.quizName} of {units.unitName}
//                     </p>
//                     <div>
//                       {/* {notification.submittedTime}   */}
//                       {moment(notification.submittedTime).format('YYYY-MM-DD HH:mm:ss')}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//           <br />
//           <br/>
//           <br/>
//           <br/>
//           <br/>
//           <br />
//           <br/>
//           <br/>
//           <br/>
//           <br/>
//           <br/>
//         </div>
//       </div>
//     </React.Fragment>
//   );
// };

// export default NotificationPage;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const NotificationPage = () => {
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     // Fetch notifications from the backend
//     axios.get('http://localhost:1337/notifications/users')
//       .then(response => {
//         setNotifications(response.data);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Notifications</h1>
//       {notifications.map((userNotifications, index) => (
//         <div key={index}>
//           <h2>User {index + 1}</h2>
//           <ul>
//             {userNotifications.map((notification, index) => (
//               <li key={index}>{notification}</li>
//             ))}
//           </ul>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NotificationPage;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../NavBar';
 
const NotificationPage = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // Fetch notifications from the backend
    axios.get('http://localhost:1337/notifications/users')
      .then(response => {
        const reversedNotifications = response.data.reverse();
        setNotifications(reversedNotifications);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <React.Fragment>
      <div style={{ backgroundColor: "#fefefe" }}>
        <NavBar></NavBar>
        <div className="container p-4">
        <h1>Notifications</h1>
          {notifications.map((userNotifications, index) => (
            <div key={index}>
              {userNotifications.map((notification, innerIndex) => (
                <div className='card' key={innerIndex}>
                  <div className='card-body' style={{ backgroundColor: '#DDEDF8' }}>
                    <div className='col-lg-12'>
                      <p style={{ font: '25px', color: '#000000' }}>{notification}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </React.Fragment>
  );
};

export default NotificationPage;


  