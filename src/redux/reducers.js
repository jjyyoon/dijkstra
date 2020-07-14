import { combineReducers } from "redux";

const graph = (state = { nodes: null, edges: null }, action) => {
  switch (action.type) {
    case "GENERATE_GRAPH":
    case "UPDATE_GRAPH":
      return {
        ...state,
        nodes: action.nodes,
        edges: action.edges
      };
    case "UPDATE_NODE":
      return {
        ...state,
        nodes: action.nodes
      };
    case "UPDATE_EDGES":
      return {
        ...state,
        edges: action.edges
      };
    default:
      return state;
  }
};

const result = (state = null, action) => {
  switch (action.type) {
    case "SET_RESULT":
      return action.result;
    default:
      return state;
  }
};

export default combineReducers({ graph, result });
