// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaPencilAlt } from 'react-icons/fa';
// import swal from 'sweetalert';
// import moment from 'moment';
 
// import {
//   ref,
//   uploadBytes,
//   getDownloadURL,
//   deleteObject
// } from "firebase/storage";
// import { storage } from "../../../firebase";
// import { v4 } from "uuid";

// const Edit = ({ KTsession, unitId }) => {
//   const userid = "648050d3b39dcbdf90027b5a";
//   const [updatedFile, setUpdatedFile] = useState(null);

//   const [modal, setModal] = useState(null); 
//   const [editkts, seteditkts] = useState([]);  
//   const [updatedKTsession, setUpdatedKTsession] = useState(KTsession);

//   const onChange = (e) => {
//     if (e.target.type === 'file') {
//       setUpdatedFile(e.target.files[0]);
//     } else{
//     setUpdatedKTsession({
//       ...updatedKTsession,
//       [e.target.name]: e.target.value
//     });
//   }
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:1337/units/${unitId}`)
//       .then((response) => {
//         seteditkts(response.data.unitName);
         
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const onUpdate = (e) => {
//     e.preventDefault();
  
//     const formData = new FormData();
  
//     if (updatedFile) {
//       // Delete the current file from Firebase Storage
//       const videoRef = ref(storage, KTsession.sessionUrl);
//       deleteObject(videoRef)
//         .then(() => {
//           // Upload the new file to Firebase Storage
//           const newVideoRef = ref(storage, `KTsessions/${updatedFile.name + v4()}`);
//           uploadBytes(newVideoRef, updatedFile)
//             .then((snapshot) => {
//               // Get the download URL of the new file
//               getDownloadURL(snapshot.ref)
//                 .then((url) => {
//                   // Update the KT session with the new file's URL
//                   const updatedSession = {
//                     ...updatedKTsession,
//                     sessionUrl: url
//                   };
//                   updateKTSession(updatedSession);
//                 });
//             })
//             .catch((error) => {
//               console.log('Error uploading new video:', error);
//               swal({
//                 icon: 'warning',
//                 text: 'Error',
//               });
//             });
//         })
//         .catch((error) => {
//           console.log('Error deleting current video:', error);
//           swal({
//             icon: 'warning',
//             text: 'Error',
//           });
//         });
//     } else {
//       // No file update, only update the KT session details
//       updateKTSession(updatedKTsession);
//     }
//   };
//   const updateKTSession = (updatedSession) => {
//     axios.post(`http://localhost:1337/kts/update/${KTsession._id}`, updatedSession)
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
//       unitName: editkts,
//       sessionName: updatedSession.sessionName,
//       sessionDesc: updatedSession.sessionDesc,
//       old_data: {
//         sessionName: KTsession.sessionName,
//         sessionDesc: KTsession.sessionDesc,
//       },
//       updated_at: moment.utc().format('YYYY-MM-DD hh:mm:ss A'),
//     };
  
//     axios.post("http://localhost:1337/editkts/add", editData)
//       .then(() => {
//         console.log("Edit history data saved successfully");
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };
    

//   return (
//     <div>
//               <p>
//                 <FaPencilAlt
//                   className='editIcon'
//                   type='button'
//                   class='rounded float-end'
//                   style={{ color: 'blue' }}
//                   data-bs-toggle='modal'
//                   data-bs-target={`#edit-modal-${KTsession._id}`}
//                 />
//               </p>
//               <div className="modal fade" id={`edit-modal-${KTsession._id}`} tabIndex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
//           <div className="modal-dialog">
//             <div className="modal-content">
//               <div className="modal-header">
//                 <h5 className="modal-title" id="edit-modal-label">Edit</h5>
//                 <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
//               </div>
//               <div className="modal-body">
//                 <form onSubmit={onUpdate}>
//                   <div className="mb-3">
//                     <label htmlFor="sessionName" className="form-label">KT Name</label>
//                     <input type="text" className="form-control" id="sessionName" name="sessionName" value={updatedKTsession.sessionName} onChange={onChange} />
//                   </div>
//                   <div className="mb-3">
//                     <label htmlFor="sessionDesc" className="form-label">KT Introduction</label>
//                     <input type="text" className="form-control" id="sessionDesc" name="sessionDesc" value={updatedKTsession.sessionDesc} onChange={onChange} />
//                   </div>
//                   <div className="mb-3">
//                   <input type="file" accept="video/mp4,video/mpeg,video/quicktime,video/x-msvideo" class="form-control" aria-label="file example"  onChange={onChange} />
//         <p>Only video files are allowed.</p>
//                   </div>
//                   <div class="modal-footer">
//                         <input type="submit" value="Update KT Session" className="btn btn-primary" />
//                     </div>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//             </div>
    
