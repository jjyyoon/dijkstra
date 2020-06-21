import React from "react";

const Line = ({ source, target }) => (
  <line x1={source.x} y1={source.y} x2={target.x} y2={target.y} />
);

export default Line;
