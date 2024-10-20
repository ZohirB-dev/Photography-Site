import React, { useCallback } from "react";
import { useDropzone } from 'react-dropzone';


function MyDropzone({className}) {
    const onDrop = useCallback(acceptedFiles => {
      // Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})
  
    return (
      <div {...getRootProps({
        className: className
      })}>
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Let go</p> :
            <p>Drop the images here</p>
        }
      </div>
    )
  }

  export default MyDropzone;