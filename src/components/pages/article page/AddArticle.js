import React, { useState } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import * as Yup from 'yup';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../firebase';
import { v4 } from 'uuid';

function AddArticle() {
  const chapterId = '64848a1cd792d9e0909c70e0';
  const userid = '648050d3b39dcbdf90027b5a';
  const [articleUpload, setArticleUpload] = useState(null);
  const [uploading, setUploading] = useState(false); // New state for tracking upload status

  const validationSchema = Yup.object().shape({
    articleName: Yup.string().required('Article name is required'),
    articleDesc: Yup.string().required('Description is required'),
    articleFile: Yup.mixed()
      .required('File is required')
      .test(
        'fileFormat',
        'Only pdf and word files are allowed',
        (value) =>
          value &&
          ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'].includes(
            value.type
          )
      ),
  });

  const [articleName, setarticleName] = useState('');
  const [articleDesc, setarticleDesc] = useState('');
  const [errors, setErrors] = useState({});

  const onChangeArtName = (e) => {
    setarticleName(e.target.value);
  };

  const onChangeArtIntro = (e) => {
    setarticleDesc(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    try {
      await validationSchema.validate(
        { articleName: articleName, articleDesc: articleDesc, articleFile: articleUpload },
        { abortEarly: false }
      );

      console.log(`Form submitted:`);
      console.log(`Article Name: ${articleName}`);
      console.log(`Article Introduction: ${articleDesc}`);

      var newArticle = {
        belongsToChapter: chapterId,
        createdBy: userid,
        articleName: articleName,
        articleDesc: articleDesc,
      };

      if (articleUpload == null) return;

      const articleRef = ref(storage, `Articles/${articleUpload.name + v4()}`);
      setUploading(true); // Set the uploading state to true

      uploadBytes(articleRef, articleUpload).then((article) => {
        getDownloadURL(article.ref).then((url) => {
          console.log(url);
          newArticle = { ...newArticle, articleUrl: url };
          axios.post('http://localhost:1337/arts/add', newArticle).then((res) => {
            console.log(res.data);
            swal({
              icon: 'success',
              text: 'Successfully created',
            }).then(() => {
              window.location.reload(); // Refresh the page
            });
            setarticleName('');
            setarticleDesc('');
            setErrors({});
          });
        });
      }).finally(() => {
        setUploading(false); // Set the uploading state to false once the upload is complete
      });
    } catch (err) {
      console.error(err);
      const validationErrors = {};
      err.inner.forEach((e) => {
        validationErrors[e.path] = e.message;
      });
      setErrors(validationErrors);
      swal({
        icon: 'warning',
        text: 'Error',
      });
    }
  }

  return (
    <div style={{ marginTop: 20 }}>
      <form onSubmit={onSubmit}>
        <div className="form-control">
          <label>Article</label>
          <input
            type="text"
            className={`form-control ${errors.articleName && 'is-invalid'}`}
            value={articleName}
            onChange={onChangeArtName}
          />
          {errors.articleName && <div className="invalid-feedback">{errors.articleName}</div>}
          <br></br>
          <label>Introduction </label>
          <input
            type="text"
            className={`form-control ${errors.articleDesc && 'is-invalid'}`}
            value={articleDesc}
            onChange={onChangeArtIntro}
          />
          {errors.articleDesc && <div className="invalid-feedback">{errors.articleDesc}</div>}
          <br></br>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className={`form-control ${errors.articleFile && 'is-invalid'}`}
            aria-label="file example"
            onChange={(event) => {
              setArticleUpload(event.target.files[0]);
            }}
          />
          {errors.articleFile && <div className="invalid-feedback">{errors.articleFile}</div>}
          {uploading && <p className="upload-status" style={{color:"#013220"}}>Uploading file...</p>}  
          <p>Only pdf and word files are allowed.</p>
          <br></br>
          <input type="submit" value="Save Article" className="btn btn-primary" disabled={uploading} /> {/* Disable the button while uploading */}
        </div>
      </form>
    </div>
  );
}

export default AddArticle;




