// import React, { useState, useEffect} from 'react';
// import axios from 'axios';
// import { FaPencilAlt } from 'react-icons/fa';
// import swal from "sweetalert";
// import moment from 'moment';
 

// const Edit = ({ quiz,id }) => {
//   const userid = "648050d3b39dcbdf90027b5a";
//   const [units, setunits] = useState([]);
//   const [modal, setModal] = useState(null);
//   const [updatedQuestion, setUpdatedQuestion] = useState({
//     question: quiz.question,
//     options: quiz.options,
//   });
//   const [updatedCorrectAnswer, setUpdatedCorrectAnswer] = useState({
//     correctAnswer: quiz.correctAnswer,
//   });

//   const onChangeOption = (index, event) => {
//     const values = [...updatedQuestion.options];
//     values[index] = event.target.value;
//     setUpdatedQuestion({
//       ...updatedQuestion,
//       options: values,
//     });
//   };

//   const onChange = (e) => {
//     setUpdatedQuestion({
//       ...updatedQuestion,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onChangeAnswer = (e) => {
//     setUpdatedCorrectAnswer({
//       correctAnswer: e.target.value,
//     });
//   };

//   useEffect(() => {
//     axios.get(`http://localhost:1337/units/${id}`)
//       .then(response => {
//         setunits(response.data);
//         //console.log(response.data.quiz);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, []);

//   const onUpdate = (e) => {
//     e.preventDefault();
//     axios
//       .put(`http://localhost:1337/units/${id}/update/${quiz._id}`, {
         
