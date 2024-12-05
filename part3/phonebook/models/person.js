const mongoose = require('mongoose');
mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI
mongoose.connect(url)
  .then(result => {
    console.log('connected to MONGODB');
  })
  .catch(e => {
    console.error('error conecting to MONGODB: ', e.message);
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLenght: 3,
    required: true
  },
  number: Number,
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  }
})

module.exports = mongoose.model('Person', personSchema)
