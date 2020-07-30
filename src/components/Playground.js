import React from "react";
import { connect } from "react-redux";
import { updateGraph, resetResult } from "../redux/actions";
import { getNodesCount } from "../redux/selectors";

import Node from "./Node";
import Path from "./Path";
import ShowResult from "./ShowResult";

class Playground extends React.Component {
  constructor(props) {
    super(props);
    const { innerWidth, innerHeight } = window;
    this.state = { width: innerWidth * 0.8, height: innerHeight * 0.9 };
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
    updateGraph((innerWidth * 0.8) / width, (innerHeight * 0.9) / height);

    this.setState({ width: innerWidth * 0.8, height: innerHeight * 0.9 });
  };

  render() {
    const { edges, nodeCount, shown } = this.props;
    const { width, height } = this.state;
    const keys = [...Array(nodeCount).keys()];

    return (
      <svg
        id="playground"
        className="absolute bottom-0"
        viewBox={`${-width / 8} ${-height / 8} ${width} ${height}`}
      >
        {edges.map((source, i) =>
          source.map((target, j) => {
            if (!target || i > j) {
              return null;
            }

            return <Path key={`${i}${j}`} id={`path${i}${j}`} from={i} to={j} />;
          })
        )}
        {shown && <ShowResult />}
        {keys.map(key => (
          <Node key={key} idx={key} width={width} height={height} />
        ))}
      </svg>
    );
  }
}

const mapStateToProps = ({ graph: { nodes, edges }, result: { shown } }) => ({
  edges,
  nodeCount: getNodesCount(nodes),
  shown
});

const mapDispatchToProps = dispatch => ({
  updateGraph: (forX, forY) => dispatch(updateGraph(forX, forY)),
  resetResult: () => dispatch(resetResult())
});

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
