import React, { useRef, useEffect } from "react";
import { connect } from "react-redux";
import { getNode, getEdge } from "../redux/selectors";

const AnimatedPath = ({ no, end, source, target, dashoffset }) => {
  const drawing = useRef(null);

  useEffect(() => {
    if (!no) {
      drawing.current.beginElement();
    }
  }, [no]);

  return (
    <path
      d={`M ${source.x},${source.y} L ${target.x},${target.y}`}
      className="stroke-current stroke-5 text-red-600"
      strokeDasharray={dashoffset}
      strokeDashoffset={dashoffset}
    >
      <animate
        id={"route" + no}
        attributeName="stroke-dashoffset"
        values={dashoffset + "; 0"}
        begin={!no ? `indefinite; ${end} + 2s` : `route${no - 1}.end`}
        dur={dashoffset / 500 + "s"}
        fill="freeze"
        ref={drawing}
      />
      <set attributeName="stroke-dashoffset" to={dashoffset} begin={end + " + 1s"} fill="freeze" />
    </path>
  );
};

const mapStateToProps = (state, { sourceId, targetId }) => {
  let source = getNode(sourceId)(state);
  let target = getNode(targetId)(state);
  let dashoffset;

  if (state.graph.useRealDist) {
    dashoffset = getEdge(sourceId, targetId)(state);
  } else {
    dashoffset = Math.hypot(source.x - target.x, source.y - target.y);
  }

  return { source, target, dashoffset };
};

export default connect(mapStateToProps)(AnimatedPath);