//   );
// };

// export default Edit;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { FaPencilAlt } from 'react-icons/fa';
// import swal from 'sweetalert';
// import moment from 'moment';
// import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
// import { storage } from '../../../firebase';
// import { v4 } from 'uuid';
// import * as Yup from 'yup';

// const Edit = ({ KTsession, unitId }) => {
//   const userid = '648050d3b39dcbdf90027b5a';
//   const [updatedFile, setUpdatedFile] = useState(null);
//   const [modal, setModal] = useState(null);
//   const [editkts, seteditkts] = useState([]);
//   const [updatedKTsession, setUpdatedKTsession] = useState(KTsession);
//   const [errors, setErrors] = useState({});

//   const validationSchema = Yup.object().shape({
//     sessionName: Yup.string().required('KT Session name is required'),
//     sessionDesc: Yup.string().required('Description is required'),
//     sessionFile: Yup.mixed().test('fileFormat', 'Only video files are allowed', (value) => {
//       if (!value) return true;
//       const allowedFormats = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'];
//       return allowedFormats.includes(value.type);
//     }),
//   });

//   const onChange = (e) => {
//     if (e.target.type === 'file') {
//       setUpdatedFile(e.target.files[0]);
//     } else {
//       setUpdatedKTsession({
//         ...updatedKTsession,
//         [e.target.name]: e.target.value,
//       });
//     }
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:1337/units/${unitId}`)
//       .then((response) => {
//         seteditkts(response.data.unitName);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   const onUpdate = (e) => {
//     e.preventDefault();

//     try {
//       validationSchema.validateSync(updatedKTsession, { abortEarly: false });
//     } catch (err) {
//       const validationErrors = {};
//       err.inner.forEach((e) => {
//         validationErrors[e.path] = e.message;
//       });
//       setErrors(validationErrors);
//       swal({
//         icon: 'warning',
//         text: 'Error',
//       });
//       return;
//     }

//     const formData = new FormData();

//     if (updatedFile) {
//       // Delete the current file from Firebase Storage
//       const videoRef = ref(storage, KTsession.sessionUrl);
//       deleteObject(videoRef)
//         .then(() => {
//           // Upload the new file to Firebase Storage
//           const newVideoRef = ref(storage, `KTsessions/${updatedFile.name + v4()}`);
//           uploadBytes(newVideoRef, updatedFile)
//             .then((snapshot) => {
//               // Get the download URL of the new file
//               getDownloadURL(snapshot.ref)
//                 .then((url) => {
//                   // Update the KT session with the new file's URL
//                   const updatedSession = {
//                     ...updatedKTsession,
//                     sessionUrl: url,
//                   };
//                   updateKTSession(updatedSession);
//                 });
//             })
//             .catch((error) => {
//               console.log('Error uploading new video:', error);
//               swal({
//                 icon: 'warning',
//                 text: 'Error',
//               });
//             });
//         })
//         .catch((error) => {
//           console.log('Error deleting current video:', error);
//           swal({
//             icon: 'warning',
//             text: 'Error',
//           });
//         });
//     } else {
//       // No file update, only update the KT session details
//       updateKTSession(updatedKTsession);
//     }
//   };

//   const updateKTSession = (updatedSession) => {
//     axios
//       .post(`http://localhost:1337/kts/update/${KTsession._id}`, updatedSession)
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
//       unitName: editkts,
//       sessionName: updatedSession.sessionName,
//       sessionDesc: updatedSession.sessionDesc,
//       old_data: {
//         sessionName: KTsession.sessionName,
//         sessionDesc: KTsession.sessionDesc,
//       },
//       updated_at: moment.utc().format('YYYY-MM-DD hh:mm:ss A'),
//     };

