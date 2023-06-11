
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';
import moment from 'moment';

const QuizPopup = ({ id }) => {
  const userid = "648050d3b39dcbdf90027b5a";
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({});
  const [startTime] = useState(+new Date());
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showSubmission, setshowSubmission] = useState(true);
  const [quizSubmission, setQuizSubmission] = useState({
    unitId: id,
    questions: [],
    attemptedTime: 0, // Add the attemptedTime field
  });
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answers, setAnswers] = useState({});
  const [attemptedTime, setAttemptedTime] = useState(0);
  const [submitted, setSubmitted] = useState(false); // Add a state to track the submission status

  //user can access the quiz only once
  
  // useEffect(() => {
  //   axios
  //     .get(`http://localhost:1337/submissions/${id}/${userid}`)
  //     .then((response) => {
  //       const existingSubmission = response.data;
  //       if (existingSubmission) {
  //         setSubmitted(true); // Set the hasSubmitted state to true if a submission exists
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       swal('Oops!', 'Something went wrong. Please try again.', 'error');
  //     });
  // }, [id, userid]);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/units/${id}`)
      .then((response) => {
        setQuizData(response.data.quiz);
        setTimeLeft(response.data.quiz.timeLimit * 60); // Convert minutes to seconds
        setSelectedAnswers(new Array(response.data.quiz.questions.length).fill(null));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  const handleOptionChange = (event, questionIndex) => {
    const selectedOptionIndex = quizData.questions[questionIndex].options.findIndex(
      (option) => option === event.target.value
    );
  
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = selectedOptionIndex;
      return newAnswers;
    });
  
    handleAnswerSubmit(questionIndex, selectedOptionIndex);
  };  
  
  // const handleAnswerSubmit = (questionIndex, selectedOptionIndex) => {
  //   const question = quizData.questions[questionIndex];
  //   const { question: questionValue, options: answers, correctAnswer } = question;

  //   setQuizSubmission(prevSubmission => {
  //     const newQuestions = [...prevSubmission.questions];
  //     newQuestions[questionIndex] = {
  //       questionValue,
  //       answers,
  //       correctAnswer,
         
  //       submittedAnswer: selectedOptionIndex,
  //     };
  //     return { ...prevSubmission, questions: newQuestions };
  //   });
  // };

  const handleAnswerSubmit = (questionIndex, selectedOptionIndex) => {
    const question = quizData.questions[questionIndex];
    const { question: questionValue, options: answers, correctAnswer } = question;
  
    setQuizSubmission((prevSubmission) => {
      const newQuestions = [...prevSubmission.questions];
      if (selectedOptionIndex === -1) {
        newQuestions[questionIndex] = {
          questionValue,
          answers,
          correctAnswer,
          submittedAnswer: null, // Save null for unanswered questions
        };
      } else {
        newQuestions[questionIndex] = {
          questionValue,
          answers,
          correctAnswer,
          submittedAnswer: selectedOptionIndex,
        };
      }
      return { ...prevSubmission, questions: newQuestions };
    });
  };
  
   
  const saveQuizSubmission = useCallback(() => {
    const updatedQuizSubmission = {
      ...quizSubmission,
      attemptedTime: attemptedTime, // Add the attempted time to the quiz submission
       
    };
    // axios
    //   .post(`http://localhost:1337/submissions/${id}/${userid}`, updatedQuizSubmission)
    //   .then((response) => {
    //     console.log(response.data);
    //     swal('Quiz submitted!', 'Your quiz has been submitted.', 'success');
    //     setSubmitted(true); // Set the submission status to true
    // navigate(`/quiz/view/${id}`);
    // window.location.reload(); // Auto-refresh the page
    //   })
    axios
  .post(`http://localhost:1337/submissions/${id}/${userid}`, updatedQuizSubmission)
  .then((response) => {
    console.log(response.data);
    swal('Quiz submitted!', 'Your quiz has been submitted.', 'success')
      .then(() => {
        setSubmitted(true); // Set the submission status to true
        navigate(`/quiz/view/${id}`);
        window.location.reload(); // Auto-refresh the page
      });
  })
      .catch((error) => {
        console.log(error);
        swal('Oops!', 'Something went wrong. Please try again.', 'error');
      });
      console.log(quizSubmission);
  }, [quizSubmission, id, userid, attemptedTime]);

   
  const calculateTimeLeft = () => {
    const fullTime = quizData.timeLimit * 60 * 1000; // Convert minutes to milliseconds
    const difference = fullTime - (+new Date() - startTime);
    let timeLeft = {};
  
    if (difference > 0) {
      const totalSeconds = Math.floor(difference / 1000);
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = totalSeconds % 60;
  
      timeLeft = {
        hours: hours < 10 ? `0${hours}` : hours.toString(),
        minutes: minutes < 10 ? `0${minutes}` : minutes.toString(),
        seconds: seconds < 10 ? `0${seconds}` : seconds.toString(),
      };
    }
  
    return timeLeft;
  };
  
  

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());   

   
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  
    return () => clearTimeout(timer);
  }, [timeLeft]); // Add timeLeft as a dependency to the useEffect hook
  
  const timerComponents = [];
  
  if (timeLeft.hours > 0 || timeLeft.minutes > 0 || timeLeft.seconds > 0) {
    timerComponents.push(
      <span>
        {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
      </span>
    );
  } else {
    timerComponents.push(<span>Time's up!</span>);
  }
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  
    // Check if time is up and submit the quiz
    if (timeLeft.hours === "00" && timeLeft.minutes === "00" && timeLeft.seconds === "00")  {
      const endTime = +new Date(); // Get the current time
      const attemptedTime = moment(endTime).format('YYYY-MM-DD hh:mm:ss A'); // Calculate the attempted time and format it
      saveQuizSubmission(attemptedTime); // Pass the attempted time to saveQuizSubmission function
    }
  
    return () => clearTimeout(timer);
  }, [timeLeft]);
  

  const handleSubmit = () => {
    const endTime = +new Date(); // Get the current time
  const remainingTime = timeLeft.minutes * 60 + timeLeft.seconds; // Convert remaining time to seconds
  const attemptedTime = moment(endTime - remainingTime).format('YYYY-MM-DD hh:mm:ss A'); // Calculate the attempted time and format it

  setAttemptedTime(attemptedTime); // Store the attempted time in state
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    setshowSubmission(false);

    // Submit the quiz when the time is up
    //saveQuizSubmission(attemptedTime);

    // Submit the quiz only if it hasn't been submitted yet
  if (!submitted) {
    saveQuizSubmission(attemptedTime);
  }

  };


  return (
    <div>
      {submitted ? ( // Check if the quiz has been submitted
        <div>
          <p>Quiz submitted!</p>
          {/* Add a loading indicator or a message while redirecting */}
        </div>
      ) : (
    
    <div>
      <button
        style={{width:"650px"}} 
        className="btn btn-secondary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#confirm-modal"
      >
        Attempt Quiz
      </button>
      <div
        className="modal fade"
        data-bs-backdrop="static"
        id="confirm-modal"
        tabIndex="-1"
        aria-labelledby="confirm-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl" style={{maxWidth:"2000px",width:"95%",height:"100%"}}> 
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {quizData.quizName}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">

              {showConfirmation ? (
          <div>
            <p>Are you sure you want to attempt the quiz?</p>
            <div className="d-grid gap-2 col-6 mx-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              No
            </button>
            </div>
          </div>
        ) : (
          <div>
            <p>{quizData.quizDesc}</p>
            <p>Remaining Time: {timerComponents}</p>
             
          <br />
          {quizData.questions &&
        quizData.questions.map((question, index) => (
          <div key={question._id}>
            <div className="card">
              <div className="container">
                <p>{question.question}</p>
                {question.options.map((option, optionIndex) => (
                  <div className="input-group mb-3" key={optionIndex}>
                    <div className="input-group-text gap-2" style={{ width: "650px" }}>
                      <input
                        type="radio"
                        className="form-check-input mt-0"
                        id={`question-${question._id}-option-${optionIndex}`}
                        name={`question-${question._id}`}
                        value={option}
                        checked={selectedAnswers[index] === optionIndex}
                        onChange={(event) => handleOptionChange(event, index)}
                      />
                      <label htmlFor={`question-${question._id}-option-${optionIndex}`}>{option}</label>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
              <br/>
              {showSubmission ? (
                <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleConfirm}
                >
                  Submit
                </button>
              </div>
           
        ) : (
            <div>
            <p>Are you sure you want to submit the quiz?</p>
            <div className="d-grid gap-2 col-6 mx-auto">
            <button
              type="button"
              className="btn btn-primary"
              onClick={saveQuizSubmission}
              data-bs-dismiss="modal"
            >
              Yes
            </button>
            <button
              type="button"
              className="btn btn-secondary"
            
            >
              No
            </button>
            </div>
          </div>            
  )} 
      </div>
        )}
    </div>
     </div>
     </div>
     </div>
     </div>
  )};
  </div>
  )
};
 

export default QuizPopup;

//call the backend API to trigger email sending
    // axios.post('http://localhost:1337/notifications/')
    // .then((response)=>{
    //   console.log(response.data);
    // })
    // .catch((error)=>{
    //   console.log(error);
    // });

    //attemptedTime

  // const handleAnswerSubmit = (questionIndex, selectedOptionIndex) => {
  //   const question = quizData.questions[questionIndex];
  //   const { question: questionValue, options: answers, correctAnswer } = question;
  
  //   setQuizSubmission((prevSubmission) => {
  //     const newQuestions = prevSubmission.questions.map((q, index) => {
  //       if (index === questionIndex) {
  //         return {
  //           questionValue,
  //           answers,
  //           correctAnswer,
  //           submittedAnswer: selectedOptionIndex !== -1 ? selectedOptionIndex : null,
  //         };
  //       } else if (!prevSubmission.questions[index]) {
  //         return null;
  //       } else {
  //         return q;
  //       }
  //     });
  
  //     return { ...prevSubmission, questions: newQuestions };
  //   });
  // };