import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import swal from "sweetalert";

const Delete = ({ unit }) => {
    const navigate = useNavigate();  

  const onDelete = () => {
    axios.delete(`http://localhost:1337/units/delete/${unit._id}`)
    .then((res) => {
      console.log(res.data);
          swal({
            icon: "success",
            text: "Successfully deleted",
          });
           
         
      })
      .catch((error) => {
        console.log(error);
        swal({
          icon: "warning",
          text: "Error",
        });
      });
    navigate('/');
     
  }

  return (
    <div>
              <p>
                <FaTimes
                  className='delIcon'
                  class='rounded float-end'
                  type='button'
                  style={{ color: 'red' }}
                  data-bs-toggle='modal'
                  data-bs-target={`#delete-modal-${unit._id}`}
                />
              </p>
              <div className="modal fade" id={`delete-modal-${unit._id}`} tabIndex="-1" aria-labelledby="delete-modal-label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm Delete</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"  ></button>
            </div>
            <div className="modal-body">
              Are you sure you want to delete this?
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


 