//     axios
//       .post('http://localhost:1337/editkts/add', editData)
//       .then(() => {
//         console.log('Edit history data saved successfully');
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   };

//   return (
//     <div>
//       <p>
//         <FaPencilAlt
//           className="editIcon"
//           type="button"
//           class="rounded float-end"
//           style={{ color: 'blue' }}
//           data-bs-toggle="modal"
//           data-bs-target={`#edit-modal-${KTsession._id}`}
//         />
//       </p>
//       <div className="modal fade" id={`edit-modal-${KTsession._id}`} tabIndex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
//         <div className="modal-dialog">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="edit-modal-label">
//                 Edit
//               </h5>
//               <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
//             </div>
//             <div className="modal-body">
//               <form onSubmit={onUpdate}>
//                 <div className="mb-3">
//                   <label htmlFor="sessionName" className="form-label">
//                     KT Name
//                   </label>
//                   <input
//                     type="text"
//                     className={`form-control ${errors.sessionName && 'is-invalid'}`}
//                     id="sessionName"
//                     name="sessionName"
//                     value={updatedKTsession.sessionName}
//                     onChange={onChange}
//                   />
//                   {errors.sessionName && <div className="invalid-feedback">{errors.sessionName}</div>}
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="sessionDesc" className="form-label">
//                     KT Introduction
//                   </label>
//                   <input
//                     type="text"
//                     className={`form-control ${errors.sessionDesc && 'is-invalid'}`}
//                     id="sessionDesc"
//                     name="sessionDesc"
//                     value={updatedKTsession.sessionDesc}
//                     onChange={onChange}
//                   />
//                   {errors.sessionDesc && <div className="invalid-feedback">{errors.sessionDesc}</div>}
//                 </div>
//                 <div className="mb-3">
//                   <input
//                     type="file"
//                     accept="video/mp4,video/mpeg,video/quicktime,video/x-msvideo"
//                     className={`form-control ${errors.sessionFile && 'is-invalid'}`}
//                     aria-label="file example"
//                     onChange={onChange}
//                   />
//                   <p>Only video files are allowed.</p>
//                   {errors.sessionFile && <div className="invalid-feedback">{errors.sessionFile}</div>}
//                 </div>
//                 <div className="modal-footer">
//                   <input type="submit" value="Update KT Session" className="btn btn-primary" />
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
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { storage } from '../../../firebase';
import { v4 } from 'uuid';
import * as Yup from 'yup';

