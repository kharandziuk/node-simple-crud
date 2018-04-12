const express = require('express')
const bodyParser = require('body-parser')
const crypto = require("crypto");
const cors = require('cors')

const getId = () => crypto.randomBytes(16).toString("hex");

const app = express()
const names = [
  { id: getId(), name: 'katia' }
]

app.use(bodyParser.json())
app.use(cors())

app.get('/names', (req, res) => {
  res.json(names)
})

app.post('/names', (req, res) => {
  const newId = getId()
  const { name } = req.body
  names.push({ id: newId, name })
  res
    .status(201)
    .json({ id: newId })
})

app.delete('/names', (req, res) => {
  const { id } = req.body
  const indexToRemove = names.findIndex(obj => obj.id === id )
  names.splice(indexToRemove, 1)
  res
    .status(200)
    .json({ status: 'success'})
})


app.listen(3000, () => {
  console.log('listening on 3000')
})
