import React from "react";
import { connect } from "react-redux";

import AnimatedPath from "./AnimatedPath";

const ShowResult = ({ result, vertices, graph }) => {
  const len = result.length;
  const route = result[0] + result[len - 1];

  return result.map((node, idx) => {
    if (idx === len - 1) {
      return null;
    }

    const sourceIdx = vertices.findIndex(vertex => vertex.label === node);
    const targetIdx = vertices.findIndex(vertex => vertex.label === result[idx + 1]);
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

const mapStateToProps = ({ graph: { nodes, edges }, result }) => ({
  vertices: nodes,
  graph: edges,
  result
});

export default connect(mapStateToProps)(ShowResult);
