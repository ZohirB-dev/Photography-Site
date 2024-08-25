import express, { response } from 'express';
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

  fs.readFile(jsonFilePath, 'utf-8', (err, data) => {
    if (err) {
      console.error(`Error reading JSON file: ${err}`);
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


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});