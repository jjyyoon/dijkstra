import React from "react";
import { connect } from "react-redux";
import { toggleResultShown } from "../redux/actions";

const ResultContainer = ({ path, shown, toggleResultShown }) => (
  <div className="h-1/10 p-4">
    <div className="inline-block">
      <h2>The Shortest Path is {path.join("-")}</h2>
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

const mapStateToProps = ({ result: { path, shown } }) => ({ path, shown });

const mapDispatchToProps = dispatch => ({
  toggleResultShown: () => dispatch(toggleResultShown())
});

export default connect(mapStateToProps, mapDispatchToProps)(ResultContainer);
