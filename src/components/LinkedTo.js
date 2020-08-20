import React from "react";
import { connect } from "react-redux";
import { updateEdge, resetResult } from "../redux/actions";
import { getNodeLabel, getEdge } from "../redux/selectors";

const LinkedTo = ({ source, target, useRealDist, label, edge, updateEdge, resetResult }) => {
  const handleChange = ({ target: { type, checked, value } }) => {
    let cost;

    if (type === "checkbox") {
      cost = +checked;
    } else {
      cost = +value <= 20 ? +value : 20;
    }

    updateEdge(source, target, cost);
    resetResult();
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
  updateEdge: (source, target, edge) => dispatch(updateEdge(source, target, edge)),
  resetResult: () => dispatch(resetResult())
});

export default connect(mapStateToProps, mapDispatchToProps)(LinkedTo);
