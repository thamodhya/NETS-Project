
import axios from 'axios';
import React, { useState } from 'react';
import swal from 'sweetalert';
 
import * as Yup from "yup";

import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../../firebase";
import { v4 } from "uuid";

const AddKT = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);

  const imagesListRef = ref(storage, "images/");
  
   

  const validationSchema = Yup.object().shape({
    sessionName: Yup.string().required('KT Session name is required'),
    sessionDesc: Yup.string().required('Description is required'),
  });

  const [sessionName, setsessionName] = useState('');
  const [sessionDesc, setsessionDesc] = useState('');
  const [errors, setErrors] = useState({});

   
  const onChangeKtName = (e) => {
    setsessionName(e.target.value);
  };

  const onChangeKtIntro = (e) => {
    setsessionDesc(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();

    try {
      await validationSchema.validate({ sessionName: sessionName, sessionDesc: sessionDesc }, { abortEarly: false });
     
    console.log(`Form submitted:`);
    console.log(`KT Name: ${sessionName}`);
    console.log(`KT Introduction: ${sessionDesc}`);    

    var newKT = {
      sessionName: sessionName,
      sessionDesc: sessionDesc,
    };

    if (imageUpload == null) return;
    const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
 
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        console.log(url);
        newKT = {...newKT,sessionUrl:url}
        axios.post('http://localhost:1337/kts/add', newKT)
            .then((res) => {
                console.log(res.data);
                    swal({
                      icon: "success",
                      text: "Successfully created",
                    });
                    setsessionName('');
                    setsessionDesc('');
                    setErrors({});
                })
        
      });
    });      

     
              }catch(err) {
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
                };
  };

  return (
    <div style={{ marginTop: 20 }}>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label>KT </label>
          <input type="text" className="form-control" value={sessionName} onChange={onChangeKtName} />
          {errors.sessionName && <div className="error">{errors.sessionName}</div>}
          <br></br>
          <label>Introduction </label>
          <input type="text" className="form-control" value={sessionDesc} onChange={onChangeKtIntro} />
          {errors.sessionDesc && <div className="error">{errors.sessionDesc}</div>}
          <br></br>
          <input type="file" class="form-control" aria-label="file example"  onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }} />
          <br></br>
          <input type="submit" value="Save KT Session" className="btn btn-primary" />
        </div>
      </form>
    </div>
  );
};

export default AddKT;