import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from 'axios';
import NavBar from "../NavBar";
import Pdf from './Pdf';

const ViewContent = () => {
     const articleId = useParams();
    const [article, setArticle] = useState([]);
    useEffect(() => {
        console.log(articleId.id);
        axios.get(`http://localhost:1337/arts/${articleId.id}`)
          .then(response => {
            setArticle(response.data);
            console.log(response.data)
          })
          .catch(function (error) {
            console.log(error);
          });
      }, [articleId.id]);
    return (
        <React.Fragment>
            <div style={{backgroundColor: "#fefefe"}}> 
             <NavBar></NavBar>
             <div className="container p-4"> 
              <div className="card" style={{ backgroundColor: "#70B9E6" }}>
              <div className="card-body">
                <h1 style={{ font: "25px" , color: "#ffffff" }}>NETS: UML Diagrams</h1>
              </div>
              </div>
              </div>
            <div className="container p-4">
                <div className="card">
                    <div className="card-header">
                    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: "#f7f7f7" }}>
                     
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-5 mb-lg-0">
                        <li className="nav-item"  style={{fontWeight:"bold"}}>
                             
                            <Link to="/" className="nav-link active">Units</Link>
                        </li>
                        <li className="nav-item"  style={{fontWeight:"bold"}}>
                             
                            <Link to="/article" className="nav-link">Articles</Link>
                        </li>
                        <li className="nav-item"  style={{fontWeight:"bold"}}>
                            
                            <Link to="/" className="nav-link">Discussion Forums</Link>
                        </li>
    
                    </ul>
                    
                </div>
                    </nav>
                    </div>
                    <div className="card-body">
                        <div className="container p-3">
                        <h4 style={{ font: "25px" , color: "#000000" }}>Article 01</h4>
                        <br></br>
                            <Pdf url={article}/>
                        </div>     
                    </div>
                     
                </div>
                 <p></p>
                </div>
            </div>
        </React.Fragment>
    );
}
export default ViewContent;

 