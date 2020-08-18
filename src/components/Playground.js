import React from "react";
import { connect } from "react-redux";
import { updateGraph, resetResult } from "../redux/actions";

import Repeat from "./Repeat";
import Node from "./Node";
import Path from "./Path";
import ShowResult from "./ShowResult";

class Playground extends React.Component {
  constructor(props) {
    super(props);
    const { innerWidth, innerHeight } = window;
    this.state = { width: innerWidth * 0.8, height: innerHeight * 0.85 };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = ({ target: { innerWidth, innerHeight } }) => {
    const { resetResult, updateGraph } = this.props;
    resetResult();

    const { width, height } = this.state;
    updateGraph((innerWidth * 0.8) / width, (innerHeight * 0.85) / height);

    this.setState({ width: innerWidth * 0.8, height: innerHeight * 0.85 });
  };

  render() {
    const { shown } = this.props;
    const { width, height } = this.state;

    return (
      <svg
        id="playground"
        className="absolute bottom-0"
        viewBox={`${-width / 8} ${-height / 8} ${width} ${height}`}
      >
        <Repeat>
          {i => <Repeat key={i}>{j => <Path key={`${i}${j}`} sourceId={i} targetId={j} />}</Repeat>}
        </Repeat>
        <Repeat>{idx => <Node key={idx} idx={idx} width={width} height={height} />}</Repeat>
        {shown && <ShowResult />}
      </svg>
    );
  }
}

const mapStateToProps = ({ result: { shown } }) => ({ shown });

const mapDispatchToProps = dispatch => ({
  updateGraph: (forX, forY) => dispatch(updateGraph(forX, forY)),
  resetResult: () => dispatch(resetResult())
});

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
