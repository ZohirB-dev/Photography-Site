import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from 'react-dropzone';

// Firebase configuration
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Removed duplicate import
import { storage } from "../firebase";

function ImageDrop({ className }) {
  const [isVisible, setIsVisible ] = useState(false)

  const toggleImageDrop = () =>{
    setIsVisible((prev) => !prev);
  }

  useEffect(()=>{
    const handleKeyPress = (event) => {
      if ( event.ctrlKey && event.key === 'd'){
        event.preventDefault();
        toggleImageDrop()
      }
    }

    window.addEventListener('keydown', handleKeyPress);

    return () =>{
      window.removeEventListener('keydown', handleKeyPress)
    }
  }, [])





    const onDrop = useCallback(async (acceptedFiles) => { // Fixed parentheses here
        // Iterate over each file and add it to Firebase
        acceptedFiles.forEach((file) => {
            const storageRef = ref(storage, `images/${file.name}`); // Creates a reference to the file's path in Firebase
            const uploadTask = uploadBytesResumable(storageRef, file);

            // Monitor upload progress and handle the result
            uploadTask.on(
                'state_changed',
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    console.error("Upload failed:", error);
                },
                async () => {
                    const downloadURL = await getDownloadURL(uploadTask.snapshot.ref); // Changed variable name
                    console.log('File available at:', downloadURL); // Now using the correct variable name
                }
            );
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  
    return (
      
        <>
        {isVisible && (

          <div {...getRootProps({
              className: className
          })}>
              <input {...getInputProps()} />
              {
                  isDragActive ?
                      <p>Let go</p> :
                      <p>Drop and Drop Images here</p>
              }
          </div>
        )}
        </>
    );
}

export default ImageDrop;
