 
 

import React, { useState } from 'react';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';
import swal from "sweetalert";
 

const Edit = ({ quiz,id }) => {
   
  const [modal, setModal] = useState(null);
  const [updatedQuestion, setUpdatedQuestion] = useState({
    question: quiz.question,
    options: quiz.options,
  });
  const [updatedCorrectAnswer, setUpdatedCorrectAnswer] = useState({
    correctAnswer: quiz.correctAnswer,
  });

  const onChangeOption = (index, event) => {
    const values = [...updatedQuestion.options];
    values[index] = event.target.value;
    setUpdatedQuestion({
      ...updatedQuestion,
      options: values,
    });
  };

  const onChange = (e) => {
    setUpdatedQuestion({
      ...updatedQuestion,
      [e.target.name]: e.target.value,
    });
  };

  const onChangeAnswer = (e) => {
    setUpdatedCorrectAnswer({
      correctAnswer: e.target.value,
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:1337/units/${id}/update/${quiz._id}`, {
        question: updatedQuestion.question,
        options: updatedQuestion.options,
        correctAnswer: updatedCorrectAnswer.correctAnswer,
      })
      .then(() => {
        setModal(null);
        swal({
          icon: 'success',
          text: 'Successfully updated',
        });
      })
      .catch((err) => {
        console.log(err);
        swal({
          icon: 'warning',
          text: 'Error',
        });
      });

      const editData = {
        question: updatedQuestion.question,
        options: updatedQuestion.options,
        correctAnswer: updatedCorrectAnswer.correctAnswer,
        old_data: {   
          question: quiz.question,
          options: quiz.options,
          correctAnswer: quiz.correctAnswer,
        },
      };
    
      axios.post("http://localhost:1337/editquestions/add", editData)
        .then(() => {
          console.log("Edit history data saved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
  };


  return (
    <div> 
      <p>
        <FaPencilAlt
          className='editIcon'
          type='button'
          class='rounded float-end'
          style={{ color: 'blue' }}
          data-bs-toggle='modal'
          data-bs-target={`#edit-modal-${quiz._id}`}
        />
      </p>
      <div className="modal fade" id={`edit-modal-${quiz._id}`} tabIndex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Question</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body"> 
              <form onSubmit={onUpdate}>
                <div className="form-control">
                  <label htmlFor="question">Write the question.</label>
                  <input
                    type="text"
                    className="form-control"
                    id="question"
                    name="question"
                    value={updatedQuestion.question}
                    required
                    onChange={onChange}
                  />
                  <br />
                  <label htmlFor="option1">Option 1:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="option1"
                    name="options"
                    value={updatedQuestion.options[0]}
                    required
                    onChange={(e) => onChangeOption(0, e)}
                  />
                  <br />
                  <label htmlFor="option2">Option 2:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="option2"
                    name="options"
                    value={updatedQuestion.options[1]}
                    required
                    onChange={(e) => onChangeOption(1, e)}
                  />
                  <br />
                  <label htmlFor="option3">Option 3:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="option3"
                    name="options"
                    value={updatedQuestion.options[2]}
                    required
                    onChange={(e) => onChangeOption(2,e)}
                    />
                    <br />
                  <label htmlFor="option4">Option 4:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="option4"
                    name="options"
                    value={updatedQuestion.options[3]}
                    required
                    onChange={(e) => onChangeOption(3,e)}
                    />

<br></br>
<label>Correct Answer:</label>
<select className="form-select" value={updatedCorrectAnswer.correctAnswer} onChange={onChangeAnswer}>
  {updatedQuestion.options.map((option, index) => (
    <option key={index} value={index}>{`Option ${index + 1}`}</option>
  ))}
</select>
    <br/>
                         <input type="submit" value="Update Question" className="btn btn-primary" />

                         </div>
                         </form>
                         </div>
                         </div>
                         </div>
                         </div>
                         </div>

  )}
  export default Edit;