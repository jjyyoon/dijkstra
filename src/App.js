import React from "react";
import { connect } from "react-redux";
import { generateGraph } from "./redux/actions";
import { getIsGraphCreated } from "./redux/selectors";

import FormContainer from "./components/FormContainer";
import Playground from "./components/Playground";

const App = ({ generateGraph, isGraphCreated }) => {
  if (!isGraphCreated) {
    const { innerWidth, innerHeight } = window;
    generateGraph(9, innerWidth * 0.8, innerHeight);

    return null;
  }

  return (
    <div className="h-screen flex font-body">
      <FormContainer />
      <Playground />
    </div>
  );
};

const mapStateToProps = state => ({ isGraphCreated: getIsGraphCreated(state) });

const mapDispatchToProps = dispatch => ({
  generateGraph: (num, maxX, maxY) => dispatch(generateGraph(num, maxX, maxY))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
