import React from "react";
import { connect } from "react-redux";
import { updateGraph, resetResult, stopAnimation } from "../redux/actions";

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
    const { useRealDist, resetResult, stopAnimation, updateGraph } = this.props;

    if (useRealDist) {
      resetResult();
    } else {
      stopAnimation();
    }

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
        <foreignObject className="w-full h-16 p-4" x={-width / 8} y={-height / 8}>
          <p>
            • Drag and drop the nodes<span className="text-gray-600">(points)</span> anywhere you
            want.
          </p>
          <p>
            • Click the Change Node Settings button at the top right of the page and select a node
            to be changed.
          </p>
        </foreignObject>
        <Repeat>
          {i => <Repeat key={i}>{j => <Path key={`${i}${j}`} sourceId={i} targetId={j} />}</Repeat>}
        </Repeat>
        {shown && <ShowResult />}
        <Repeat>{idx => <Node key={idx} idx={idx} width={width} height={height} />}</Repeat>
      </svg>
    );
  }
}

const mapStateToProps = ({ graph: { useRealDist }, result: { shown } }) => ({ useRealDist, shown });

const mapDispatchToProps = dispatch => ({
  updateGraph: (forX, forY) => dispatch(updateGraph(forX, forY)),
  resetResult: () => dispatch(resetResult()),
  stopAnimation: () => dispatch(stopAnimation())
});

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
