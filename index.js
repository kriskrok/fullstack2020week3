require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const mongoose = require('mongoose')

const PORT = process.env.PORT

app.use(express.static('build'))
app.use(express.json())
app.use(cors())

morgan.token( 'body', (req, res) => JSON.stringify(req.body) )

app.use(
  morgan(':method :url :status :req[content-length] - :response-time ms :body'))

const Contact = require('./models/contact')

const unknownEndpoint = (req, res) => res.status(404).send({error: 'unknown endpoint'})

app.get('/api/persons', (req, res, next) => {
  Contact.find({}).then(contacts => {
    res.json(contacts.map(contact => contact.toJSON()))
  })
  .catch(error => next(error))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  if (!body.name) {
    return res.status(400).json({error: 'name missing'})
  }

  if (!body.number) {
    return res.status(400).json({error: 'number missing'})
  }

  const contact = new Contact({
    name: body.name,
    number: body.number,
  })

  contact.save().then(savedContact => {
    res.json(savedContact.toJSON())
  })
  .catch(error => next(error))
})

app.get('/api/persons/:id', (req, res, next) => {
  Contact.findById(req.params.id)
    .then(contact => {
      if (contact) {
        res.json(contact.toJSON())
      } else {
        res.status(404).end()
      }
    })
    .catch(error => next(error))
})

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body

  const contact = {
    name: body.name,
    number: body.number,
  }

  Contact.findByIdAndUpdate(req.params.id, contact, { new: true })
  .then(updatedContact => {
    res.json(updatedContact.toJSON())
  })
  .catch(error => next(error))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Contact.findByIdAndRemove(req.params.id)
  .then(result => {
    res.status(204).end()
  })
  .catch(error => next(error))
})

app.get('/info', (req, res, next) => {
  Contact.find({}).then(contacts => {
    const acquaintances = contacts.reduce((acc, cur) => acc + 1, 0)
    res.send(`<p>Phonebook has info for ${acquaintances} people</br>${new Date()}</p>`)
  })
  .catch(error => next(error))
})


app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    return response.status(400).send({ error: 'malformed id' })
  }

  next(error)
}

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
