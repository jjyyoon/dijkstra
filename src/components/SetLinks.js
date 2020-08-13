import React from "react";
import { connect } from "react-redux";
import { getNodeLabels, getElementInEdges } from "../redux/selectors";

import CustomButton from "./CustomButton";
import { ReactComponent as CloseOutline } from "../assets/close-outline.svg";

const Popover = ({ label, nodeLabels, edges }) => (
  <foreignObject
    className="w-64 h-108 bg-white rounded-lg shadow-xl border border-gray-500"
    x="0"
    y="0"
  >
    <div className="px-3 py-2 bg-gray-200 rounded-t-lg flex items-center justify-between">
      <h3>Set Node {label}</h3>
      <CloseOutline className="h-4 w-4" />
    </div>

    <form className="px-4 pt-3">
      <div className="flex items-center mb-3 border-b border-teal-500 py-1">
        <label className="label pr-4" htmlFor="label">
          Label
        </label>
        <input placeholder={label} id="label" maxLength="13" />
      </div>
      <div className="mb-3">
        <p className="label mb-2 border-b border-teal-500 py-1">Linked To</p>
        {edges.map((edge, idx) => (
          <div key={idx} className="flex flex-wrap mb-1 text-sm">
            <div className="w-3/5">
              <input type="checkbox" id="linked" defaultChecked={!edge ? false : true} />
              <label htmlFor="linked">{" " + nodeLabels[idx]}</label>
            </div>
            <div className="w-2/5">
              <label htmlFor="cost">{"Cost: "}</label>
              <input
                className="outline-none"
                type="number"
                id="cost"
                min="1"
                max="20"
                defaultValue={edge}
              />
            </div>
          </div>
        ))}
      </div>
      <CustomButton content="Save" color="teal" />
    </form>
  </foreignObject>
);

const mapStateToProps = (state, { idx }) => ({
  nodeLabels: getNodeLabels(state),
  edges: getElementInEdges(idx)(state)
});

export default connect(mapStateToProps)(Popover);
