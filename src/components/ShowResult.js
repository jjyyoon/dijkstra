import React from "react";
import { connect } from "react-redux";

import AnimatedPath from "./AnimatedPath";

const ShowResult = ({ path, vertices, graph }) => {
  const len = path.length;
  const route = path[0] + path[len - 1];

  return path.map((node, idx) => {
    if (idx === len - 1) {
      return null;
    }

    const sourceIdx = vertices.findIndex(vertex => vertex.label === node);
    const targetIdx = vertices.findIndex(vertex => vertex.label === path[idx + 1]);
    const source = vertices[sourceIdx];
    const target = vertices[targetIdx];

    return (
      <AnimatedPath
        key={route + idx}
        no={idx}
        end={`route${len - 2}.end`}
        source={source}
        target={target}
        edge={graph[sourceIdx][targetIdx]}
      />
    );
  });
};

const mapStateToProps = ({ graph: { nodes, edges }, result: { path } }) => ({
  vertices: nodes,
  graph: edges,
  path
});

export default connect(mapStateToProps)(ShowResult);
