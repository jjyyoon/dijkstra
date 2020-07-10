import React from "react";
import { generateVertices, generateGraph } from "./helpers";

import FormContainer from "./components/FormContainer";
import Playground from "./components/Playground";

class App extends React.Component {
  constructor(props) {
    super(props);

    const { innerWidth, innerHeight } = window;
    const vertices = generateVertices(9, innerWidth * 0.8, innerHeight);
    const graph = generateGraph(vertices);

    this.state = { vertices, graph, result: null };
  }

  setResult = (result, afterUpdate) => this.setState({ result }, afterUpdate);

  setPoint = (onDrag, x, y) => {
    const { vertices } = this.state;
    vertices[onDrag] = { ...vertices[onDrag], x, y };

    this.setState({ vertices });
  };

  setGraph = onDrag => {
    const { vertices, graph } = this.state;
    const { x, y } = vertices[onDrag];

    graph[onDrag].forEach((dist, idx) => {
      if (dist) {
        const target = vertices[idx];
        const r = Math.hypot(target.x - x, target.y - y);
        graph[onDrag][idx] = r;
        graph[idx][onDrag] = r;
      }
    });

    this.setState({ graph });
  };

  setAllPoints = (widthRatio, heightRatio) => {
    const { vertices, graph } = this.state;

    vertices.forEach(vertex => {
      vertex.x = vertex.x * widthRatio;
      vertex.y = vertex.y * heightRatio;
    });

    graph.forEach((edges, i) => {
      const { x, y } = vertices[i];

      edges.forEach((edge, j) => {
        if (edge && i < j) {
          const target = vertices[j];
          const r = Math.hypot(target.x - x, target.y - y);
          graph[i][j] = r;
          graph[j][i] = r;
        }
      });
    });

    this.setState({ vertices, graph });
  };

  render() {
    const { vertices, graph, result } = this.state;

    return (
      <div className="h-screen flex font-body">
        <FormContainer
          vertices={vertices}
          graph={graph}
          result={result}
          setResult={this.setResult}
        />
        {graph && (
          <Playground
            vertices={vertices}
            graph={graph}
            result={result}
            setPoint={this.setPoint}
            setGraph={this.setGraph}
            setAllPoints={this.setAllPoints}
          />
        )}
      </div>
    );
  }
}

export default App;
