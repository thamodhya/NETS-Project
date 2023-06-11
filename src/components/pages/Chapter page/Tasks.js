import Edit from "./EditUnit";
import Delete from "./DeleteUnit";
import { Link } from "react-router-dom";

const Tasks = ({ unit }) => {
    return(
        <div>
      <div className='card'>
        <div className='card-body' style={{ backgroundColor: '#DDEDF8' }}>
          <div class='col-lg-12'> 
         
        <h3 style={{ font: '25px', color: '#000000' }}>
        <Link to={"/Unit/"+unit._id} style={{textDecoration:"none",color: "#000000"}}> {unit.unitName}</Link>
            </h3>
             <div>             
              <Edit key={unit._id} unit={unit} />             
             </div>              
            <p>{unit.unitDesc} </p>
            <div>             
              <Delete key={unit._id} unit={unit} />            
             </div>
            </div>
            </div>
            </div>
            </div>
    )
}
export default Tasks;