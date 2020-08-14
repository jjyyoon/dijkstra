import React, { useState } from "react";

const LinkedTo = ({ edge, label }) => {
  const [linked, setLinked] = useState(!edge ? false : true);
  const [cost, setCost] = useState(edge);

  const handleChange = ({ target: { type, value } }) => {
    if (type === "checkbox") {
      return setLinked(!linked);
    }

    return setCost(value);
  };

  return (
    <div className="flex flex-wrap mb-1 text-sm">
      <div className="w-7/12">
        <input type="checkbox" checked={linked} onChange={handleChange} />
        <label>{label}</label>
      </div>
      <div className="w-5/12">
        <label>{"Cost: "}</label>
        <input
          className="outline-none"
          type="number"
          min="1"
          max="20"
          value={cost}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

export default LinkedTo;
