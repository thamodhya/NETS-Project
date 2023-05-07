
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import swal from 'sweetalert';

const ConfirmSubmit = ({ unitId, quizSubmission }) => {
  const navigate = useNavigate();

  const handleSubmit = () => {
     
    const newSubmission = {   
      questions: quizSubmission
    };
    axios.post(`http://localhost:1337/submissions/${unitId}`, newSubmission)
      .then(response => {
        swal('Quiz submitted!', 'Your quiz has been submitted.', 'success');
        navigate(`/quiz/${unitId}`);
      })
      .catch(error => {
        console.error(error);
        swal('Oops!', 'Something went wrong. Please try again.', 'error');
      });
      console.log(newSubmission);
  };

  return (
    <div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button
          className="btn btn-primary"
          type="button"
          data-bs-toggle="modal"
          data-bs-target="#confirm-modal"
        >
          Submit
        </button>
      </div>

      <div
        className="modal fade"
        id="confirm-modal"
        tabIndex="-1"
        aria-labelledby="confirm-modal-label"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm Submit</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are you sure you want to submit?
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
 );
};

export default ConfirmSubmit;


 