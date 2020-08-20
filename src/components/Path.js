import React from "react";
import { connect } from "react-redux";
import { getNode, getEdge } from "../redux/selectors";

const Path = ({ sourceId, targetId, source, target, edge, useRealDist }) => {
  if (!edge || source.x > target.x || (source.x === target.x && sourceId > targetId)) {
    return null;
  }

  const id = "path" + sourceId + targetId;

  return (
    <g>
      <path
        id={id}
        d={`M ${source.x},${source.y} L ${target.x},${target.y}`}
        className="stroke-current stroke-2 text-purple-500"
      />
      <text dy="-3">
        <textPath href={"#" + id} startOffset="50%" textAnchor="middle">
          {useRealDist ? edge.toFixed(2) : edge}
        </textPath>
      </text>
    </g>
  );
};

const mapStateToProps = (state, { sourceId, targetId }) => ({
  source: getNode(sourceId)(state),
  target: getNode(targetId)(state),
  edge: getEdge(sourceId, targetId)(state),
  useRealDist: state.graph.useRealDist
});

export default connect(mapStateToProps)(Path);
