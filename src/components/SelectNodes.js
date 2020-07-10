import React, { useState } from "react";
import { findTheShortestPath } from "../helpers";

import FormSelect from "./FormSelect";
import CustomButton from "./CustomButton";
import { ReactComponent as ExclamationOutline } from "../assets/exclamation-outline.svg";

const SelectNodes = ({ graph, vertices, result, setResult }) => {
  const [error, setError] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    const source = event.target.source.value;
    const target = event.target.target.value;

    if (source === target) {
      setError(true);
      return;
    }

    if (error) {
      setError(false);
    }

    const newResult = findTheShortestPath(graph, source, target);

    if (!result) {
      setResult(newResult[target].path);
      return;
    }

    setResult(null, () => setResult(newResult[target].path));
  };

  return (
    <form className="bg-white shadow-md rounded mt-10 px-8 pt-6 pb-8" onSubmit={handleSubmit}>
      <FormSelect label="source" options={vertices} />
      <FormSelect label="target" options={vertices} />
      {error && (
        <p className="mb-6 text-red-500 text-sm italic">
          <ExclamationOutline className="fill-current h-4 w-4 inline-block" />
          {` Source can't be the same as target, please select another source or target.`}
        </p>
      )}
      <CustomButton content="Find" />
    </form>
  );
};

export default SelectNodes;
