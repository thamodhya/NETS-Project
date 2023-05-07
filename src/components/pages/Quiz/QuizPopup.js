
import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import swal from 'sweetalert';

const QuizPopup = ({ id }) => {
  const navigate = useNavigate();
  const [quizData, setQuizData] = useState({});
  const [startTime] = useState(+new Date());
  const [showConfirmation, setShowConfirmation] = useState(true);
  const [showSubmission, setshowSubmission] = useState(true);
  const [quizSubmission, setQuizSubmission] = useState({
    unitId: id,
    questions: [],
  });
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [answers, setAnswers] = useState({});



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
   
   

  const handleAnswerSubmit = (questionIndex, selectedOptionIndex) => {
    const question = quizData.questions[questionIndex];
    const { question: questionValue, options: answers, correctAnswer } = question;

    setQuizSubmission(prevSubmission => {
      const newQuestions = [...prevSubmission.questions];
      newQuestions[questionIndex] = {
        questionValue,
        answers,
        correctAnswer,
         
        submittedAnswer: selectedOptionIndex,
      };
      return { ...prevSubmission, questions: newQuestions };
    });
  };
   
  const saveQuizSubmission = useCallback(() => {
    axios
      .post(`http://localhost:1337/submissions/${id}`, quizSubmission)
      .then((response) => {
        console.log(response.data);
        swal('Quiz submitted!', 'Your quiz has been submitted.', 'success');
    navigate(`/quiz/view/${id}`);
      })
      .catch((error) => {
        console.log(error);
        swal('Oops!', 'Something went wrong. Please try again.', 'error');
      });
      console.log(quizSubmission);
  }, [quizSubmission]);

  const calculateTimeLeft = () => {
    const fullTime = quizData.timeLimit * 60 * 1000;
    const difference = fullTime - (+new Date() - startTime);
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor(difference / (1000 * 60)),
        seconds: Math.floor((difference / 1000) % 60),
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
  });

  const timerComponents = [];

  if (timeLeft.minutes > 0 || timeLeft.seconds > 0) {
    timerComponents.push(
      <span>
        {timeLeft.minutes < 10 ? "0" : ""}
        {timeLeft.minutes}:{timeLeft.seconds < 10 ? "0" : ""}
        {timeLeft.seconds}
      </span>
    );
  } else {
    timerComponents.push(<span>Time's up!</span>);
  }

  const handleSubmit = () => {
    setShowConfirmation(false);
  };

  const handleConfirm = () => {
    setshowSubmission(false);
  };

  return (
    <div>
      <button
        style={{width:"650px"}} 
        className="btn btn-secondary"
        type="button"
        data-bs-toggle="modal"
        data-bs-target="#confirm-modal"
      >
        View Quiz
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
            //data-bs-dismiss="modal"
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
  );
};
 

export default QuizPopup;
