import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";

const QuizComponent = ({ id }) => {
  const userid = "64871101484b204b999a2a6e";
  const depid = "6487de14172197d2235cd07f";
  const chapterId = "64848a1cd792d9e0909c70e0";

  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:1337/submissions/find/${id}/${userid}`)
      .then((response) => {
        const existingSubmission = response.data;
        if (existingSubmission) {
          setSubmitted(false);
        }
      })
      .catch((error) => {
        console.log(error);
        swal("Oops!", "Something went wrong. Please try again.", "error");
      });
  }, [id, userid]);

  const handleAttemptQuiz = useCallback(() => {
    axios
      .get(`http://localhost:1337/units/${id}`)
      .then((response) => {
        const quiz = response.data.quiz;
        const questionCount = quiz.questions.length;

        if (questionCount >= 5) {
          if (submitted) {
            swal("Access Denied", "You have already submitted the quiz.", "error");
          } else {
            swal({
              title: "Confirmation",
              text: "Do you want to attempt the quiz?",
              icon: "info",
              buttons: ["Cancel", "Attempt Quiz"],
              dangerMode: false,
            }).then((attemptQuiz) => {
              if (attemptQuiz) {
                navigate(`/quiz/attempt/${id}`);
              }
            });
          }
        } else {
          swal("Error", "The quiz doesn't have enough questions.", "error");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id, submitted, navigate]);

  return (
    <div>
      <button
        style={{ width: "650px" }}
        className="btn btn-secondary"
        type="button"
        onClick={handleAttemptQuiz}
      >
        Attempt Quiz
      </button>
    </div>
  );
};

export default QuizComponent;
