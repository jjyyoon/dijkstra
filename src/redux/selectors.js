import { createSelector } from "reselect";

const getNodes = nodes => nodes;
const getEdges = edges => edges;
const getPath = path => path;

export const getNodeLabels = createSelector([getNodes], nodes => nodes.map(node => node.label));
export const getNodesCount = createSelector([getNodes], nodes => nodes.length);

export const getIsGraphCreated = createSelector([getEdges], edges => !!edges);

export const getIsPathFound = createSelector([getPath], path => !!path);
