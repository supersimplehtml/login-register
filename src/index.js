import express from "express"
import path from "path"
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname in your code.

const app = express()
const port = 8000
app.use(express.static(path.join(__dirname, 'public')));
app.get("/",(req,res) => {
    const filePath = path.join(__dirname, 'index.html');
    res.sendFile(filePath);
})
app.listen(port,() => {
    console.log(`app listening on port ${port}`)
})