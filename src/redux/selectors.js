import { createSelector } from "reselect";

const getNodes = state => state.graph.nodes;
const getEdges = state => state.graph.edges;
const getSource = state => state.result.source;
const getTarget = state => state.result.target;
const getPath = state => state.result.path;

export const getNode = id => createSelector([getNodes], nodes => nodes[id]);

export const getEdge = (sourceId, targetId) =>
  createSelector([getEdges], edges => edges[sourceId][targetId]);

export const getNodeLabels = createSelector([getNodes], nodes => nodes.map(node => node.label));

export const getNodeLabel = id => createSelector([getNodeLabels], nodeLabels => nodeLabels[id]);

export const getNodesCount = createSelector([getNodes], nodes => nodes.length);

export const getIsGraphCreated = createSelector([getEdges], edges => !!edges);

export const getIsResultSet = createSelector(
  [getSource, getTarget],
  (source, target) => source && target
);

export const getPathStr = createSelector(
  [getNodeLabels, getSource, getTarget, getPath],
  (nodeLabels, source, target, path) => {
    if (!path) {
      return `from ${source} to ${target}`;
    }

    const pathInLabel = [];

    for (let i = 0; i < path.length; i++) {
      pathInLabel.push(nodeLabels[path[i]]);
    }

    return pathInLabel.join(" - ");
  }
);
