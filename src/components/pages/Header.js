import React from 'react';
import Button from './Button';

const Header = ({ showForm,changeTextAndColor}) => {
    return (
        <> 
        <div className="container p-3">
                        <h4 style={{ font: "25px" , color: "#000000" }}>Content</h4>
                         
  	                    <Button onClick={showForm } color={changeTextAndColor ? ' #625F5F' : '#1D9EEC'} text={changeTextAndColor ? 'Close' : 'Add'}/> 
                        

                        </div>

 
</>
    )
}

export default Header;

