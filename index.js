const express = require('express');
const { connectToDatabase } = require('./config/database');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
connectToDatabase()



app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});