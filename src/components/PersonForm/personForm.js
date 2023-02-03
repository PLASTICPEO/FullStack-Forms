import { useState, useEffect } from "react";
// import Filter from "../Filter/filter";
import Persons from "../Persons/persons";

const PersonForm = () => {
  const [alertToggle, setAlertToggle] = useState(false);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const [persons, setPersons] = useState([]);

  const [filter, setFilter] = useState();

  useEffect(() => {
    const result = persons.filter((filterName) => filterName.name === filter);
    console.log(persons);

    if (result.length > 0) {
      setPersons([result[0]]);
    }
  }, [filter]);

  useEffect(() => {
    persons.map((item) => {
      item.name === newName ? setAlertToggle(!alertToggle) : "";
    });
  }, [newName]);

  const submitName = () => {
    if (alertToggle) {
      setAlertToggle(!alertToggle);
      alert(`${newName} is already added to phonebook`);
    } else if (newName && newNumber) {
      const noteObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      setPersons(persons.concat(noteObject));
    }

    setNewName("");
    setNewNumber("");
  };

  return (
    <div>
      <div>
        <h2>Phonebook</h2>
      </div>
      {/* Filter component */}
      <div>
        <input onChange={(e) => setFilter(e.target.value)} />
      </div>
      <h2>Add New</h2>
      <div>
        name:{" "}
        <input onChange={(e) => setNewName(e.target.value)} value={newName} />
      </div>
      <div>
        number:{" "}
        <input
          onChange={(e) => setNewNumber(e.target.value)}
          value={newNumber}
          type={"tel"}
          placeholder={"123-456-678"}
        />
      </div>
      <button type="submit" onClick={submitName}>
        add
      </button>
      <Persons props={persons} />
    </div>
  );
};

export default PersonForm;
