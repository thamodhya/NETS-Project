import React, { useState } from 'react';
import axios from 'axios';
import { FaPencilAlt } from 'react-icons/fa';
import swal from 'sweetalert';
const Edit = ({ KTsession }) => {
     
  const [modal, setModal] = useState(null);
   
  const [updatedKTsession, setUpdatedKTsession] = useState(KTsession);

  const onChange = (e) => {
    setUpdatedKTsession({
      ...updatedKTsession,
      [e.target.name]: e.target.value
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:1337/kts/update/${KTsession._id}`, updatedKTsession)
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
        sessionName: updatedKTsession.sessionName,
        sessionDesc: updatedKTsession.sessionDesc,
        old_data: {   
          sessionName: KTsession.sessionName,
          sessionDesc: KTsession.sessionDesc,
        },
      };
    
      axios.post("http://localhost:1337/editkts/add", editData)
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
                  data-bs-target={`#edit-modal-${KTsession._id}`}
                />
              </p>
              <div className="modal fade" id={`edit-modal-${KTsession._id}`} tabIndex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="edit-modal-label">Edit</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={onUpdate}>
                  <div className="mb-3">
                    <label htmlFor="sessionName" className="form-label">KT Name</label>
                    <input type="text" className="form-control" id="sessionName" name="sessionName" value={updatedKTsession.sessionName} onChange={onChange} />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="sessionDesc" className="form-label">KT Introduction</label>
                    <input type="text" className="form-control" id="sessionDesc" name="sessionDesc" value={updatedKTsession.sessionDesc} onChange={onChange} />
                  </div>
                  <div class="modal-footer">
                        <input type="submit" value="Update KT Session" className="btn btn-primary" />
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