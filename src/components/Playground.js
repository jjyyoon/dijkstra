import React from "react";
import { checkBoundary } from "../helpers";

import Vertex from "./Vertex";
import Line from "./Line";

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
    const { setAllPoints } = this.props;
    const { width, height } = this.state.viewBox;

    setAllPoints((innerWidth * 0.8) / width, innerHeight / height);
    this.setState({ viewBox: { width: innerWidth * 0.8, height: innerHeight } });
  };

  handleMouseDown = ({ target: { parentNode } }) => {
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);

    const { vertices } = this.props;
    const onDrag = vertices.findIndex(vertex => vertex.label === parentNode.id);

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

    const { setPoint } = this.props;
    setPoint(onDrag, point.x, point.y);
  };

  handleMouseUp = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);

    const { setGraph } = this.props;
    const { onDrag } = this.state;
    setGraph(onDrag);

    this.setState({ onDrag: null, screenCTM: null });
  };

  render() {
    const { vertices, graph } = this.props;
    const { width, height } = this.state.viewBox;

    return (
      <div className="w-4/5 h-full overflow-auto">
        <svg viewBox={`${-width / 8} ${-height / 8} ${width} ${height}`}>
          {graph.map((source, i) =>
            source.map((target, j) => {
              if (!target || i > j) {
                return null;
              }

              return <Line key={i + j} source={vertices[i]} target={vertices[j]} />;
            })
          )}
          {vertices.map((vertex, idx) => (
            <Vertex key={idx} vertex={vertex} handleMouseDown={this.handleMouseDown} />
          ))}
        </svg>
      </div>
    );
  }
}

export default Playground;
