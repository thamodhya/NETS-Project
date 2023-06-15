// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import swal from 'sweetalert';
// import { useNavigate } from "react-router-dom";

// const QuizPage = () => {
//   const { id } = useParams();
//   const userid = "64871101484b204b999a2a6e";
//   const depid = "6487de14172197d2235cd07f";
//   const chapterId = "64848a1cd792d9e0909c70e0";
//   const [quizData, setQuizData] = useState(null);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve quiz data using the id
//     axios
//       .get(`http://localhost:1337/units/${id}`)
//       .then((response) => {
//         const quizData = response.data.quiz;
//         setQuizData(quizData);
//         setSelectedAnswers(new Array(quizData.questions.length).fill(null));
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [id]);

//   const handleAnswerChange = (questionIndex, answerIndex) => {
//     const updatedAnswers = [...selectedAnswers];
//     updatedAnswers[questionIndex] = answerIndex;
//     setSelectedAnswers(updatedAnswers);
//   };

//   const handleSubmitQuiz = () => {
//     Swal.fire({
//       title: "Submit Quiz",
//       text: "Are you sure you want to submit the quiz?",
//     //   icon: "warning",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       cancelButtonText: "No",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         submitQuiz();
//       }
//     });
//   };

//   const submitQuiz = () => {
//     // Prepare the data for quiz submission
//     const questions = quizData.questions.map((question, questionIndex) => ({
//       questionValue: question.question,
//       answers: question.options,
//       correctAnswer: question.correctAnswer,
//       submittedAnswer: selectedAnswers[questionIndex] !== null ? selectedAnswers[questionIndex] : null,
//     }));

//     const submittedTime = new Date().toLocaleString();

//     // Send the quiz submission to the backend
//     axios
//       .post(`http://localhost:1337/submissions/${id}/${userid}/${chapterId}/${depid}`, {
//         questions,
//         submittedTime,
//       })
//       .then((response) => {
//         console.log(response.data);
//     swal('Quiz submitted!', 'Your quiz has been submitted.', 'success')
//       .then(() => {
         
//         navigate(`/quiz/view/${id}`);
//         window.location.reload(); // Auto-refresh the page
//       });
//       })
//       .catch((error) => {
//         console.log(error);
//         swal('Oops!', 'Something went wrong. Please try again.', 'error');
//       });
       
//   };

//   return (
//     <div style={{ background: "white" }}>
//       {quizData ? (
//         <div>
//           <br />
//           <br />
//           <div className="container" style={{ marginBottom: "1rem", marginLeft: "25px" }}>
//             <h1 style={{ marginBottom: "1rem", marginLeft: "25px" }}>{quizData.quizName}</h1>
//             <p>{quizData.quizDesc}</p>
//             <h3>Remaining Time: {quizData.timeLimit} minutes</h3>
//           </div>
//           <form>
//             {quizData.questions.map((question, questionIndex) => (
//               <div
//                 key={questionIndex}
//                 className="card"
//                 style={{ marginBottom: "1rem", width: "1400px", marginLeft: "25px" }}
//               >
//                 <div className="card-body">
//                   <h5 className="card-title">Question {questionIndex + 1}</h5>
//                   <p className="card-text">{question.question}</p>
//                   {question.options.map((option, optionIndex) => (
//                     <div className="input-group mb-3" key={optionIndex}>
//                       <div className="input-group-text">
//                         <input
//                           className="form-check-input mt-0"
//                           type="radio"
//                           name={`question${question._id}`}
//                           id={`flexRadioDefault${optionIndex}`}
//                           value={option}
//                           checked={selectedAnswers[questionIndex] === optionIndex}
//                           onChange={() => handleAnswerChange(questionIndex, optionIndex)}
//                         />
//                       </div>
//                       <label
//                         type="text"
//                         className="form-control"
//                         htmlFor={`flexRadioDefault${optionIndex}`}
//                         aria-label="Text input with radio button"
//                       >
//                         {option}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </form>
//           <div className="modal-footer" style={{ marginRight: "30px" }}>
//             <button onClick={handleSubmitQuiz} className="btn btn-primary">
//               Submit Quiz
//             </button>
//             <br />
//             <br />
//             <br />
//             <br />
//           </div>
//         </div>
//       ) : (
//         <p>Loading quiz data...</p>
//       )}
//     </div>
//   );
// };

// export default QuizPage;


// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import swal from "sweetalert";
// import { useNavigate } from "react-router-dom";
// import moment from "moment";

