import React, { useState, useEffect } from 'react';
import CategoryMenu from './Components/CategoryMenu';
import Gallery from './Components/Gallery';

function App() {
  const [imageData, setImageData] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [activeCategory, setActiveCategory] = useState(''); 
  const [filteredImages, setFilteredImages] = useState([]); 

  // Debugging Logs
  console.log("Component Rendered");

  const fetchData = async () => {
    try {
      console.log("Fetching data from API...");
      const response = await fetch('http://localhost:3001/generate-image-data');
      const text = await response.text();

      const jsonString = text.match(/\[.*\]/)[0];
      const parsedData = JSON.parse(jsonString);

      console.log("Fetched Data:", parsedData);

      setImageData(parsedData);
      const uniqueCategories = [...new Set(parsedData.map((image) => image.category))];
      setCategories(uniqueCategories);

      if (uniqueCategories.length > 0) {
        setActiveCategory(uniqueCategories[0]);
        setFilteredImages(parsedData.filter((image) => image.category === uniqueCategories[0]));
      }
    } catch (error) {
      console.error('Error fetching image data:', error);
    }
  };

  useEffect(() => {
    console.log("useEffect running...");
    fetchData(); // Fetch data when component mounts
  }, []); // Only run once on mount

  const handleSelectCategory = (category) => {
    console.log("Category Selected:", category);
    setActiveCategory(category);
    setFilteredImages(imageData.filter((image) => image.category === category));
  };

  return (
    <div>
      <CategoryMenu
        categories={categories}
        activeCategory={activeCategory}
        onSelectCategory={handleSelectCategory}
      />
      <Gallery images={filteredImages} />
    </div>
  );
}

