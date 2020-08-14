import React, { useState } from "react";
import { connect } from "react-redux";
import { setResult, resetResult } from "../redux/actions";

import FormSelect from "./FormSelect";
import CustomButton from "./CustomButton";
import { ReactComponent as ExclamationOutline } from "../assets/exclamation-outline.svg";

const SelectNodes = ({ setResult, resetResult }) => {
  const [error, setError] = useState(false);

  const handleSubmit = event => {
    event.preventDefault();

    let { source, target } = event.target;

    source = { id: source.selectedIndex, label: source.value };
    target = { id: target.selectedIndex, label: target.value };

    if (source.id === target.id) {
      if (!error) {
        setError(true);
        resetResult();
      }

      return;
    }

    if (error) {
      setError(false);
    }

    setResult(source, target);
  };

  return (
    <form className="bg-white shadow-md rounded mt-10 px-8 pt-6 pb-8" onSubmit={handleSubmit}>
      <FormSelect label="source" />
      <FormSelect label="target" />
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

const mapDispatchToProps = dispatch => ({
  setResult: (source, target) => dispatch(setResult(source, target)),
  resetResult: () => dispatch(resetResult())
});

export default connect(null, mapDispatchToProps)(SelectNodes);
