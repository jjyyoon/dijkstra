import React, { useState } from "react";
import { connect } from "react-redux";
import { updateNode } from "../redux/actions";
import { getNodeLabel } from "../redux/selectors";

import CustomButton from "./CustomButton";

const ChangeLabel = ({ id, label, updateNode }) => {
  const [instruction, setInstruction] = useState("Use less than 12 characters.");

  const handleSubmit = event => {
    event.preventDefault();

    const newLabel = event.target.label.value;

    if (!newLabel) {
      return setInstruction("Please fill out this field.");
    }

    updateNode(id, { label: newLabel });
    setInstruction("Saved.");
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <div className="flex items-center mb-1 border-b-4 border-teal-500 py-1">
        <label className="label pr-4" htmlFor="label">
          Label
        </label>
        <input id="label" placeholder={label} maxLength="12" />
        <CustomButton type="submit" content="Save" outline={false} color="teal" />
      </div>
      <p className="text-xs italic text-red-500">{instruction}</p>
    </form>
  );
};

const mapStateToProps = (state, { id }) => ({ label: getNodeLabel(id)(state) });

const mapDispatchToProps = dispatch => ({
  updateNode: (idx, updateInfo) => dispatch(updateNode(idx, updateInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLabel);
