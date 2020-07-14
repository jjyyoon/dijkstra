import { createSelector } from "reselect";

const getNodes = state => state.graph.nodes;
const getEdges = state => state.graph.edges;
const getResult = state => state.result;

export const getNodeLabels = createSelector([getNodes], nodes => {
  if (nodes) {
    return nodes.map(node => node.label);
  }
});

export const getIsGraphCreated = createSelector([getEdges], edges => !!edges);

export const getIsResultFound = createSelector([getResult], result => !!result);