//         question: updatedQuestion.question,
//         options: updatedQuestion.options,
//         correctAnswer: updatedCorrectAnswer.correctAnswer,
//       })
//       .then(() => {
//         setModal(null);
//         swal({
//           icon: 'success',
//           text: 'Successfully updated',
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         swal({
//           icon: 'warning',
//           text: 'Error',
//         });
//       });

//       const editData = {
//         updatedby: userid,
//         unitName:units.unitName,
//         quizname:units.quiz.quizName,
//         question: updatedQuestion.question,
//         options: updatedQuestion.options,
//         correctAnswer: updatedCorrectAnswer.correctAnswer,
//         old_data: {   
//           question: quiz.question,
//           options: quiz.options,
//           correctAnswer: quiz.correctAnswer,
//         },
//         updated_at: moment.utc().format('YYYY-MM-DD hh:mm:ss A'),
//       };
    
//       axios.post("http://localhost:1337/editquestions/add", editData)
//         .then(() => {
//           console.log("Edit history data saved successfully");
//         })
//         .catch((err) => {
//           console.log(err);
//         });
//   };


//   return (
//     <div> 
//       <p>
//         <FaPencilAlt
//           className='editIcon'
//           type='button'
//           class='rounded float-end'
//           style={{ color: 'blue' }}
//           data-bs-toggle='modal'
//           data-bs-target={`#edit-modal-${quiz._id}`}
//         />
//       </p>
//       <div className="modal fade" id={`edit-modal-${quiz._id}`} tabIndex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
//         <div class="modal-dialog">
//           <div class="modal-content">
//             <div class="modal-header">
//               <h1 class="modal-title fs-5" id="exampleModalLabel">Edit Question</h1>
//               <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div class="modal-body"> 
//               <form onSubmit={onUpdate}>
//                 <div className="form-control">
//                   <label htmlFor="question">Write the question.</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="question"
//                     name="question"
//                     value={updatedQuestion.question}
//                     required
//                     onChange={onChange}
//                   />
//                   <br />
//                   <label htmlFor="option1">Option 1:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="option1"
//                     name="options"
//                     value={updatedQuestion.options[0]}
//                     required
//                     onChange={(e) => onChangeOption(0, e)}
//                   />
//                   <br />
//                   <label htmlFor="option2">Option 2:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="option2"
//                     name="options"
//                     value={updatedQuestion.options[1]}
//                     required
//                     onChange={(e) => onChangeOption(1, e)}
//                   />
//                   <br />
//                   <label htmlFor="option3">Option 3:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="option3"
//                     name="options"
//                     value={updatedQuestion.options[2]}
//                     required
//                     onChange={(e) => onChangeOption(2,e)}
//                     />
//                     <br />
//                   <label htmlFor="option4">Option 4:</label>
//                   <input
//                     type="text"
//                     className="form-control"
//                     id="option4"
//                     name="options"
//                     value={updatedQuestion.options[3]}
//                     required
//                     onChange={(e) => onChangeOption(3,e)}
//                     />

// <br></br>
// <label>Correct Answer:</label>
// <select className="form-select" value={updatedCorrectAnswer.correctAnswer} onChange={onChangeAnswer}>
//   {updatedQuestion.options.map((option, index) => (
//     <option key={index} value={index}>{`Option ${index + 1}`}</option>
//   ))}
// </select>
//     <br/>
//                          <input type="submit" value="Update Question" className="btn btn-primary" />

//                          </div>
//                          </form>
//                          </div>
//                          </div>
//                          </div>
//                          </div>
//                          </div>

//   )}
//   export default Edit;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaPencilAlt } from 'react-icons/fa';
// import swal from 'sweetalert';
// import moment from 'moment';
// import * as Yup from 'yup';
// import { useFormik } from 'formik';

// const Edit = ({ quiz, id }) => {
//   const userid = '648050d3b39dcbdf90027b5a';
//   const [units, setunits] = useState([]);
//   const [modal, setModal] = useState(null);
//   const [updatedQuestion, setUpdatedQuestion] = useState({
//     question: quiz.question,
//     options: quiz.options,
//   });
//   const [updatedCorrectAnswer, setUpdatedCorrectAnswer] = useState({
//     correctAnswer: quiz.correctAnswer,
//   });

//   const onChangeOption = (index, event) => {
//     const values = [...updatedQuestion.options];
//     values[index] = event.target.value;
//     setUpdatedQuestion({
//       ...updatedQuestion,
//       options: values,
//     });
//   };

//   const onChange = (e) => {
//     setUpdatedQuestion({
//       ...updatedQuestion,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const onChangeAnswer = (e) => {
//     setUpdatedCorrectAnswer({
//       correctAnswer: e.target.value,
//     });
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:1337/units/${id}`)
//       .then((response) => {
//         setunits(response.data);
//       })
//       .catch(function (error) {
//         console.log(error);
//       });
//   }, []);

//   const initialValues = {
//     question: quiz.question,
//     options: quiz.options,
//     correctAnswer: quiz.correctAnswer,
//   };

//   const validationSchema = Yup.object().shape({
//     question: Yup.string().required('Please enter a question'),
//     options: Yup.array().of(Yup.string().required('Please enter an option')),
//     correctAnswer: Yup.string().required('Please select the correct answer'),
//   });

//   const onSubmit = (values) => {
//     axios
//       .put(`http://localhost:1337/units/${id}/update/${quiz._id}`, {
//         question: values.question,
//         options: values.options,
//         correctAnswer: values.correctAnswer,
//       })
//       .then(() => {
//         setModal(null);
//         swal({
//           icon: 'success',
//           text: 'Successfully updated',
//         });
//       })
//       .catch((err) => {
//         console.log(err);
//         swal({
//           icon: 'warning',
//           text: 'Error',
//         });
//       });

//     const editData = {
//       updatedby: userid,
//       unitName: units.unitName,
//       quizname: units.quiz.quizName,
//       question: values.question,
//       options: values.options,
//       correctAnswer: values.correctAnswer,
//       old_data: {
//         question: quiz.question,
//         options: quiz.options,
//         correctAnswer: quiz.correctAnswer,
//       },
//       updated_at: moment.utc().format('YYYY-MM-DD hh:mm:ss A'),
//     };

//     axios
//       .post('http://localhost:1337/editquestions/add', editData)
//       .then(() => {
//         console.log('Edit history data saved successfully');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   const formik = useFormik({
//     initialValues,
//     validationSchema,
//     onSubmit,
//   });

//   return (
//     <div>
//       <p>
//         <FaPencilAlt
//           className="editIcon"
//           type="button"
//           class="rounded float-end"
//           style={{ color: 'blue' }}
//           data-bs-toggle="modal"
//           data-bs-target={`#edit-modal-${quiz._id}`}
//         />
//       </p>
//       <div
//         className="modal fade"
//         id={`edit-modal-${quiz._id}`}
//         tabIndex="-1"
//         aria-labelledby="edit-modal-label"
//         aria-hidden="true"
//       >
//         <div class="modal-dialog">
//           <div class="modal-content">
//             <div class="modal-header">
//               <h1 class="modal-title fs-5" id="exampleModalLabel">
//                 Edit Question
//               </h1>
//               <button
//                 type="button"
//                 class="btn-close"
//                 data-bs-dismiss="modal"
//                 aria-label="Close"
//               ></button>
//             </div>
//             <div class="modal-body">
//               <form onSubmit={formik.handleSubmit}>
//                 <div className="form-control">
//                   <label htmlFor="question">Write the question.</label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       formik.touched.question &&
//                       formik.errors.question &&
//                       'is-invalid'
//                     }`}
//                     id="question"
//                     name="question"
//                     value={formik.values.question}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                   {formik.touched.question && formik.errors.question && (
//                     <div className="invalid-feedback">
//                       {formik.errors.question}
//                     </div>
//                   )}
//                   <br />
//                   <label htmlFor="option1">Option 1:</label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       formik.touched.options &&
//                       formik.touched.options[0] &&
//                       formik.errors.options &&
//                       formik.errors.options[0] &&
//                       'is-invalid'
//                     }`}
//                     id="option1"
//                     name="options[0]"
//                     value={formik.values.options[0]}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                   {formik.touched.options &&
//                     formik.touched.options[0] &&
//                     formik.errors.options &&
//                     formik.errors.options[0] && (
//                       <div className="invalid-feedback">
//                         {formik.errors.options[0]}
//                       </div>
//                     )}
//                   <br />
//                   <label htmlFor="option2">Option 2:</label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       formik.touched.options &&
//                       formik.touched.options[1] &&
//                       formik.errors.options &&
//                       formik.errors.options[1] &&
//                       'is-invalid'
//                     }`}
//                     id="option2"
//                     name="options[1]"
//                     value={formik.values.options[1]}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                   {formik.touched.options &&
//                     formik.touched.options[1] &&
//                     formik.errors.options &&
//                     formik.errors.options[1] && (
//                       <div className="invalid-feedback">
//                         {formik.errors.options[1]}
//                       </div>
//                     )}
//                   <br />
//                   <label htmlFor="option3">Option 3:</label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       formik.touched.options &&
//                       formik.touched.options[2] &&
//                       formik.errors.options &&
//                       formik.errors.options[2] &&
//                       'is-invalid'
//                     }`}
//                     id="option3"
//                     name="options[2]"
//                     value={formik.values.options[2]}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                   {formik.touched.options &&
//                     formik.touched.options[2] &&
//                     formik.errors.options &&
//                     formik.errors.options[2] && (
//                       <div className="invalid-feedback">
//                         {formik.errors.options[2]}
//                       </div>
//                     )}
//                   <br />
//                   <label htmlFor="option4">Option 4:</label>
//                   <input
//                     type="text"
//                     className={`form-control ${
//                       formik.touched.options &&
//                       formik.touched.options[3] &&
//                       formik.errors.options &&
//                       formik.errors.options[3] &&
//                       'is-invalid'
//                     }`}
//                     id="option4"
//                     name="options[3]"
//                     value={formik.values.options[3]}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                   />
//                   {formik.touched.options &&
//                     formik.touched.options[3] &&
//                     formik.errors.options &&
//                     formik.errors.options[3] && (
//                       <div className="invalid-feedback">
//                         {formik.errors.options[3]}
//                       </div>
//                     )}
//                   <br />
//                   <label>Correct Answer:</label>
//                   <select
//                     className={`form-select ${
//                       formik.touched.correctAnswer &&
//                       formik.errors.correctAnswer &&
//                       'is-invalid'
//                     }`}
//                     value={formik.values.correctAnswer}
//                     onChange={formik.handleChange}
//                     onBlur={formik.handleBlur}
//                     name="correctAnswer"
//                   >
//                     {formik.values.options.map((option, index) => (
//                       <option key={index} value={index}>
//                         {`Option ${index + 1}`}
//                       </option>
//                     ))}
//                   </select>
//                   {formik.touched.correctAnswer &&
//                     formik.errors.correctAnswer && (
//                       <div className="invalid-feedback">
//                         {formik.errors.correctAnswer}
//                       </div>
//                     )}
//                   <br />
//                   <input
//                     type="submit"
//                     value="Update Question"
//                     className="btn btn-primary"
//                   />
//                 </div>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Edit;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';
import swal from 'sweetalert';
import moment from 'moment';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const Edit = ({ quiz, id }) => {
  const userid = '648050d3b39dcbdf90027b5a';
  const [units, setunits] = useState([]);
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

  useEffect(() => {
    axios
      .get(`http://localhost:1337/units/${id}`)
      .then((response) => {
        setunits(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  const initialValues = {
    question: quiz.question,
    options: quiz.options,
    correctAnswer: quiz.correctAnswer,
  };

  const validationSchema = Yup.object().shape({
    question: Yup.string().required('Please enter a question'),
    options: Yup.array().of(Yup.string().required('Please enter an option')),
    correctAnswer: Yup.string().required('Please select the correct answer'),
  });

  const onSubmit = (values) => {
    axios
      .put(`http://localhost:1337/units/${id}/update/${quiz._id}`, {
        question: values.question,
        options: values.options,
        correctAnswer: values.correctAnswer,
      })
      .then(() => {
        setModal(null);
        swal({
          icon: 'success',
          text: 'Successfully updated',
        }).then(() => {
          window.location.reload(); // Reload the page
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
      updatedby: userid,
      unitName: units.unitName,
      quizname: units.quiz.quizName,
      question: values.question,
      options: values.options,
      correctAnswer: values.correctAnswer,
      old_data: {
        question: quiz.question,
        options: quiz.options,
        correctAnswer: quiz.correctAnswer,
      },
      updated_at: moment.utc().format('YYYY-MM-DD hh:mm:ss A'),
    };

    axios
      .post('http://localhost:1337/editquestions/add', editData)
      .then(() => {
        console.log('Edit history data saved successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div>
      <p>
        <FaPencilAlt
          className="editIcon"
          type="button"
          class="rounded float-end"
          style={{ color: 'blue' }}
          data-bs-toggle="modal"
          data-bs-target={`#edit-modal-${quiz._id}`}
        />
      </p>
      <div
        className="modal fade"
        id={`edit-modal-${quiz._id}`}
        tabIndex="-1"
        aria-labelledby="edit-modal-label"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Edit Question
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="form-control">
                  <label htmlFor="question">Write the question.</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.question &&
                      formik.errors.question &&
                      'is-invalid'
                    }`}
                    id="question"
                    name="question"
                    value={formik.values.question}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.question && formik.errors.question && (
                    <div className="invalid-feedback">
                      {formik.errors.question}
                    </div>
                  )}
                  <br />
                  <label htmlFor="option1">Option 1:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.options &&
                      formik.touched.options[0] &&
                      formik.errors.options &&
                      formik.errors.options[0] &&
                      'is-invalid'
                    }`}
                    id="option1"
                    name="options[0]"
                    value={formik.values.options[0]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.options &&
                    formik.touched.options[0] &&
                    formik.errors.options &&
                    formik.errors.options[0] && (
                      <div className="invalid-feedback">
                        {formik.errors.options[0]}
                      </div>
                    )}
                  <br />
                  <label htmlFor="option2">Option 2:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.options &&
                      formik.touched.options[1] &&
                      formik.errors.options &&
                      formik.errors.options[1] &&
                      'is-invalid'
                    }`}
                    id="option2"
                    name="options[1]"
                    value={formik.values.options[1]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.options &&
                    formik.touched.options[1] &&
                    formik.errors.options &&
                    formik.errors.options[1] && (
                      <div className="invalid-feedback">
                        {formik.errors.options[1]}
                      </div>
                    )}
                  <br />
                  <label htmlFor="option3">Option 3:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.options &&
                      formik.touched.options[2] &&
                      formik.errors.options &&
                      formik.errors.options[2] &&
                      'is-invalid'
                    }`}
                    id="option3"
                    name="options[2]"
                    value={formik.values.options[2]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.options &&
                    formik.touched.options[2] &&
                    formik.errors.options &&
                    formik.errors.options[2] && (
                      <div className="invalid-feedback">
                        {formik.errors.options[2]}
                      </div>
                    )}
                  <br />
                  <label htmlFor="option4">Option 4:</label>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.options &&
                      formik.touched.options[3] &&
                      formik.errors.options &&
                      formik.errors.options[3] &&
                      'is-invalid'
                    }`}
                    id="option4"
                    name="options[3]"
                    value={formik.values.options[3]}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.options &&
                    formik.touched.options[3] &&
                    formik.errors.options &&
                    formik.errors.options[3] && (
                      <div className="invalid-feedback">
                        {formik.errors.options[3]}
                      </div>
                    )}
                  <br />
                  <label>Correct Answer:</label>
                  <select
                    className={`form-select ${
                      formik.touched.correctAnswer &&
                      formik.errors.correctAnswer &&
                      'is-invalid'
                    }`}
                    value={formik.values.correctAnswer}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="correctAnswer"
                  >
                    {formik.values.options.map((option, index) => (
                      <option key={index} value={index}>
                        {`Option ${index + 1}`}
                      </option>
                    ))}
                  </select>
                  {formik.touched.correctAnswer &&
                    formik.errors.correctAnswer && (
                      <div className="invalid-feedback">
                        {formik.errors.correctAnswer}
                      </div>
                    )}
                  <br />
                  <input
                    type="submit"
                    value="Update Question"
                    className="btn btn-primary"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