// const QuizDisplay = () => {
//   const { id } = useParams();
//   const userid = "648995cc75de0662cca62b0a";
//   const depid = "6487de14172197d2235cd07f";
//   const chapterId = "64848a1cd792d9e0909c70e0";
//   const [quizData, setQuizData] = useState(null);
//   const [selectedAnswers, setSelectedAnswers] = useState([]);
//   const [remainingTime, setRemainingTime] = useState(null);
//   const [data, setdata] = useState(false);

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Retrieve quiz data using the id
//     axios
//       .get(`http://localhost:1337/units/${id}`)
//       .then((response) => {
//         const quizData = response.data.quiz;
//         setQuizData(quizData);
//         setSelectedAnswers(new Array(quizData.questions.length).fill(null));

//         const timeLimitInSeconds = quizData.timeLimit * 60; // Convert time limit to seconds
//         updateRemainingTime(timeLimitInSeconds, quizData);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, [id]);

//   const handleAnswerChange = (questionIndex, answerIndex) => {
//     const updatedAnswers = [...selectedAnswers];
//     updatedAnswers[questionIndex] = answerIndex;
//     setSelectedAnswers(updatedAnswers);
//   };

//   const updateRemainingTime = (timeLimitInSeconds, quizData) => {
//     const countDownDate = new Date().getTime() + timeLimitInSeconds * 1000;

//     const countdownInterval = setInterval(() => {
//       const currentTime = new Date().getTime();
//       const timeDiff = countDownDate - currentTime;

//       if (timeDiff > 0) {
//         const totalSeconds = Math.floor(timeDiff / 1000);
//         const hours = Math.floor(totalSeconds / 3600);
//         const minutes = Math.floor((totalSeconds % 3600) / 60);
//         const seconds = totalSeconds % 60;

//         const remainingTime = {
//           hours: hours < 10 ? `0${hours}` : hours.toString(),
//           minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
//           seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
//         };

//         setRemainingTime(remainingTime);
//       } else {
//         clearInterval(countdownInterval);
//         setRemainingTime({
//           hours: "00",
//           minutes: "00",
//           seconds: "00",
//         });
//         setdata(true);
//         AutoSubmitQuiz();
//       }
//     }, 1000);
//   };

//   const handleSubmitQuiz = () => {
//     Swal.fire({
//       title: "Submit Quiz",
//       text: "Are you sure you want to submit the quiz?",
//       showCancelButton: true,
//       confirmButtonText: "Yes",
//       cancelButtonText: "No",
//     }).then((result) => {
//       if (result.isConfirmed) {
//         submitQuiz();
//       }
//     });
//   };

//   const submitQuiz = () => {
//     const questions = quizData.questions.map((question, questionIndex) => ({
//       questionValue: question.question,
//       answers: question.options,
//       correctAnswer: question.correctAnswer,
//       submittedAnswer:
//         selectedAnswers[questionIndex] !== null ? selectedAnswers[questionIndex] : null,
//     }));

//     const submittedTime = new Date().toLocaleString();

//     const convertTimeToSeconds = (time) => {
//       const hoursInSeconds = parseInt(time.hours) * 3600;
//       const minutesInSeconds = parseInt(time.minutes) * 60;
//       const seconds = parseInt(time.seconds);
//       return hoursInSeconds + minutesInSeconds + seconds;
//     };

//     const remainingTimeInSeconds = convertTimeToSeconds(remainingTime);
//     const timeLimitInSeconds = quizData.timeLimit * 60; // Convert time limit to seconds
//     const endTime = new Date().getTime(); // Get the current time

//     const attemptedTime = moment(
//       endTime - (timeLimitInSeconds - remainingTimeInSeconds) * 1000
//     ).format("YYYY-MM-DD hh:mm:ss A"); // Calculate the attempted time and format it

//     axios
//       .post(`http://localhost:1337/submissions/${id}/${userid}/${chapterId}/${depid}`, {
//         questions,
//         submittedTime,
//         attemptedTime,
//       })
//       .then((response) => {
//         console.log(response.data);
//         swal("Quiz submitted!", "Your quiz has been submitted.", "success").then(() => {
//           navigate(`/quiz/view/${id}`);
//           window.location.reload();
//         });
//       })
//       .catch((error) => {
//         console.log(error);
//         swal("Oops!", "Something went wrong. Please try again.", "error");
//       });
//   };

//   const AutoSubmitQuiz = () => {
     
