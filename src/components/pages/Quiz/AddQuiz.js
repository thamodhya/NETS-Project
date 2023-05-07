
 

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function AddQuestion() {
  const { id } = useParams();
  const [questionCount, setQuestionCount] = useState(0);
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:1337/units/${id}`)
      .then((res) => setQuestionCount(res.data.quiz.questions.length))
      .catch((err) => console.log(err));
  }, [id]);

  const handleInputChange = (index, event) => {
    const values = [...options];
    values[index] = event.target.value;
    setOptions(values);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (questionCount >= 7) {
      alert("You cannot add more than 5 questions.");
      return;
    }else{
    const newQuestion = {
      question: question,
      options: options,
      correctAnswer: correctAnswer,
    };
    axios
      .post(`http://localhost:1337/units/${id}/quiz`, newQuestion)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
    setQuestion("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setQuestionCount(questionCount + 1);
    console.log(questionCount)
  }
  };

  return (
    <div style={{ marginTop: 20 }}>
      {questionCount >= 7 ? (
        <p>You cannot add more than 5 questions</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="card">
            <div className="form-control">
              <br></br>

              <label>Write a question:</label>
              <div class="input-group mb-3">
                <input
                  type="text"
                  required
                  className="form-control"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
              </div>

              <label>Options:</label>
              {options.map((option, index) => (
                <div className="input-group mb-3" key={index}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(event) => handleInputChange(index, event)}
                  />
                </div>
              ))}

              <label>Correct Answer:</label>
              <select
                className="form-select"
                value={correctAnswer}
                onChange={(e) => setCorrectAnswer(e.target.value)}
              >
                {options.map((option, index) => (
                  <option key={index} value={index}>{`Option ${
                    index + 1
                  }`}</option>
                ))}
              </select>

              <br></br>
              <input
                type="submit"
                value="Add Question"
                className="btn btn-primary"
              />
              <br></br>
              <br></br>
            </div>
          </div>
        </form>
      )}
      <br></br>
    </div>
  );
}

export default AddQuestion;