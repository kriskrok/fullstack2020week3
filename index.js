const express = require('express')
const morgan = require('morgan')
const app = express()
const PORT = 3001

app.use(morgan('tiny'))
app.use(express.json())

const unknownEndpoint = (req, res) => {
  response.status(404).send({error: 'unknown endpoint'})
}

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

app.get('/', (request, response) => {
  response.send('<h1>The cake is a lie!</h1>')
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

  console.log(person)
  if (person) {
    res.json(person)
  } else {
    res.status(404).end()
  }
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  
  console.log(`id: ${id}`, persons.some(person => person.id === id))

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
