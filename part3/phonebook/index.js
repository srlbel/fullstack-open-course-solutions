const express = require('express');
const morgan = require('morgan');

const app = express();
const PORT = 3001;

app.use(express.static('dist'))
app.use(express.json());

morgan.token('req-body', (req) => {
    return JSON.stringify(req.body);
})
app.use(morgan(':method :url :status :req[content-length] - :total-time ms :req-body'))

let persons =
    [
        {
            "id": "1",
            "name": "Arto Hellas",
            "number": "040-123456"
        },
        {
            "id": "2",
            "name": "Ada Lovelace",
            "number": "39-44-5323523"
        },
        {
            "id": "3",
            "name": "Dan Abramov",
            "number": "12-43-234345"
        },
        {
            "id": "4",
            "name": "Mary Poppendieck",
            "number": "39-23-6423122"
        }
    ]


app.get('/api/persons', (request, response) => {
    if (!persons) {
        return response.status(404).json({
            "error": "resource not found"
        })
    }

    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    const person = persons.find(person => person.id === id)

    if (!person) {
        return response.status(404).json({
            "error": "resource not found"
        });
    }

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id;
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
})

app.post('/api/persons', (request, response) => {
    const { name, number } = request.body;
    const id = Math.floor(Math.random() * 100001);

    if (!name || !number) {
        return response.send(400).json({
            error: 'missing content'
        })
    }

    const isRepeated = persons.filter(person => person.name === name)

    if (!isRepeated) {
        return response.status(409).json({
            "error": "name must be unique"
        })
    }

    const person = { id, name, number };
    persons = persons.concat(person)

    response.status(201).json(person)
})

app.get('/info', (request, response) => {
    const personsLength = persons.length;
    const time = new Date().toString();

    response.send(
        `<p> Phonebook has info for ${personsLength} </p>
        <p> ${time} </p>`
    )
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})