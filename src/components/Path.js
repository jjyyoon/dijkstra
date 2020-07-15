import React from "react";
import { connect } from "react-redux";

const Path = ({ id, source, target, edge }) => (
  <g>
    <path
      id={id}
      d={`M ${source.x},${source.y} L ${target.x},${target.y}`}
      className="stroke-current stroke-2 text-purple-500"
    />
    <text>
      <textPath href={"#" + id} startOffset="50%" textAnchor="middle">
        {edge.toFixed(2)}
      </textPath>
    </text>
  </g>
);

const mapStateToProps = ({ graph: { nodes, edges } }, { from, to }) => ({
  source: nodes[from],
  target: nodes[to],
  edge: edges[from][to]
});

export default connect(mapStateToProps)(Path);
