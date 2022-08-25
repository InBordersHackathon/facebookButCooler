
const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');

app.use(cors({
    origin: '*'
}));

app.get('/', (req, res) => {
  res.json({ data: 'Hello World!' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
