import React from "react";
import { connect } from "react-redux";

import AnimatedPath from "./AnimatedPath";

const ShowResult = ({ path, nodes, edges }) => {
  const len = path.length;
  const route = path[0] + path[len - 1];

  return path.map((node, idx) => {
    if (idx === len - 1) {
      return null;
    }

    const sourceIdx = nodes.findIndex(({ label }) => label === node);
    const targetIdx = nodes.findIndex(({ label }) => label === path[idx + 1]);
    const source = nodes[sourceIdx];
    const target = nodes[targetIdx];

    return (
      <AnimatedPath
        key={route + idx}
        no={idx}
        end={`route${len - 2}.end`}
        source={source}
        target={target}
        edge={edges[sourceIdx][targetIdx]}
      />
    );
  });
};

const mapStateToProps = ({ graph: { nodes, edges }, result: { path } }) => ({ nodes, edges, path });

export default connect(mapStateToProps)(ShowResult);
