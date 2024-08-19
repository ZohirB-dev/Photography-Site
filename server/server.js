import express from 'express';
import cors from 'cors'; // Import cors
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import fs from 'fs';

const app = express();
const port = 3001;



app.use(cors({
  origin: 'http://localhost:5173', // or the domain your client is running on
}));


const jsonFilePath = path.join(__dirname, '../src/imageData.json');

app.get('/generate-image-data', (req, res) => {
  console.log('recieved request for data')

  fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error reading JSON file: ${err}`);
      res.status(500).send('Error reading image data');
      return;
    }
    try {
      const imageData = JSON.parse(data); // Parse JSON data
      console.log('Sending JSON Data:', imageData);
      res.json(imageData); // Send JSON response
    } catch (parseError) {
      console.error(`Error parsing JSON: ${parseError}`);
      res.status(500).send('Error parsing image data');
    }
  });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});