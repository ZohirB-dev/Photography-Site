import React, { useState, useEffect } from "react";

function AppTwo() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);


    fetch("/generate-image-data")
    .then(response => {
        // Check if response is OK and content type is JSON
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const contentType = response.headers.get("Content-Type");
        if (!contentType || !contentType.includes("application/json")) {
            console.log(response.json())
            throw new Error("Response is not JSON");
        }
        return response.json();
    })
    .then(data => {
        setData(data);
    })
    .catch(error => {
        console.error('Error fetching image data:', error);
        setError(error.message); // Store error message in state
    });

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
