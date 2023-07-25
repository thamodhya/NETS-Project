import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import swal from "sweetalert";
import moment from 'moment';

const Delete = ({ quiz ,id}) => {
  const userid = '648050d3b39dcbdf90027b5a';
    const navigate = useNavigate(); 
    const [units, setunits] = useState([]); 

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

  const onDelete = () => {
    axios
      .delete(`http://localhost:1337/units/${id}/delete/${quiz._id}`)
      .then((res) => {
        console.log(res.data);
        swal({
          icon: "success",
          text: "Successfully deleted",
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

      const deleteData = {
        createdBy:quiz.createdBy,
        deletedBy: userid,
        unitName: units.unitName,
      quizname: units.quiz.quizName,
      question: quiz.question,
      options: quiz.options,
      correctAnswer: quiz.correctAnswer,
         
        //updated_at: moment.utc().format('YYYY-MM-DD hh:mm:ss A'),
      };
  
      axios.post("http://localhost:1337/deletequestions/add", deleteData)
        .then(() => {
          console.log("Delete history data saved successfully");
        })
        .catch((err) => {
          console.log(err);
        });
  };
  
  

  return (
    <div>
              <p>
                <FaTimes
                  className='delIcon'
                  class='rounded float-end'
                  type='button'
                  style={{ color: 'red' }}
                  data-bs-toggle='modal'
                  data-bs-target={`#delete-modal-${quiz._id}`}
                />
              </p>
              <div className="modal fade" id={`delete-modal-${quiz._id}`} tabIndex="-1" aria-labelledby="delete-modal-label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm Delete</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-danger" onClick={onDelete}>Delete</button>
            </div>
          </div>
        </div>
        </div>
              </div>
       
  );
};

export default Delete;