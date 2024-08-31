import React, { useState, useEffect } from 'react';
import CategoryMenu from './Components/CategoryMenu';
import Gallery from './Components/Gallery';

function App() {
  const [imageData, setImageData] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [activeCategory, setActiveCategory] = useState(''); 
  const [filteredImages, setFilteredImages] = useState([]); 
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if initial data has been fetched

  const fetchData = async () => {
    try {
        console.log("Fetching data from API...");
        const response = await fetch('http://localhost:3001/generate-image-data');
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const parsedData = await response.json();
        
        console.log("Fetched Data:", parsedData);
        
        if (!Array.isArray(parsedData)) {
            throw new Error('Fetched data is not an array');
        }
        
        setImageData(parsedData);
        
        const uniqueCategories = [...new Set(parsedData.map((image) => image.category))];
        setCategories(uniqueCategories);

        if (uniqueCategories.length > 0) {
            setActiveCategory(uniqueCategories[0]);
            setFilteredImages(parsedData.filter((image) => image.category === uniqueCategories[0]));
        }

        setIsDataFetched(true); // Set flag to true after data is successfully fetched

    } catch (error) {
        console.error('Error fetching image data:', error);
    }
  };

  useEffect(() => {
    if (!isDataFetched) {
      fetchData(); // Fetch data when component mounts if not already fetched
    }
  }, [isDataFetched]);

  const handleSelectCategory = (category) => {
    console.log("Category Selected:", category);
    setActiveCategory(category);
    setFilteredImages(imageData.filter((image) => image.category === category));
  };

  return (
    <div>
      <button onClick={fetchData.bind(this)}>Reload Images</button> {/* Button with bind */}
      <CategoryMenu
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />
      <Gallery images={filteredImages} />
    </div>
  );
}

export default App;
