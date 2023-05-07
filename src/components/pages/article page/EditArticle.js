import { FaPencilAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
const Edit = ({ article }) => {
     
  const [modal, setModal] = useState(null);
   
  const [updatedarticle, setUpdatedarticle] = useState(article);

  const onChange = (e) => {
    console.log('onChange', e.target.name, e.target.value);
    setUpdatedarticle({
      ...updatedarticle,
      [e.target.name]: e.target.value
    });
  };

  const onUpdate = (e) => {
    e.preventDefault();
    console.log('onUpdate', updatedarticle);
    axios.post(`http://localhost:1337/arts/update/${article._id}`, updatedarticle)
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
        articleName: updatedarticle.articleName,
        articleDesc: updatedarticle.articleDesc,
        old_data: {   
          articleName: article.articleName,
          articleDesc: article.articleDesc,
        },
      };
    
      axios.post("http://localhost:1337/editarticles/add", editData)
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
          data-bs-target={`#edit-modal-${article._id}`}
        />
      </p>
      <div className="modal fade" id={`edit-modal-${article._id}`} tabIndex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="edit-modal-label">Edit</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onUpdate}>
                <div className="mb-3">
                  <label htmlFor="articleName" className="form-label">Article Name</label>
                  <input type="text" className="form-control" id="articleName" name="articleName" value={updatedarticle.articleName} onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="articleDesc" className="form-label">Article Introduction</label>
                  <input type="text" className="form-control" id="articleDesc" name="articleDesc" value={updatedarticle.articleDesc} onChange={onChange} />
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
