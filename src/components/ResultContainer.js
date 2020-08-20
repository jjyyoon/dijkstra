import React from "react";
import { connect } from "react-redux";
import { toggleAnimationShown } from "../redux/actions";
import { getPathInLabel } from "../redux/selectors";

import CustomButton from "./CustomButton";
import { ReactComponent as ExclamationOutline } from "../assets/exclamation-outline.svg";

const ResultContainer = ({ useRealDist, source, target, path, shown, toggleAnimationShown }) => {
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
          *The result will reset if you change node settings
          {useRealDist ? ", resize the browser window or move the position of the nodes." : "."}
        </p>
      </div>
      <CustomButton
        content={`${shown ? "Stop" : "Restart"} Animation`}
        outline={true}
        color="green"
        handleClick={toggleAnimationShown}
      />
    </div>
  );
};

const mapStateToProps = state => {
  const {
    graph: { useRealDist },
    result: { source, target, shown }
  } = state;

  return { useRealDist, source, target, path: getPathInLabel(state), shown };
};

const mapDispatchToProps = dispatch => ({
  toggleAnimationShown: () => dispatch(toggleAnimationShown())
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);