//       Swal.fire({
//         text: "Time is up. Submit the quiz",
//         confirmButtonText: "Ok",
//       })
//     }

//   return (
//     <div style={{ background: "white" }}>
//       {quizData ? (
//         <div>
//           <br />
//           <br />
//           <div className="container" style={{ marginBottom: "1rem", marginLeft: "25px" }}>
//             <div className="container p-4">
//               <div className="card" style={{ backgroundColor: "#70B9E6" }}>
//                 <div className="card-body">
//                   <h1 style={{ font: "25px", color: "#ffffff" }}>{quizData.quizName}</h1>
//                 </div>
//               </div>
//             </div>
//             <p>{quizData.quizDesc}</p>
//             <h3>
//               Remaining Time:{" "}
//               {remainingTime ? (
//                 `${remainingTime.hours}:${remainingTime.minutes}:${remainingTime.seconds}`
//               ) : (
//                 "00:00:00"
//               )}
//             </h3>
//           </div>
//           <form>
//             {quizData.questions.map((question, questionIndex) => (
//               <div
//                 key={questionIndex}
//                 className="card"
//                 style={{ marginBottom: "1rem", width: "1400px", marginLeft: "25px" }}
//               >
//                 <div className="card-body">
//                   <h5 className="card-title">Question {questionIndex + 1}</h5>
//                   <p className="card-text">{question.question}</p>
//                   {question.options.map((option, optionIndex) => (
//                     <div className="input-group mb-3" key={optionIndex}>
//                       <div className="input-group-text">
//                         <input
//                           className="form-check-input mt-0"
//                           type="radio"
//                           name={`question${question._id}`}
//                           id={`flexRadioDefault${optionIndex}`}
//                           value={option}
//                           checked={selectedAnswers[questionIndex] === optionIndex}
//                           onChange={() => handleAnswerChange(questionIndex, optionIndex)}
//                         />
//                       </div>
//                       <label
//                         type="text"
//                         className="form-control"
//                         htmlFor={`flexRadioDefault${optionIndex}`}
//                         aria-label="Text input with radio button"
//                       >
//                         {option}
//                       </label>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             ))}
//           </form>
//           <div className="modal-footer" style={{ marginRight: "30px" }}>
//             <button onClick={handleSubmitQuiz} className="btn btn-primary">
//               Submit Quiz
//             </button>
//             <br />
//             <br />
//             <br />
//             <br />
//           </div>
//         </div>
//       ) : (
//         <p>Loading quiz data...</p>
//       )}
//     </div>
//   );
// };

// export default QuizDisplay;


