import React from "react";
import { generateVertices, generateGraph } from "./helpers";

import FormContainer from "./components/FormContainer";
import Vertex from "./components/Vertex";
import Line from "./components/Line";

const App = () => {
  const vertices = generateVertices(9);
  const graph = generateGraph(vertices);

  return (
    <div className="h-screen flex font-body">
      <FormContainer graph={graph} vertices={vertices} />
      {graph && (
        <svg className="w-4/5 h-full overflow-visible">
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
