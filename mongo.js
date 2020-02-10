const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.error('Kindly provide password as an command-line argument')
  process.exit(1)
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@flock-d7auo.mongodb.net/phonebook-app?retryWrites=true`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {

  Contact.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)  
    })
    mongoose.connection.close();
  })

} else if (process.argv.length === 5) {

  const newContact = new Contact({
    name: process.argv[3],
    number: process.argv[4],
  })
  
  newContact.save().then(response => {
    console.log(`Added ${process.argv[3]} with phonenumber ${process.argv[4]} to phonebook`);
    mongoose.connection.close();
  })

} else {
  mongoose.connection.close();
  process.exit(1)
}
