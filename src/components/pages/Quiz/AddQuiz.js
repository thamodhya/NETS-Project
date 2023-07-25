import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import swal from "sweetalert";

const AddQuestion = () => {
  const userid = "648050d3b39dcbdf90027b5a";
  const { id } = useParams();
  const [questionCount, setQuestionCount] = useState(0);

  useEffect(() => {
    axios
      .get(`http://localhost:1337/units/${id}`)
      .then((res) => setQuestionCount(res.data.quiz.questions.length))
      .catch((err) => console.log(err));
  }, [id]);

  const initialValues = {
    question: "",
    options: ["", "", "", ""],
    correctAnswer: "",
  };

  const validationSchema = Yup.object().shape({
    question: Yup.string().required("Please enter a question"),
    options: Yup.array().of(Yup.string().required("Please enter an option")),
    correctAnswer: Yup.string().required("Please select the correct answer"),
  });

  const onSubmit = (values, { resetForm }) => {
    if (questionCount >= 7) {
      alert("You cannot add more than 5 questions.");
      return;
    }

    const newQuestion = {
      createdBy: userid,
      question: values.question,
      options: values.options,
      correctAnswer: values.correctAnswer,
    };

  //   axios
  //     .post(`http://localhost:1337/units/${id}/quiz`, newQuestion)
  //     .then((res) => console.log(res.data))
  //     .catch((err) => console.log(err));

  //   resetForm();
  //   setQuestionCount(questionCount + 1);
  // };

   

  axios
      .post(`http://localhost:1337/units/${id}/quiz`, newQuestion)
      .then((res) => {
        console.log(res.data);
        swal({
          icon: "success",
          text: "Successfully created",
        }).then(() => {
          window.location.reload(); // Refresh the page
        });
      })
      .catch((error) => {
        console.log(error);
        swal({
          icon: "warning",
          text: "Error",
        });
      });

    resetForm();
    setQuestionCount(questionCount + 1);
  };


  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <div style={{ marginTop: 20 }}>
      {questionCount >= 30 ? (
        <p>You cannot add more than 30 questions</p>
      ) : (
        <form onSubmit={formik.handleSubmit}>
          <div className="card">
            <div className="form-control">
              <br />
              <label>Write a question:</label>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className={`form-control ${
                    formik.touched.question && formik.errors.question
                      ? "is-invalid"
                      : ""
                  }`}
                  name="question"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.question}
                />
                {formik.touched.question && formik.errors.question && (
                  <div className="invalid-feedback">
                    {formik.errors.question}
                  </div>
                )}
              </div>

              <label>Options:</label>
              {formik.values.options.map((option, index) => (
                <div className="input-group mb-3" key={index}>
                  <input
                    type="text"
                    className={`form-control ${
                      formik.touched.options &&
                      formik.touched.options[index] &&
                      formik.errors.options &&
                      formik.errors.options[index]
                        ? "is-invalid"
                        : ""
                    }`}
                    name={`options[${index}]`}
                    placeholder={`Option ${index + 1}`}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.options[index]}
                  />
                  {formik.touched.options &&
                    formik.touched.options[index] &&
                    formik.errors.options &&
                    formik.errors.options[index] && (
                      <div className="invalid-feedback">
                        {formik.errors.options[index]}
                      </div>
                    )}
                </div>
              ))}

              <label>Correct Answer:</label>
              <select
                className={`form-select ${
                  formik.touched.correctAnswer &&
                  formik.errors.correctAnswer
                    ? "is-invalid"
                    : ""
                }`}
                name="correctAnswer"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.correctAnswer}
              >
                <option value="">Select an answer</option>
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
                value="Add Question"
                className="btn btn-primary"
              />
              <br />
              <br />
            </div>
          </div>
        </form>
      )}
      <br />
    </div>
  );
};

export default AddQuestion;

