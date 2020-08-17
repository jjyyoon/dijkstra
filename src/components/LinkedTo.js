import React from "react";
import { connect } from "react-redux";
import { updateEdge } from "../redux/actions";
import { getNodeLabel, getEdge } from "../redux/selectors";

const LinkedTo = ({ source, target, useRealDist, label, edge, updateEdge }) => {
  const handleChange = ({ target: { type, checked, value } }) => {
    if (type === "checkbox") {
      return updateEdge(source, target, +checked);
    }

    return updateEdge(source, target, +value);
  };

  return (
    <div className="flex flex-wrap mb-1 text-sm">
      <div className="w-7/12">
        <input
          type="checkbox"
          checked={edge ? true : false}
          onChange={handleChange}
          disabled={source === target ? true : false}
        />
        <label>{label}</label>
      </div>
      <div className="w-5/12">
        <label>{"Cost: "}</label>
        <input
          className="outline-none"
          type="number"
          min="1"
          max="20"
          value={Math.round(edge)}
          onChange={handleChange}
          disabled={useRealDist || !edge ? true : false}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state, { source, target }) => ({
  useRealDist: state.graph.useRealDist,
  label: getNodeLabel(target)(state),
  edge: getEdge(source, target)(state)
});

const mapDispatchToProps = dispatch => ({
  updateEdge: (source, target, edge) => dispatch(updateEdge(source, target, edge))
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkedTo);
