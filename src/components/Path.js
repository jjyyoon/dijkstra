import React from "react";
import { connect } from "react-redux";
import { getPathInfo } from "../redux/selectors";

const Path = ({ id, pathInfo: { source, target, edge } }) => (
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

const mapStateToProps = (state, { sourceId, targetId }) => ({
  pathInfo: getPathInfo(sourceId, targetId)(state)
});

export default connect(mapStateToProps)(Path);
