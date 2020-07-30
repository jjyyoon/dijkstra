import React from "react";
import { connect } from "react-redux";
import { generateGraph } from "./redux/actions";
import { getIsGraphCreated, getIsPathFound } from "./redux/selectors";

import FormContainer from "./components/FormContainer";
import ResultContainer from "./components/ResultContainer";
import Playground from "./components/Playground";

const App = ({ generateGraph, isGraphCreated, isPathFound }) => {
  if (!isGraphCreated) {
    const { innerWidth, innerHeight } = window;
    generateGraph(9, innerWidth * 0.8, innerHeight * 0.9);

    return (
      <div className="h-screen centre-items">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="h-screen flex font-body">
      <FormContainer />
      <div className="w-4/5 h-full relative">
        {isPathFound && <ResultContainer />}
        <Playground />
      </div>
    </div>
  );
};

const mapStateToProps = ({ graph: { edges }, result: { path } }) => ({
  isGraphCreated: getIsGraphCreated(edges),
  isPathFound: getIsPathFound(path)
});

const mapDispatchToProps = dispatch => ({
  generateGraph: (num, maxX, maxY) => dispatch(generateGraph(num, maxX, maxY))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
