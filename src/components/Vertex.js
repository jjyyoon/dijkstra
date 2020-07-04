import React from "react";

const Vertex = ({ vertex: { label, x, y }, handleMouseDown }) => (
  <g id={label} transform={`translate(${x}, ${y})`} onMouseDown={handleMouseDown}>
    <circle r="5" />
    <text dy={y > 100 ? 15 : -5}>{`${label} (${x.toFixed(2)}, ${y.toFixed(2)})`}</text>
  </g>
);

export default Vertex;
