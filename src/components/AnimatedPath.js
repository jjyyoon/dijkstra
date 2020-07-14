import React, { useRef, useEffect } from "react";

const AnimatedPath = ({ no, end, source, target, edge }) => {
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
      strokeDasharray={edge}
      strokeDashoffset={edge}
    >
      <animate
        id={"route" + no}
        attributeName="stroke-dashoffset"
        values={edge + "; 0"}
        begin={!no ? `indefinite; ${end} + 2s` : `route${no - 1}.end`}
        dur={edge / 500 + "s"}
        fill="freeze"
        ref={drawing}
      />
      <set attributeName="stroke-dashoffset" to={edge} begin={end + " + 1s"} fill="freeze" />
    </path>
  );
};

export default AnimatedPath;
