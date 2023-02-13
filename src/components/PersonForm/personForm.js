import { useState, useEffect } from "react";
import "./personform.css";
import axios from "axios";
import Phonebook from "../Persons/phonebook";
import Filter from "../Filter/filter";
import Notification from "../notification/notification";

const PersonForm = () => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [renderDataGet, setRenderGET] = useState(false);
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState({ from: null });

  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
  }, [renderDataGet]);

  const handleChangePersons = (persons) => {
    setPersons(persons);
  };

  const handleFilterChange = (filter) => {
    setFilter(filter);
  };

  const deleteError = (error) => {
    setErrorMessage(error);
    setTimeout(() => {
      setErrorMessage({ from: null });
    }, 3000);
  };

  const submitperson = () => {
    const noteObject = {
      name: newName,
      number: newNumber,
    };

    const similarPerson = persons.find(
      (personNames) => personNames.name === newName
    );

    similarPerson &&
    confirm(
      `${similarPerson.name} is already added to phonebook, replace the old number with a new one ? `
    )
      ? axios
          .put(`http://localhost:3001/persons/${similarPerson.id}`, noteObject)
          .then(() => {
            setRenderGET(!renderDataGet);
            setErrorMessage({
              from: "put",
              message: `Replace ${newName} ${newNumber}`,
            });
            setTimeout(() => {
              setErrorMessage({ from: null });
            }, 3000);
          })
      : axios.post("http://localhost:3001/persons", noteObject).then(() => {
          setRenderGET(!renderDataGet);
          setErrorMessage({
            from: "put",
            message: `Add ${newName} ${newNumber}`,
          });
          setTimeout(() => {
            setErrorMessage({ from: null });
          }, 3000);
        });

    setNewName("");
    setNewNumber("");
  };

  const formManagement = (e) => {
    e.preventDefault();
  };

  const filteredPersons = persons.filter((names) =>
    names.name.includes(filter)
  );
  return (
    <div>
      <h1>PhoneBook</h1>
      <Notification message={errorMessage} />
      <Filter person={persons} handleFilterChange={handleFilterChange} />
      <h2>Add a new</h2>
      <form onClick={(e) => formManagement(e)}>
        <div>
          Name:
          <input
            placeholder={"name..."}
            onChange={(e) => {
              setNewName(e.target.value);
            }}
            value={newName}
          />
        </div>
        <div>
          Number:
          <input
            placeholder={"number..."}
            onChange={(e) => setNewNumber(e.target.value)}
            value={newNumber}
          />
          <div>
            <button className="button" onClick={submitperson}>
              Add
            </button>
          </div>
        </div>
      </form>
      <Phonebook
        persons={persons}
        filteredPersons={filteredPersons}
        handleSetPersons={handleChangePersons}
        deleteErrorCatch={deleteError}
      />
    </div>
  );
};

export default PersonForm;