const Edit = ({ KTsession, unitId }) => {
  const userid = '648050d3b39dcbdf90027b5a';
  const [updatedFile, setUpdatedFile] = useState(null);
  const [modal, setModal] = useState(null);
  const [editkts, seteditkts] = useState([]);
  const [updatedKTsession, setUpdatedKTsession] = useState(KTsession);
  const [errors, setErrors] = useState({});

  const validationSchema = Yup.object().shape({
    sessionName: Yup.string().required('KT Session name is required'),
    sessionDesc: Yup.string().required('Description is required'),
    sessionFile: Yup.mixed().test('fileFormat', 'Only video files are allowed', (value) => {
      if (!value) return true;
      const allowedFormats = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'];
      return allowedFormats.includes(value.type);
    }),
  });

  const onChange = (e) => {
    if (e.target.type === 'file') {
      setUpdatedFile(e.target.files[0]);
    } else {
      setUpdatedKTsession({
        ...updatedKTsession,
        [e.target.name]: e.target.value,
      });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:1337/units/${unitId}`)
      .then((response) => {
        seteditkts(response.data.unitName);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const onUpdate = (e) => {
    e.preventDefault();

    try {
      validationSchema.validateSync(updatedKTsession, { abortEarly: false });
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
      swal({
        icon: 'warning',
        text: 'Error',
      });
      return;
    }

    const formData = new FormData();

    if (updatedFile) {
      // Delete the current file from Firebase Storage
      const videoRef = ref(storage, KTsession.sessionUrl);
      deleteObject(videoRef)
        .then(() => {
          // Upload the new file to Firebase Storage
          const newVideoRef = ref(storage, `KTsessions/${updatedFile.name + v4()}`);
          uploadBytes(newVideoRef, updatedFile)
            .then((snapshot) => {
              // Get the download URL of the new file
              getDownloadURL(snapshot.ref)
                .then((url) => {
                  // Update the KT session with the new file's URL
                  const updatedSession = {
                    ...updatedKTsession,
                    sessionUrl: url,
                  };
                  updateKTSession(updatedSession);
                });
            })
            .catch((error) => {
              console.log('Error uploading new video:', error);
              swal({
                icon: 'warning',
                text: 'Error',
              });
            });
        })
        .catch((error) => {
          console.log('Error deleting current video:', error);
          swal({
            icon: 'warning',
            text: 'Error',
          });
        });
    } else {
      // No file update, only update the KT session details
      updateKTSession(updatedKTsession);
    }
  };

  const updateKTSession = (updatedSession) => {
    axios
      .post(`http://localhost:1337/kts/update/${KTsession._id}`, updatedSession)
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
      updatedby: userid,
      unitName: editkts,
      sessionName: updatedSession.sessionName,
      sessionDesc: updatedSession.sessionDesc,
      old_data: {
        sessionName: KTsession.sessionName,
        sessionDesc: KTsession.sessionDesc,
      },
      updated_at: moment.utc().format('YYYY-MM-DD hh:mm:ss A'),
    };

    axios
      .post('http://localhost:1337/editkts/add', editData)
      .then(() => {
        console.log('Edit history data saved successfully');
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <p>
        <FaPencilAlt
          className="editIcon"
          type="button"
          class="rounded float-end"
          style={{ color: 'blue' }}
          data-bs-toggle="modal"
          data-bs-target={`#edit-modal-${KTsession._id}`}
        />
      </p>
      <div className="modal fade" id={`edit-modal-${KTsession._id}`} tabIndex="-1" aria-labelledby="edit-modal-label" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="edit-modal-label">
                Edit
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form onSubmit={onUpdate}>
                <div className="mb-3">
                  <label htmlFor="sessionName" className="form-label">
                    KT Name
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.sessionName && 'is-invalid'}`}
                    id="sessionName"
                    name="sessionName"
                    value={updatedKTsession.sessionName}
                    onChange={onChange}
                  />
                  {errors.sessionName && <div className="invalid-feedback">{errors.sessionName}</div>}
                </div>
                <div className="mb-3">
                  <label htmlFor="sessionDesc" className="form-label">
                    KT Introduction
                  </label>
                  <input
                    type="text"
                    className={`form-control ${errors.sessionDesc && 'is-invalid'}`}
                    id="sessionDesc"
                    name="sessionDesc"
                    value={updatedKTsession.sessionDesc}
                    onChange={onChange}
                  />
                  {errors.sessionDesc && <div className="invalid-feedback">{errors.sessionDesc}</div>}
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    accept="video/mp4,video/mpeg,video/quicktime,video/x-msvideo"
                    className={`form-control ${errors.sessionFile && 'is-invalid'}`}
                    aria-label="file example"
                    onChange={onChange}
                  />
                  <p>Only video files are allowed.</p>
                  {errors.sessionFile && <div className="invalid-feedback">{errors.sessionFile}</div>}
                </div>
                <div className="modal-footer">
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

