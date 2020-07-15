import React from "react";
import { connect } from "react-redux";
import { getIsResultFound } from "../redux/selectors";

const Vertex = ({ idx, vertex: { label, x, y }, isResultFound, handleMouseDown }) => (
  <g
    id={"node" + idx}
    transform={`translate(${x}, ${y})`}
    onMouseDown={isResultFound ? null : handleMouseDown}
  >
    <circle r="5" />
    <text dy={y > 100 ? 15 : -5}>{`${label} (${x.toFixed(2)}, ${y.toFixed(2)})`}</text>
  </g>
);

const mapStateToProps = ({ graph: { nodes }, result }, { idx }) => ({
  vertex: nodes[idx],
  isResultFound: getIsResultFound(result)
});

export default connect(mapStateToProps)(Vertex);
