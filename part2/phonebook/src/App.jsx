import { useEffect, useState } from 'react';
import personService from './services/PersonService'
import Form from './Form';
import List from './List';
import Filter from './Filter';
import Notification from './Notificacion';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [newType, setNewType] = useState('');

  const handleNameChange = (event) => setNewName(event.target.value);
  const handleNumberChange = (event) => setNewNumber(event.target.value);
  const handleFilterChange = (event) => setNewFilter(event.target.value);

  const showMessage = (message, type) => {
    setNewMessage(`${message}`);
    setNewType(`${type}`);

    setTimeout(() => {
      setNewMessage('');
      setNewType('');
    }, 5000)
  }

  useEffect(() => {
    personService
      .getAll()
      .then((response) => {
        setPersons(response.data);
      })
  }, []);

  const notesToShow = newFilter
    ? persons.filter(person => person.name.includes(newFilter))
    : persons

  const addPerson = (event) => {
    event.preventDefault();
    const isRepeated = persons.filter(person => person.name === newName)
    const repeatedPerson = isRepeated[0];

    const personObject = { ...repeatedPerson, name: newName, number: newNumber };

    if (isRepeated.length > 0) {
      if (window.confirm(`${personObject.name} is already added on the phonebook, replace the current number with the new one?`)) {

        personService
          .update(personObject.id, personObject)
          .then(() => {
            setPersons(persons.map(person => person.id !== personObject.id ? person : personObject))
            showMessage(`${personObject.name} is updated with new number: ${personObject.number}`, 'success')
          })
          .catch((e) => {
            showMessage(`${personObject.name} is already deleted from server`, 'error')
          })

        setNewName('');
        setNewNumber('');
        return;
      }
    }

    personService
      .create(personObject)
      .then((response) => {
        setPersons(persons.concat(response.data));
        showMessage(`${personObject.name} is created with new number: ${personObject.number}`, 'success')
      }).catch(() => {
        showMessage(`Error creating record for ${personObject.name}`, 'error')
      })

    setNewName('');
    setNewNumber('');
  };

  const handleDelete = (name, id) => {
    if (window.confirm(`Delete ${name} ?`)) {
      personService
        .delete(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
          showMessage(`${name} has been deleted from the record`, 'success')
        })
        .catch((e) => {
          showMessage(`${name} is already deleted from server`, 'error')
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={newMessage} type={newType} />
      <Filter newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2> Add a new contact</h2>
      <Form
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />
      <h2>Numbers</h2>
      <List
        persons={notesToShow}
        handleDelete={handleDelete}
      />
    </div>
  );
};

export default App;
