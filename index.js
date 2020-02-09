const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

const PORT = process.env.PORT || 3001

app.use(express.json())
app.use(cors())

morgan.token( 'body', (req, res) => JSON.stringify(req.body) )

app.use(
  morgan(':method :url :status :req[content-length] - :response-time ms :body'))

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4
  }
]

const generateID = () => Math.floor(Math.random() * (Number.MAX_SAFE_INTEGER - 1) + 1)

const previouslyAdded = (name) => persons.some(person => person.name === name)

const unknownEndpoint = (req, res) => res.status(404).send({error: 'unknown endpoint'})

app.get('/', (request, response) => {
  response.send('<h2>Aperture laboratories</h2><p>Cleveland, Ohio</p>')
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.post('/api/persons', (req, res) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({
      error: 'name missing'
    })
  }

  if (!body.number) {
    return res.status(400).json({
      error: 'number missing'
    })
  }

  if (previouslyAdded(body.name)) {
    return res.status(418).json({
      error: `${body.name} is already added to phonebook, name must be unique`
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateID()
  }

  persons = persons.concat(person)

  res.json(person)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(person => person.id !== id)
  res.status(204).end()
})

app.get('/info', (req, res) => {
  res.send(`<p>Phonebook has info for ${persons.length} people</br>${new Date()}</p>`)
})

app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
