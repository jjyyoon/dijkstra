import React, { useState, useEffect } from "react";
import { generateVertices } from "./helpers";
import Vertex from "./components/vertex/Vertex";
import "./App.css";

const App = () => {
  const [vertices, setVertices] = useState(null);

  useEffect(() => {
    const { clientWidth, clientHeight } = document.getElementsByTagName("svg")[0];
    setVertices(generateVertices(20, clientWidth, clientHeight));
  }, []);

  return (
    <div className="App">
      <svg>
        {vertices && vertices.map((vertex, index) => <Vertex key={index} vertex={vertex} />)}
      </svg>
    </div>
  );
};

export default App;
