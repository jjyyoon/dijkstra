import React from "react";
import { connect } from "react-redux";
import { getNode, getEdge } from "../redux/selectors";

const Path = ({ id, source, target, edge }) => {
  if (!edge || source.x > target.x) {
    return null;
  }

  return (
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
};

const mapStateToProps = (state, { sourceId, targetId }) => ({
  id: "path" + sourceId + targetId,
  source: getNode(sourceId)(state),
  target: getNode(targetId)(state),
  edge: getEdge(sourceId, targetId)(state)
});

export default connect(mapStateToProps)(Path);
