import React from "react";
import { connect } from "react-redux";
import { toggleAnimationShown } from "../redux/actions";
import { getPathStr } from "../redux/selectors";

import CustomButton from "./CustomButton";
import { ReactComponent as ExclamationOutline } from "../assets/exclamation-outline.svg";

const ResultContainer = ({ useRealDist, pathStr, dist, shown, toggleAnimationShown }) => {
  if (!dist) {
    return (
      <h2 className="mt-2 pt-2 border-t border-gray-300">
        <ExclamationOutline className="w-6 h-6 inline-block" />
        {`There is no path ${pathStr}.`}
      </h2>
    );
  }

  return (
    <div className="mt-2 py-2 border-t border-b border-gray-300 box-with-btn">
      <div>
        <h2>
          The shortest path is {pathStr} and its total distance is{" "}
          {useRealDist ? dist.toFixed(2) : dist}.
        </h2>
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
    result: { dist, shown }
  } = state;

  return { useRealDist, pathStr: getPathStr(state), dist, shown };
};

const mapDispatchToProps = dispatch => ({
  toggleAnimationShown: () => dispatch(toggleAnimationShown())
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);
