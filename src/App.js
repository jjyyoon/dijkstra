import React from "react";
import { generateVertices, generateGraph } from "./helpers";

import Vertex from "./components/vertex/Vertex";
import Line from "./components/line/Line";

const App = () => {
  const vertices = generateVertices(9);
  const graph = generateGraph(vertices);

  return (
    <div className="text-center h-screen flex flex-col items-center justify-center">
      {graph && (
        <svg className="w-3/4 h-full border border-solid border-red-300 overflow-visible">
          {graph.map((source, i) =>
            source.map((target, j) => {
              if (target && i < j) {
                return <Line key={i + j} source={vertices[i]} target={vertices[j]} />;
              }
            })
          )}
          {vertices.map((vertex, idx) => (
            <Vertex key={idx} vertex={vertex} />
          ))}
        </svg>
      )}
    </div>
  );
};

export default App;
