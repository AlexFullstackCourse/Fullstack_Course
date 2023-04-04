import { useState, useEffect } from "react";
import personService from "./services/persons";
import Contacts from "./components/Contacts";
import Filter from "./components/Filter";
import AddContactForm from "./components/AddContactForm";

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
        setFilteredPersons={setFilteredPersons}
      />
    </>
  );
};

export default App;
