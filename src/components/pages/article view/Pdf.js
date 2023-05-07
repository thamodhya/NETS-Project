import React from 'react'
 
function Pdf() {
 
  return (
    <div style={{textAlign:"center",height:"900px"}}>
        {/* <iframe title="myframe" style={{height:"700px",width:"850px"}}
        src="https://drive.google.com/file/d/1jG4JgfP9Nx0_3N_okYxyan6GJk7LYE7a/preview"
        width="500"
        height="375"
      >
      </iframe> */}
      <embed 
      controls="controls" controlsList="nodownload"  
      src="https://firebasestorage.googleapis.com/v0/b/fileuploadtest-4dc2b.appspot.com/o/images%2FIN2110_Assignment%2003.pdf?alt=media&token=3df2d306-0182-4d2c-9bb9-1e41ca196160" 
      width="500" height="375"></embed>
    </div>
  )
}

export default Pdf
 