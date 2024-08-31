import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { exec } from 'child_process';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(cors({
  origin: 'http://localhost:5173', // or the domain your client is running on
}));

const generateImageDataScript = path.join(__dirname, '../src/generateImageData.js');
const jsonFilePath = path.join(__dirname, '../src/imageData.json');
console.log('resolved Path:', generateImageDataScript)

app.get('/generate-image-data', (req, res) => {
  // Execute the generateImageData.js script

  exec(`node ${generateImageDataScript}`, (err, stdout, stderr) => {
    if (err) {
      console.error(`Error executing script: ${err}`);
      res.status(500).send('Error generating image data');
      return;
    }
    
    if (stderr) {
      console.error(`Script stderr: ${stderr}`);
      res.status(500).send('Error generating image data');
      return;
    }
    
    // Read the updated imageData.json file
    fs.readFile(jsonFilePath, 'utf-8', (fileReadError, data) => {
      if (fileReadError) {
        console.error(`Error reading JSON file: ${fileReadError}`);
        res.status(500).send('Error reading image data');
        return;
      }
      
      try {
        const imageData = JSON.parse(data);
        res.setHeader('Content-Type', 'application/json');
        res.send(imageData); // Send JSON response
      } catch (parseError) {
        console.error(`Error parsing JSON: ${parseError}`);
        res.status(500).json({ error: 'Error parsing image data', details: parseError.message });
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
