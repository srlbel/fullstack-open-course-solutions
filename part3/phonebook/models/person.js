const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const uri = process.env.MONGODB_URI
mongoose.connect(uri)
  .then(() => {
    console.log('connected to MONGODB')
  })
  .catch(e => {
    console.error('error conecting to MONGODB: ', e.message)
  })


const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true,
    unique: true
  },
  number: {
    type: String,
    minLength: 8,
    required: true,
    validate: {
      validator: function (v) {
        return /^\d{2,3}-\d{7,}$/.test(v)
      },
      message: props => `${props.value} is not a valid phone number`
    }
  }
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
