import personService from "../services/persons";

const AddContactForm = ({
  persons,
  setPersons,
  newNumber,
  setNewNumber,
  newName,
  setNewName,
  setStatusMessage,
  setMessageType,
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
      personService.create(newPerson).then((returnedPerson) => {
        setPersons(persons.concat(returnedPerson));
        setStatusMessage(`Added ${newPerson.name} to contacts`);
        setMessageType("success");
        setTimeout(() => {
          setStatusMessage(null);
          setMessageType(null);
        }, 5000);
      });
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
          .then((returnedPerson) => {
            setPersons(
              persons.map((p) => (p.id !== tempID ? p : returnedPerson))
            );
            setStatusMessage(
              `Updated contact information of ${updatedPerson.name}`
            );
            setMessageType("success");
            setTimeout(() => {
              setStatusMessage(null);
              setMessageType(null);
            }, 5000);
          })
          .catch((error) => {
            setStatusMessage(
              `Information of ${updatedPerson.name} has already been removed from server!`
            );
            setMessageType("error");
            setTimeout(() => {
              setStatusMessage(null);
              setMessageType(null);
            }, 5000);
            setPersons(persons.filter((person) => person.id !== tempID));
          });
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

export default AddContactForm;
