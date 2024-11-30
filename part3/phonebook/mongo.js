const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('give password as argument');
  process.exit(1);
}

const pswd = process.argv[2];
const url = `mongodb+srv://dev:${pswd}@part3.udkgc.mongodb.net/?retryWrites=true&w=majority&appName=part3`;

mongoose.set('strictQuery', false);
mongoose.connect(url);


const personSchema = new mongoose.Schema({
  name: String,
  number: Number,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length < 4) {
  Person
    .find({})
    .then(result => {
      console.log('phonebook: ')
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`)
      })

      mongoose.connection.close()
      process.exit(0);
    })

}

const name = process.argv[3];
const number = process.argv[4];

const person = new Person({
  name: name,
  number: number,
})

person
  .save()
  .then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`);
    mongoose.connection.close()
  })

