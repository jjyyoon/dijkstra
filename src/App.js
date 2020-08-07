import React from "react";
import { connect } from "react-redux";
import { generateGraph } from "./redux/actions";
import { getIsGraphCreated, getIsResultSet } from "./redux/selectors";

import FormContainer from "./components/FormContainer";
import ResultContainer from "./components/ResultContainer";
import Playground from "./components/Playground";

const App = ({ generateGraph, isGraphCreated, isResultSet }) => {
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
        {isResultSet && <ResultContainer />}
        <Playground />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isGraphCreated: getIsGraphCreated(state),
  isResultSet: getIsResultSet(state)
});

const mapDispatchToProps = dispatch => ({
  generateGraph: (num, maxX, maxY) => dispatch(generateGraph(num, maxX, maxY))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
