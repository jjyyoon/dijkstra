import { createSelector } from "reselect";

const getNodes = nodes => nodes;
const getEdges = state => state.graph.edges;
const getResult = result => result;

export const getNodeLabels = createSelector([getNodes], nodes => nodes.map(node => node.label));
export const getNodesCount = createSelector([getNodes], nodes => nodes.length);

export const getIsGraphCreated = createSelector([getEdges], edges => !!edges);

export const getIsResultFound = createSelector([getResult], result => !!result);
