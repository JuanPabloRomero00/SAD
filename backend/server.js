const express = require('express')
const cors = requiere('cors')
const app = express()
const connectDB = require('./src/config/db');
const port = 3000

app.use(cors());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})