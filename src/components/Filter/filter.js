const Filter = ({ handleFilterChange }) => {
  return (
    <div>
      <h2>Filter show this</h2>
      <input onChange={(e) => handleFilterChange(e.target.value)} />
    </div>
  );
};

export default Filter;
