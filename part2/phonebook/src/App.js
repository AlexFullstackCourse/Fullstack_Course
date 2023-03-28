import { useState } from "react";

const Person = ({ name, number }) => {
  return (
    <>
      {name} {number}
      <br />
    </>
  );
};

function App() {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  /** Function checking for equality of two objects.
   *  Use only if the application should save different numbers under the same name
   */
  /*
  const areTheseObjectsEqual = (first, second) => {
    const firstProperties = Object.getOwnPropertyNames(first);
    const secondProperties = Object.getOwnPropertyNames(second);
    /** Check for same number of properties 
    if (firstProperties.length !== secondProperties.length) {
      return false;
    }
    /** Check if the same properties are contained in both objects
    const hasAllKeys = firstProperties.every(
      (value) => !!secondProperties.find((v) => v === value)
    );

    if (!hasAllKeys) {
      return false;
    }
    /** Check if all properties have the same values in both objects 
    for (const key of firstProperties) {
      if (first[key] !== second[key]) {
        return false;
      }
    }

    return true;
  };*/

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    /** Comment in if you use areTheseObjectsEqual() */
    /*const isNotAdded = !persons.find((element) =>
      areTheseObjectsEqual(newPerson, element)
    );*/
    const isNotAdded = !persons.find(
      (element) => newPerson.name === element.name
    );
    if (isNotAdded) {
      setPersons(persons.concat(newPerson));
    } else {
      alert(`${newName} is already added to phonebook!`);
    }
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {};

  return (
    <>
      <h2>Phonebook</h2>
      Filter by name: <input onChange={handleFilterChange} />
      <h2>Add new Contact</h2>
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
      <h2>Numbers</h2>
      {persons.map((person) => (
        <Person key={person.name} name={person.name} number={person.number} />
      ))}
    </>
  );
}

export default App;
