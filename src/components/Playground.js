import React from "react";
import { connect } from "react-redux";
import { updateGraph } from "../redux/actions";
import { getNodesCount, getIsResultFound } from "../redux/selectors";

import Vertex from "./Vertex";
import Path from "./Path";
import ShowResult from "./ShowResult";

class Playground extends React.Component {
  constructor(props) {
    super(props);
    const { innerWidth, innerHeight } = window;
    this.state = { width: innerWidth * 0.8, height: innerHeight };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = ({ target: { innerWidth, innerHeight } }) => {
    const { updateGraph } = this.props;
    const { width, height } = this.state;

    updateGraph((innerWidth * 0.8) / width, innerHeight / height);

    this.setState({ width: innerWidth * 0.8, height: innerHeight });
  };

  render() {
    const { graph, nodeCount, isResultFound } = this.props;
    const { width, height } = this.state;
    const keys = [...Array(nodeCount).keys()];

    return (
      <svg
        id="playground"
        className="w-4/5 h-full"
        viewBox={`${-width / 8} ${-height / 8} ${width} ${height}`}
      >
        {graph.map((source, i) =>
          source.map((target, j) => {
            if (!target || i > j) {
              return null;
            }

            return <Path key={`${i}${j}`} id={`path${i}${j}`} from={i} to={j} />;
          })
        )}
        {isResultFound && <ShowResult />}
        {keys.map(key => (
          <Vertex key={key} idx={key} width={width} height={height} />
        ))}
      </svg>
    );
  }
}

const mapStateToProps = ({ graph: { nodes, edges }, result }) => ({
  graph: edges,
  nodeCount: getNodesCount(nodes),
  isResultFound: getIsResultFound(result)
});

const mapDispatchToProps = dispatch => ({
  updateGraph: (forX, forY) => dispatch(updateGraph(forX, forY))
});

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
