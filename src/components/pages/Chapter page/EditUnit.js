import React, { useState } from 'react';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';
import swal from "sweetalert";

const Edit = ({ unit }) => {
     
  const [modal, setModal] = useState(null);
   
  const [updatedunit, setUpdatedunit] = useState(unit);

  const onChange = (e) => {
    setUpdatedunit({
      ...updatedunit,
      [e.target.name]: e.target.value
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:1337/units/update/${unit._id}`, updatedunit)
      .then(() => {
        setModal(null);
        swal({
          icon: "success",
          text: "Successfully updated",
        });
      })
      .catch((err) => {
        console.log(err);
        swal({
          icon: "warning",
          text: "Error",
        });
      });

      const editData = {
        unitName: updatedunit.unitName,
        unitDesc: updatedunit.unitDesc,
        old_data: {   
          unitName: unit.unitName,
          unitDesc: unit.unitDesc,
        },
      };
    
      axios.post("http://localhost:1337/editunits/add", editData)
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
                  data-bs-target={`#edit-modal-${unit._id}`}
                />
              </p>
              <div className="modal fade" id={`edit-modal-${unit._id}`} tabIndex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="edit-modal-label">Edit</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onUpdate}>
                  <div className="mb-3">
                    <label htmlFor="unitName" className="form-label">Unit Name</label>
                    <input type="text" className="form-control" id="unitName" name="unitName" value={updatedunit.unitName} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="unitDesc" className="form-label">Unit Introduction</label>
                    <input type="text" className="form-control" id="unitDesc" name="unitDesc" value={updatedunit.unitDesc} onChange={onChange} />
                  </div>
                  <div class="modal-footer">
                        <input type="submit" value="Update Unit" className="btn btn-primary" />
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