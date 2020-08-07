import React from "react";
import { connect } from "react-redux";
import { updateNode, updateEdges, resetResult } from "../redux/actions";
import { getNode } from "../redux/selectors";
import { checkBoundary } from "../helpers";

class Node extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      onDrag: false,
      screenCTM: null
    };
  }

  componentWillUnmount() {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);
  }

  handleMouseDown = () => {
    const { resetResult } = this.props;
    resetResult();

    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("mouseup", this.handleMouseUp);

    const { a, d, e, f } = document.getElementById("playground").getScreenCTM();

    this.setState({ onDrag: true, screenCTM: { a, d, e, f } });
  };

  handleMouseMove = event => {
    event.preventDefault();

    const { onDrag, screenCTM } = this.state;

    if (!onDrag) {
      return;
    }

    const { width, height } = this.props;
    const x = (event.clientX - screenCTM.e) / screenCTM.a;
    const y = (event.clientY - screenCTM.f) / screenCTM.d;

    const point = checkBoundary(x, y, width * 0.75, height * 0.75);

    const { updateNode, idx } = this.props;
    updateNode(idx, point.x, point.y);
  };

  handleMouseUp = () => {
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("mouseup", this.handleMouseUp);

    const { updateEdges, idx } = this.props;
    updateEdges(idx);

    this.setState({ onDrag: false, screenCTM: null });
  };

  render() {
    const {
      idx,
      node: { label, x, y }
    } = this.props;

    return (
      <g id={"node" + idx} transform={`translate(${x}, ${y})`} onMouseDown={this.handleMouseDown}>
        <circle r="5" />
        <text dy={y > 100 ? 15 : -5}>{`${label} (${x.toFixed(2)}, ${y.toFixed(2)})`}</text>
      </g>
    );
  }
}

const mapStateToProps = (state, { idx }) => ({ node: getNode(idx)(state) });

const mapDispatchToProps = dispatch => ({
  updateNode: (idx, x, y) => dispatch(updateNode(idx, x, y)),
  updateEdges: idx => dispatch(updateEdges(idx)),
  resetResult: () => dispatch(resetResult())
});

export default connect(mapStateToProps, mapDispatchToProps)(Node);
