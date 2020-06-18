import React from "react";

const Vertex = ({ vertex: { label, x, y } }) => (
  <g transform={`translate(${x}, ${y})`}>
    <circle r="5" />
    <text dy={y > 100 ? 15 : -5}>{label}</text>
  </g>
);

export default Vertex;
