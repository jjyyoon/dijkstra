import React, { useState } from "react";
import { connect } from "react-redux";
import { updateNode } from "../redux/actions";
import { getNodeLabels } from "../redux/selectors";

import CustomButton from "./CustomButton";

const ChangeLabel = ({ id, labels, updateNode }) => {
  const [message, setMessage] = useState("Use less than 12 characters.");

  const handleSubmit = event => {
    event.preventDefault();

    const newLabel = event.target.label.value;

    if (!newLabel) {
      return setMessage("Please fill out this field.");
    }

    if (labels.findIndex(label => label.toLowerCase() === newLabel.toLowerCase()) >= 0) {
      return setMessage("That label is already taken, please try another.");
    }

    updateNode(id, { label: newLabel });
    setMessage("Saved.");
  };

  return (
    <form className="mb-3" onSubmit={handleSubmit}>
      <div className="flex items-center mb-1 border-b-4 border-teal-500 py-1">
        <label className="label pr-4" htmlFor="label">
          Label
        </label>
        <input id="label" placeholder={labels[id]} maxLength="12" />
        <CustomButton type="submit" content="Save" outline={false} color="teal" />
      </div>
      <p className="text-xs italic text-red-500">{message}</p>
    </form>
  );
};

const mapStateToProps = state => ({ labels: getNodeLabels(state) });

const mapDispatchToProps = dispatch => ({
  updateNode: (idx, updateInfo) => dispatch(updateNode(idx, updateInfo))
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangeLabel);
