import React, {Component} from 'react';
 
 
const Edit = ({ todo }) => {
     

     
        return (

            <div class="modal fade" id="editarticle" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
      <h1 class="modal-title fs-5" id="exampleModalLabel">Chapter Content</h1>
         <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body"> 
              
                <form>
                     
                        <label>Unit </label>
                        <input  type="text"
                                className="form-control"
                                value={''}
                                 
                                />

                                <br></br>
                     
                        <label>Introduction </label>
                        <input  type="text"
                                className="form-control"
                                value={''}
                                 
                                />
                    
                     
                    <div class="modal-footer">
                        <input type="submit" value="Update Unit" className="btn btn-primary" />
                    </div>
                </form>
            </div>
            </div>
            </div>
            </div>
            


        )
    }
export default Edit;

 
// this.props.match.params.id