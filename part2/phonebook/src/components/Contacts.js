import personService from "../services/persons";

const Contacts = ({
  filter,
  persons,
  filteredPersons,
  setPersons,
  setFilteredPersons,
}) => {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete ${name} from Contacts?`)) {
      personService.remove(id);
      setPersons(persons.filter((person) => person.id !== id));
      if (filter !== "") {
        setFilteredPersons(
          filteredPersons.filter((person) => person.id !== id)
        );
      }
    }
  };

  if (filter === "") {
    return persons.map((person) => (
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id, person.name)}>
          Delete
        </button>
        <br />
      </div>
    ));
  } else {
    return filteredPersons.map((person) => (
      <div key={person.name}>
        {person.name} {person.number}
        <button onClick={() => handleDelete(person.id, person.name)}>
          Delete
        </button>
        <br />
      </div>
    ));
  }
};

export default Contacts;
