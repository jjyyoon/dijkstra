import React from "react";
import { connect } from "react-redux";
import { toggleResultShown } from "../redux/actions";
import { getPathInLabel } from "../redux/selectors";

import CustomButton from "./CustomButton";
import { ReactComponent as ExclamationOutline } from "../assets/exclamation-outline.svg";

const ResultContainer = ({ source, target, path, shown, toggleResultShown }) => {
  if (!path) {
    return (
      <h2 className="mt-2 pt-2 border-t border-gray-300">
        <ExclamationOutline className="w-6 h-6 inline-block" />
        {`There is no path from ${source} to ${target}.`}
      </h2>
    );
  }

  return (
    <div className="mt-2 pt-2 border-t border-gray-300 box-with-btn">
      <div>
        <h2>{`The shortest path is ${path}.`}</h2>
        <p className="text-sm italic">
          *The result would be reset if you resize the browser window or change the position of a
          node.
        </p>
      </div>
      <CustomButton
        content={`${shown ? "Stop" : "Restart"} Animation`}
        outline={true}
        color="green"
        handleClick={toggleResultShown}
      />
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
