import React from 'react'
 
function Pdf(props) {
 
  return (
     props.url.map((article)=>(
    <div style={{textAlign:"center",height:"900px"}}>
    <embed title="myframe" style={{height:"700px",width:"850px"}}
    src={article.articleUrl+'#toolbar=0'} onContextMenu={(event) => event.preventDefault()} width="500" height="375" />


     
    </div>
     ))
  )
}

export default Pdf

