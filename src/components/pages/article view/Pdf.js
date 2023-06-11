import React from 'react'
 
function Pdf(props) {

 
  return (
     props.url.map((article)=>(
    <div style={{textAlign:"center",height:"900px"}}>
        {/* <iframe title="myframe" style={{height:"700px",width:"850px"}}
        src={article.articleUrl}
        width="500"
        height="375"
      >
      </iframe> */}
    <embed title="myframe" style={{height:"700px",width:"850px"}}
    src={article.articleUrl+'#toolbar=0'} onContextMenu={(event) => event.preventDefault()} width="500" height="375" />


     
    </div>
     ))
  )
}

export default Pdf

{/* <div style={{textAlign:"center",height:"900px"}}>
<iframe title="myframe" style={{height:"700px",width:"850px"}}
src="https://drive.google.com/file/d/1jG4JgfP9Nx0_3N_okYxyan6GJk7LYE7a/preview"
width="500"
height="375"
>
</iframe>
</div> */}
 