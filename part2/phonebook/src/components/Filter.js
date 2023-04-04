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

export default Filter;
