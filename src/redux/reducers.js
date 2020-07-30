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

const result = (state = { path: null, shown: false }, action) => {
  switch (action.type) {
    case "SET_RESULT":
      return {
        ...state,
        path: action.path,
        shown: true
      };
    case "RESET_RESULT":
      return {
        ...state,
        path: null,
        shown: false
      };
    case "TOGGLE_RESULT_SHOWN":
      return {
        ...state,
        shown: !state.shown
      };
    default:
      return state;
  }
};

export default combineReducers({ graph, result });
