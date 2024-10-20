import React, { useState, useEffect } from 'react';
import CategoryMenu from './Components/CategoryMenu';
import Gallery from './Components/Gallery';
import ImageData from './imageData';

function App() {
  const [categories, setCategories] = useState([]); 
  const [activeCategory, setActiveCategory] = useState(''); 
  const [filteredImages, setFilteredImages] = useState([]);

  useEffect(() => {
    // Set the image data directly from the imported local file
    if (ImageData.length > 0) {
      // Extract unique categories
      const uniqueCategories = [...new Set(ImageData.map((image) => image.category))];
      setCategories(uniqueCategories);
      
      // Set active category and filter images if there are categories
      if (uniqueCategories.length > 0) {
        setActiveCategory(uniqueCategories[0]);
        setFilteredImages(ImageData.filter((image) => image.category === uniqueCategories[0]));
      }
    }
  }, []); // Only runs once when the component mounts

  const handleSelectCategory = (category) => {
    console.log("Category Selected:", category);
    setActiveCategory(category);
    setFilteredImages(ImageData.filter((image) => image.category === category));
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

export default App;
