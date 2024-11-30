require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const Person = require('./models/person')

morgan.token('req-body', (req) => JSON.stringify(req.body));

const errorHandler = (error, request, response, next) => {
    console.error(error.message);

    if (error.name == 'CastError' && error.kind == 'ObjectId') {
        return response.status(400).json({ error: 'malformatted id' })
    }

    next(error)
}

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.static('dist'))
app.use(express.json());
app.use(morgan(':method :url :status :req[content-length] - :total-time ms :req-body'))

app.get('/api/persons', (request, response, next) => {
    Person
        .find({})
        .then(persons => {
            response.json(persons)
        })
        .catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id;

    Person
        .findById(id)
        .then(person => {
            if (person) {
                response.json(person)
            } else {
                response.status(404).json({ error: "Person not found" })
            }
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;

    Person
        .deleteOne({ _id: id })
        .then(person => {
        })
})

app.post('/api/persons', (request, response, next) => {
    const { name, number } = request.body;

    if (!name || !number) {
        return response.send(400).json({
            error: 'missing content'
        })
    }

    const person = new Person({
        name: name,
        number: number,
    })

    person
        .save()
        .then(savedPerson => {
            response.status(201).json(savedPerson)
        })
        .catch(error => next(error))
})

app.get('/info', (request, response) => {
    const personsLength = persons.length;
    const time = new Date().toString();

    response.send(
        `<p> Phonebook has info for ${personsLength} </p>
        <p> ${time} </p>`
    )
})

app.use(errorHandler)
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})