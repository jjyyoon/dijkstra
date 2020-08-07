import React from "react";
import { connect } from "react-redux";
import { toggleResultShown } from "../redux/actions";
import { getPathInLabel } from "../redux/selectors";

const ResultContainer = ({ source, target, path, shown, toggleResultShown }) => {
  if (!path) {
    return (
      <div className="h-1/10 p-4">
        <h2>{`There is no path from ${source} to ${target}.`}</h2>
      </div>
    );
  }

  return (
    <div className="h-1/10 p-4">
      <div className="inline-block">
        <h2>{`The shortest path is ${path}.`}</h2>
        <p className="text-sm italic">
          *The result would be reset if you resize the browser window or change the position of a
          node.
        </p>
      </div>
      <button
        className="float-right hover:bg-green-600 text-green-700 hover:text-white border border-green-500"
        onClick={toggleResultShown}
      >
        {shown ? "Stop" : "Restart"} Animation
      </button>
    </div>
  );
};

const mapStateToProps = state => {
  const { source, target, shown } = state.result;

  return { source, target, path: getPathInLabel(state), shown };
};

const mapDispatchToProps = dispatch => ({
  toggleResultShown: () => dispatch(toggleResultShown())
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);
