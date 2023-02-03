import { useState } from "react";

const Filter = ({ personBook }) => {
  const [filter, setFilter] = useState();

  return (
    <div>
      <input onChange={(e) => setFilter(e.target.value)} />
    </div>
  );
};

export default Filter;
