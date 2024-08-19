// src/generateImageData.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

//Get file name equivalent 
const __filename = fileURLToPath(import.meta.url)

//Get __durname equivalent
const __dirname = dirname(__filename)


// Define paths
const imagesDirectory = path.join(__dirname, 'assets', 'images');
const outputFilePath = path.join(__dirname, 'imageData.js');

// Define a function to categorize based on file name keywords
function categorizeImage(filename) {
  if (filename.includes('London')) return 'London';
  if (filename.includes('Algiers')) return 'Algiers';
  if (filename.includes('Madrid')) return 'Madrid';
  if (filename.includes('Barcelona')) return 'Barcelona';
  return 'other'; // Default category if no match
}

// Read image files from directory
const imageFiles = fs.readdirSync(imagesDirectory).filter(file =>
  ['.jpg', '.jpeg', '.png', '.svg'].includes(path.extname(file).toLowerCase())
);

// Generate image data
const imageData = imageFiles.map((file, index) => ({
  id: index + 1,
  category: categorizeImage(file),
  src: `src/assets/images/${file}`,
  alt: file.replace(/[^a-zA-Z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim() // Clean up the alt text
}));

// Write to file
const fileContent = `const imageData = ${JSON.stringify(imageData, null, 2)};
export default imageData;`;

// Write to JSON file
fs.writeFileSync(outputFilePath, JSON.stringify(imageData, null, 2));
console.log('Image data written to file.');

// Output the JSON data to the console (this can be captured by the calling process)
