import React, { useState, useEffect } from "react";

function AppTwo() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    console.log("Applications rendered")
    useEffect(() => {
        fetch("http://localhost:3001/generate-image-data")
            .then(response => {
                // Check if response is OK
                console.log('Response: ', response)
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
    
                // Check if content type is JSON
                const contentType = response.headers.get('Content-Type');
                console.log('Content-Type:', contentType)
                if (!contentType || !contentType.includes("application/json")) {
                    throw new Error("Response is not JSON");
                }
    
                return response.json(); // Parse the JSON data from the response body
            })
            .then(data => {
                setData(data); // Use the data in your state
            })
            .catch(error => {
                console.error('Error fetching image data:', error);
                setError(error.message); // Store error message in state
            });
    }, []);
    

    return (
        <div>
            {error ? (
                <p>Error: {error}</p>
            ) : data.length === 0 ? (
                <p>No data available</p>
            ) : (
                data.map((image) => (
                    <div key={image.id}>
                        <h1>{image.id}</h1>
                        <img src={image.src} alt={image.alt} />
                    </div>
                ))
            )}
        </div>
    );
}

export default AppTwo;
