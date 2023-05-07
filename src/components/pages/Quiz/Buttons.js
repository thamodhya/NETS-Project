import React from 'react';
import Button from '../Button';
import Del from '../Del';

const Buttons = ({ showForm,changeTextAndColor}) => {
    return (
        <> 
        <div className="container p-3">
                         
                         
  	                    <Button onClick={showForm } color={changeTextAndColor ? ' #625F5F' : '#1D9EEC'} text={changeTextAndColor ? 'Close' : 'Add Question'}/> 
                        <br></br>
                        <br></br>
                        <div> 
                        <button type="button"  class="btn btn-outline-light"  style={{backgroundColor:"#1D9EEC"}} data-bs-toggle="modal" data-bs-target="#del">Delete Quiz</button>
                        </div>                       
    <Del/>

                        </div>

 
</>
    )
}

export default Buttons;