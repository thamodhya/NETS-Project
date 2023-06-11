import React from 'react';
import Button from '../Button';

const Buttons = ({ showForm,changeTextAndColor}) => {
    return (
        <> 
        <div className="container p-3">               
  	                    <Button onClick={showForm } color={changeTextAndColor ? ' #625F5F' : '#1D9EEC'} text={changeTextAndColor ? 'Close' : 'Add Question'}/> 
                        <br></br>
                        <br></br>

                        </div>

 
</>
    )
}

export default Buttons;