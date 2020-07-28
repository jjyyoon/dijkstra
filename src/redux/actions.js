import { generateVertices, generateEdges, findTheShortestPath } from "../helpers";

export const generateGraph = (num, maxX, maxY) => {
  const nodes = generateVertices(num, maxX, maxY);

  return {
    type: "GENERATE_GRAPH",
    nodes,
    edges: generateEdges(nodes)
  };
};

export const updateNode = (idx, x, y) => {
  return (dispatch, getState) => {
    const { nodes } = getState().graph;
    nodes[idx] = { ...nodes[idx], x, y };

    return dispatch({ type: "UPDATE_NODE", nodes });
  };
};

const calcEdges = (nodes, edges, i, all) => {
  const { x, y } = nodes[i];

  edges[i].forEach((edge, j) => {
    if (edge && (!all || (all && i < j))) {
      const target = nodes[j];
      const r = Math.hypot(target.x - x, target.y - y);
      edges[i][j] = r;
      edges[j][i] = r;
    }
  });

  return edges;
};

export const updateEdges = idx => {
  return (dispatch, getState) => {
    let { nodes, edges } = getState().graph;
    edges = calcEdges(nodes, edges, idx, false);

    return dispatch({ type: "UPDATE_EDGES", edges });
  };
};

export const updateGraph = (forX, forY) => {
  return (dispatch, getState) => {
    let { nodes, edges } = getState().graph;

    nodes.forEach((node, idx) => {
      nodes[idx] = { ...nodes[idx], x: node.x * forX, y: node.y * forY };
    });

    for (let i = 0; i < edges.length - 1; i++) {
      edges = calcEdges(nodes, edges, i, true);
    }

    return dispatch({ type: "UPDATE_GRAPH", nodes, edges });
  };
};

export const setResult = (source, target) => {
  return (dispatch, getState) => {
    const { edges } = getState().graph;
    const result = findTheShortestPath(edges, source, target);

    return dispatch({ type: "SET_RESULT", result: result[target].path });
  };
};
