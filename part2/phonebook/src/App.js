import { useState, useEffect } from "react";
import personService from "./services/persons";

const Person = ({ name, number, id, persons, setPersons }) => {
  const handleDelete = (id) => {
    if (window.confirm(`Delete ${name} from Contacts?`)) {
      personService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
    }
  };

  return (
    <>
      {name} {number}
      <button onClick={() => handleDelete(id)}>Delete</button>
      <br />
    </>
  );
};

const Contacts = ({ filter, persons, filteredPersons, setPersons }) => {
  if (filter === "") {
    return persons.map((person) => (
      <Person
        key={person.name}
        name={person.name}
        number={person.number}
        id={person.id}
        persons={persons}
        setPersons={setPersons}
      />
    ));
  } else {
    return filteredPersons.map((person) => (
      <Person key={person.name} name={person.name} number={person.number} />
    ));
  }
};

const Filter = ({ persons, setFilteredPersons, setFilter }) => {
  const handleFilterChange = (event) => {
    const filterValue = event.target.value;
    let personsFilterTemp = [];

    for (let i = 0; i < persons.length; i++) {
      if (persons[i].name.toLowerCase().includes(filterValue.toLowerCase())) {
        personsFilterTemp = personsFilterTemp.concat(persons[i]);
      }
    }
    setFilteredPersons(personsFilterTemp);
    setFilter(filterValue);
  };

  return (
    <>
      Filter by name: <input onChange={handleFilterChange} />
    </>
  );
};

const AddContactForm = ({
  persons,
  setPersons,
  newNumber,
  setNewNumber,
  newName,
  setNewName,
}) => {
  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    const isNotAdded = !persons.find(
      (element) => newPerson.name === element.name
    );

    if (isNotAdded) {
      personService
        .create(newPerson)
        .then((returnedPerson) => setPersons(persons.concat(returnedPerson)));
    } else {
      if (
        window.confirm(
          `${newName} is already added to phonebook. Replace old number with a new one?`
        )
      ) {
        let updatedPerson = persons.find((person) => person.name === newName);
        updatedPerson.number = newNumber;
        const tempID = updatedPerson.id;
        personService
          .update(tempID, updatedPerson)
          .then((returnedPerson) =>
            setPersons(
              persons.map((p) => (p.id !== tempID ? p : returnedPerson))
            )
          );
      }
    }
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">Add</button>
      </div>
    </form>
  );
};

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filteredPersons, setFilteredPersons] = useState(persons);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

  return (
    <>
      <h2>Phonebook</h2>
      <Filter
        persons={persons}
        setFilteredPersons={setFilteredPersons}
        setFilter={setFilter}
      />
      <h2>Add new Contact</h2>
      <AddContactForm
        persons={persons}
        setPersons={setPersons}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
        newName={newName}
        setNewName={setNewName}
      />
      <h2>Numbers</h2>
      <Contacts
        filter={filter}
        persons={persons}
        filteredPersons={filteredPersons}
        setPersons={setPersons}
      />
    </>
  );
};

export default App;
