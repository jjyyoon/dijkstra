import React from "react";
import { connect } from "react-redux";
import { updateNode, updateEdges, updateGraph } from "../redux/actions";
import { getIsResultFound } from "../redux/selectors";
import { checkBoundary } from "../helpers";

import Vertex from "./Vertex";
import Line from "./Line";
import ShowResult from "./ShowResult";

class Playground extends React.Component {
  constructor(props) {
    super(props);

    const { innerWidth, innerHeight } = window;

    this.state = {
      onDrag: null,
      screenCTM: null,
      viewBox: { width: innerWidth * 0.8, height: innerHeight }
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleResize = ({ target: { innerWidth, innerHeight } }) => {
    const { updateGraph } = this.props;
    const { width, height } = this.state.viewBox;

    updateGraph((innerWidth * 0.8) / width, innerHeight / height);

    this.setState({ viewBox: { width: innerWidth * 0.8, height: innerHeight } });
  };

  handleMouseDown = ({ target: { parentNode } }) => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);

    const onDrag = parentNode.id.replace("node", "");

    const { a, d, e, f } = parentNode.parentNode.getScreenCTM();

    this.setState({ onDrag, screenCTM: { a, d, e, f } });
  };

  handleMouseMove = event => {
    event.preventDefault();

    const { onDrag, screenCTM, viewBox } = this.state;

    if (onDrag === null) {
      return;
    }

    const { width, height } = viewBox;
    const x = (event.clientX - screenCTM.e) / screenCTM.a;
    const y = (event.clientY - screenCTM.f) / screenCTM.d;

    const point = checkBoundary(x, y, width * 0.75, height * 0.75);

    const { updateNode } = this.props;
    updateNode(onDrag, point.x, point.y);
  };

  handleMouseUp = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);

    const { updateEdges } = this.props;
    const { onDrag } = this.state;
    updateEdges(onDrag);

    this.setState({ onDrag: null, screenCTM: null });
  };

  render() {
    const { vertices, graph, isResultFound } = this.props;
    const { width, height } = this.state.viewBox;

    return (
      <svg className="w-4/5 h-full" viewBox={`${-width / 8} ${-height / 8} ${width} ${height}`}>
        {graph.map((source, i) =>
          source.map((target, j) => {
            if (!target || i > j) {
              return null;
            }

            return <Line key={`${i}${j}`} source={vertices[i]} target={vertices[j]} />;
          })
        )}
        {isResultFound && <ShowResult />}
        {vertices.map((vertex, idx) => (
          <Vertex key={idx} idx={idx} handleMouseDown={this.handleMouseDown} />
        ))}
      </svg>
    );
  }
}

const mapStateToProps = ({ graph: { nodes, edges }, result }) => ({
  vertices: nodes,
  graph: edges,
  isResultFound: getIsResultFound(result)
});

const mapDispatchToProps = dispatch => ({
  updateNode: (idx, x, y) => dispatch(updateNode(idx, x, y)),
  updateEdges: idx => dispatch(updateEdges(idx)),
  updateGraph: (forX, forY) => dispatch(updateGraph(forX, forY))
});

export default connect(mapStateToProps, mapDispatchToProps)(Playground);
