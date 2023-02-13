import axios from "axios";
import "./phonebook.css";

const Phonebook = ({
  persons,
  handleSetPersons,
  filteredPersons,
  deleteErrorCatch,
}) => {
  const deleteData = (id, name) => {
    if (confirm(`Delete ${name} ?`)) {
      axios
        .delete(`http://localhost:3001/persons/${id}`)
        .then(() => {
          handleSetPersons(persons.filter((person) => person.id !== id));
        })
        .catch(() =>
          deleteErrorCatch({
            from: "delete",
            message: `Information of ${name} has already been removed from server`,
          })
        );
    }
  };

  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {filteredPersons.map((personinfo) => {
          return (
            <li
              style={{ listStyle: "none", fontWeight: "bold" }}
              key={personinfo.id}
            >
              {personinfo.name} {personinfo.number}{" "}
              <button
                className="button"
                onClick={() => deleteData(personinfo.id, personinfo.name)}
              >
                Delete
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Phonebook;
