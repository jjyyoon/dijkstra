import React, { useState } from "react";
import { connect } from "react-redux";
import { getNodeLabels } from "../redux/selectors";

import CustomSelect from "./CustomSelect";
import LinkedTo from "./LinkedTo";
import { ReactComponent as CloseOutline } from "../assets/close-outline.svg";

const Popover = ({ nodeLabels, edges }) => {
  const [selectedId, setSelectedId] = useState(0);

  const handleChange = ({ target: { selectedIndex } }) => {
    setSelectedId(selectedIndex);
  };

  return (
    <div className="absolute right-0 mt-1 z-10">
      <div className="absolute right-10 w-4 h-4 bg-gray-200 transform rotate-45" />
      <div className="w-72 bg-white rounded-lg shadow-xl border border-gray-200 absolute right-2 top-2">
        <div className="px-3 py-2 bg-gray-200 rounded-t-lg flex items-center justify-between">
          <h3>Set Node</h3>
          <CustomSelect py="1" handleChange={handleChange} />
          <CloseOutline className="h-4 w-4" />
        </div>

        <form className="px-4 pt-3 pb-4 mb-4">
          <div className="flex items-center mb-3 border-b-4 border-teal-500 py-1">
            <label className="label pr-4" htmlFor="label">
              Label
            </label>
            <input placeholder={nodeLabels[selectedId]} id="label" maxLength="13" />
          </div>
          <div>
            <p className="label mb-2 border-b-4 border-teal-500 py-1">Linked To</p>
            {edges[selectedId].map((edge, idx) => (
              <LinkedTo key={`${selectedId}${idx}`} edge={edge} label={nodeLabels[idx]} />
            ))}
          </div>
        </form>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  nodeLabels: getNodeLabels(state),
  edges: state.graph.edges
});

export default connect(mapStateToProps)(Popover);