import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Swal from "sweetalert2";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const QuizDisplay = () => {
  const { id } = useParams();
  const userid = "648995cc75de0662cca62b0a";
  const depid = "6487de14172197d2235cd07f";
  const chapterId = "64848a1cd792d9e0909c70e0";
  const [quizData, setQuizData] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [remainingTime, setRemainingTime] = useState(null);
  const [data, setdata] = useState(false);

  const countdownIntervalRef = useRef(null); // Ref to store the countdown interval ID

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve quiz data using the id
    axios
      .get(`http://localhost:1337/units/${id}`)
      .then((response) => {
        const quizData = response.data.quiz;
        setQuizData(quizData);
        setSelectedAnswers(new Array(quizData.questions.length).fill(null));

        const timeLimitInSeconds = quizData.timeLimit * 60; // Convert time limit to seconds
        updateRemainingTime(timeLimitInSeconds, quizData);
      })
      .catch((error) => {
        console.log(error);
      });

    // Clear the countdown interval when unmounting the component
    return () => {
      clearInterval(countdownIntervalRef.current);
    };
  }, [id]);

  const handleAnswerChange = (questionIndex, answerIndex) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[questionIndex] = answerIndex;
    setSelectedAnswers(updatedAnswers);
  };

  const updateRemainingTime = (timeLimitInSeconds, quizData) => {
    const countDownDate = new Date().getTime() + timeLimitInSeconds * 1000;

    const countdownInterval = setInterval(() => {
      const currentTime = new Date().getTime();
      const timeDiff = countDownDate - currentTime;

      if (timeDiff > 0) {
        const totalSeconds = Math.floor(timeDiff / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        const remainingTime = {
          hours: hours < 10 ? `0${hours}` : hours.toString(),
          minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
          seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
        };

        setRemainingTime(remainingTime);
      } else {
        clearInterval(countdownInterval); // Clear the countdown interval
        setRemainingTime({
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
        setdata(true);
        AutoSubmitQuiz();
      }
    }, 1000);

    countdownIntervalRef.current = countdownInterval; // Store the countdown interval ID in the ref
  };

  const handleSubmitQuiz = () => {
    Swal.fire({
      title: "Submit Quiz",
      text: "Are you sure you want to submit the quiz?",
      showCancelButton: true,
      confirmButtonText: "Yes",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        submitQuiz();
      }
    });
  };

  const submitQuiz = () => {
    const questions = quizData.questions.map((question, questionIndex) => ({
      questionValue: question.question,
      answers: question.options,
      correctAnswer: question.correctAnswer,
      submittedAnswer:
        selectedAnswers[questionIndex] !== null ? selectedAnswers[questionIndex] : null,
    }));

    const submittedTime = new Date().toLocaleString();

    const convertTimeToSeconds = (time) => {
      const hoursInSeconds = parseInt(time.hours) * 3600;
      const minutesInSeconds = parseInt(time.minutes) * 60;
      const seconds = parseInt(time.seconds);
      return hoursInSeconds + minutesInSeconds + seconds;
    };

    const remainingTimeInSeconds = convertTimeToSeconds(remainingTime);
    const timeLimitInSeconds = quizData.timeLimit * 60; // Convert time limit to seconds
    const endTime = new Date().getTime(); // Get the current time

    const attemptedTime = moment(
      endTime - (timeLimitInSeconds - remainingTimeInSeconds) * 1000
    ).format("YYYY-MM-DD hh:mm:ss A"); // Calculate the attempted time and format it

    axios
      .post(`http://localhost:1337/submissions/${id}/${userid}/${chapterId}/${depid}`, {
        questions,
        submittedTime,
        attemptedTime,
      })
      .then((response) => {
        console.log(response.data);
        swal("Quiz submitted!", "Your quiz has been submitted.", "success").then(() => {
          navigate(`/quiz/view/${id}`);
          window.location.reload();
        });
      })
      .catch((error) => {
        console.log(error);
        swal("Oops!", "Something went wrong. Please try again.", "error");
      });
  };
  const AutoSubmitQuiz = () => {
    Swal.fire({
      text: "Time is up. Submit the quiz",
      confirmButtonText: "Ok",
    });
  };

  return (
    <div style={{ background: "white" }}>
      {quizData ? (
        <div>
          <br />
          <br />
          <div className="container" style={{ marginBottom: "1rem", marginLeft: "25px" }}>
            <div className="container p-4">
              <div className="card" style={{ backgroundColor: "#70B9E6" }}>
                <div className="card-body">
                  <h1 style={{ font: "25px", color: "#ffffff" }}>{quizData.quizName}</h1>
                </div>
              </div>
            </div>
            <p>{quizData.quizDesc}</p>
            <h3>
              Remaining Time:{" "}
              {remainingTime ? (
                `${remainingTime.hours}:${remainingTime.minutes}:${remainingTime.seconds}`
              ) : (
                "00:00:00"
              )}
            </h3>
          </div>
          <form>
            {quizData.questions.map((question, questionIndex) => (
              <div
                key={questionIndex}
                className="card"
                style={{ marginBottom: "1rem", width: "1400px", marginLeft: "25px" }}
              >
                <div className="card-body">
                  <h5 className="card-title">Question {questionIndex + 1}</h5>
                  <p className="card-text">{question.question}</p>
                  {question.options.map((option, optionIndex) => (
                    <div className="input-group mb-3" key={optionIndex}>
                      <div className="input-group-text">
                        <input
                          className="form-check-input mt-0"
                          type="radio"
                          name={`question${question._id}`}
                          id={`flexRadioDefault${optionIndex}`}
                          value={option}
                          checked={selectedAnswers[questionIndex] === optionIndex}
                          onChange={() => handleAnswerChange(questionIndex, optionIndex)}
                        />
                      </div>
                      <label
                        type="text"
                        className="form-control"
                        htmlFor={`flexRadioDefault${optionIndex}`}
                        aria-label="Text input with radio button"
                      >
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </form>
          <div className="modal-footer" style={{ marginRight: "30px" }}>
            <button onClick={handleSubmitQuiz} className="btn btn-primary">
              Submit Quiz
            </button>
            <br />
            <br />
            <br />
            <br />
          </div>
        </div>
      ) : (
        <p>Loading quiz data...</p>
      )}
    </div>
  );
};

export default QuizDisplay;
