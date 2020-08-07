import React from "react";
import { connect } from "react-redux";

import AnimatedPath from "./AnimatedPath";

const ShowResult = ({ route, path, nodes, edges }) => {
  const len = path.length;

  return path.map((sourceId, idx) => {
    if (idx === len - 1) {
      return null;
    }

    const targetId = path[idx + 1];

    return (
      <AnimatedPath
        key={route + idx}
        no={idx}
        end={`route${len - 2}.end`}
        source={nodes[sourceId]}
        target={nodes[targetId]}
        edge={edges[sourceId][targetId]}
      />
    );
  });
};

const mapStateToProps = ({ graph: { nodes, edges }, result: { source, target, path } }) => ({
  nodes,
  edges,
  route: source + target,
  path
});

export default connect(mapStateToProps)(ShowResult);
