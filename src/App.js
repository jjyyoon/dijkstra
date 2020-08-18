import React from "react";
import { connect } from "react-redux";
import { generateGraph } from "./redux/actions";
import { getIsGraphCreated } from "./redux/selectors";

import FormContainer from "./components/FormContainer";
import Header from "./components/Header";
import Playground from "./components/Playground";

const App = ({ generateGraph, isGraphCreated }) => {
  if (!isGraphCreated) {
    const { innerWidth, innerHeight } = window;
    generateGraph(9, innerWidth * 0.8, innerHeight * 0.85);

    return (
      <div className="h-screen center-items">
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div className="h-screen flex font-body">
      <FormContainer />
      <div className="w-4/5 h-full relative">
        <Header />
        <Playground />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({ isGraphCreated: getIsGraphCreated(state) });

const mapDispatchToProps = dispatch => ({
  generateGraph: (num, maxX, maxY) => dispatch(generateGraph(num, maxX, maxY))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
