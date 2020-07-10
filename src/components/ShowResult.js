import React from "react";
import AnimatedPath from "./AnimatedPath";

const ShowResult = ({ result, vertices, graph }) => {
  const len = result.length;

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
        key={idx}
        no={idx}
        end={`route${len - 2}.end`}
        source={source}
        target={target}
        edge={graph[sourceIdx][targetIdx]}
      />
    );
  });
};

export default ShowResult;
