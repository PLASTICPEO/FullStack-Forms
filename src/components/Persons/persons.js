const Persons = ({ props }) => {
  return (
    <div>
      <h2>Numbers</h2>
      <ul>
        {props.map((item, index) => {
          return (
            <li key={index} style={{ listStyle: "none", fontWeight: "bold" }}>
              {item.name} {item.number}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Persons;
