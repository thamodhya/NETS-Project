 


import { FaPencilAlt } from 'react-icons/fa';
import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import moment from 'moment';
import * as Yup from "yup";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject
} from "firebase/storage";
import { storage } from "../../../firebase";
import { v4 } from "uuid";
import { Link } from "react-router-dom";
import pdf from '../../images/pdf.png';

const Edit = ({ article }) => {
  const userid = "648050d3b39dcbdf90027b5a";
  const chapterName = "diagrams";
  const [updatedFile, setUpdatedFile] = useState(null);
  const [modal, setModal] = useState(null);
  const [updatedarticle, setUpdatedarticle] = useState(article);
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false); // New state for tracking upload status

  const validationSchema = Yup.object().shape({
    articleName: Yup.string().required('Article name is required'),
    articleDesc: Yup.string().required('Description is required'),
  });

  const onChange = (e) => {
    if (e.target.type === 'file') {
      setUpdatedFile(e.target.files[0]);
    } else {
      setUpdatedarticle({
        ...updatedarticle,
        [e.target.name]: e.target.value
      });
    }
  };

  const onUpdate = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate(updatedarticle, { abortEarly: false });

      const formData = new FormData();

      if (updatedFile) {
        // Delete the current file from Firebase Storage
        const articleRef = ref(storage, article.articleUrl);
        deleteObject(articleRef)
          .then(() => {
            // Upload the new file to Firebase Storage
            const newVideoRef = ref(storage, `Articles/${updatedFile.name + v4()}`);
            setUploading(true); // Set the uploading state to true
            uploadBytes(newVideoRef, updatedFile)
              .then((snapshot) => {
                // Get the download URL of the new file
                getDownloadURL(snapshot.ref)
                  .then((url) => {
                    // Update the KT session with the new file's URL
                    const updatedArticle = {
                      ...updatedarticle,
                      articleUrl: url
                    };
                    updateArticle(updatedArticle);
                  });
              })
              .catch((error) => {
                console.log('Error uploading new article:', error);
                swal({
                  icon: 'warning',
                  text: 'Error',
                });
              })
              .finally(() => {
                setUploading(false); // Set the uploading state to false once the upload is complete
              });
          })
          .catch((error) => {
            console.log('Error deleting current article:', error);
            swal({
              icon: 'warning',
              text: 'Error',
            });
          });
      } else {
        // No file update, only update the KT session details
        updateArticle(updatedarticle);
      }
    } catch (err) {
      console.error(err);
      const validationErrors = {};
      err.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
      swal({
        icon: "warning",
        text: "Error",
      });
    }
  };

  const updateArticle = (updatedArticle) => {
    axios.post(`http://localhost:1337/arts/update/${article._id}`, updatedArticle)
      .then(() => {
        setModal(null);
        swal({
          icon: 'success',
          text: 'Successfully updated',
        }).then(() => {
          window.location.reload(); // Refresh the page
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
      chapterName: chapterName,
      updatedby: userid,
      articleName: updatedArticle.articleName,
      articleDesc: updatedArticle.articleDesc,
      old_data: {
        articleName: article.articleName,
        articleDesc: article.articleDesc,
      },
      //updated_at: moment.utc().format('YYYY-MM-DD hh:mm:ss A'),
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
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onUpdate}>
                <div className="mb-3">
                  <label htmlFor="articleName" className="form-label">Article Name</label>
                  <input
                    type="text"
                    className={`form-control ${errors.articleName && 'is-invalid'}`}
                    id="articleName"
                    name="articleName"
                    value={updatedarticle.articleName}
                    onChange={onChange}
                  />
                  {errors.articleName && <div className="invalid-feedback">{errors.articleName}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="articleDesc" className="form-label">Article Introduction</label>
                  <input
                    type="text"
                    className={`form-control ${errors.articleDesc && 'is-invalid'}`}
                    id="articleDesc"
                    name="articleDesc"
                    value={updatedarticle.articleDesc}
                    onChange={onChange}
                  />
                  {errors.articleDesc && <div className="invalid-feedback">{errors.articleDesc}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="Attachment" className="form-label">Article Attachment</label>
                   
                </div>
                <div className="mb-3">
                  <p>If you want to change the file, add the new file here.</p>
                  <input type="file" accept=".pdf,.doc,.docx" className="form-control" aria-label="file example" onChange={onChange} />
                  <p>Only pdf and word files are allowed.</p>
                </div>
                <div className="modal-footer">
                  <input type="submit" value={uploading ? 'Uploading...' : 'Update'} className="btn btn-primary" disabled={uploading} />
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
