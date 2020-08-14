import React from "react";
import { connect } from "react-redux";
import { getNodeLabels } from "../redux/selectors";
import { ReactComponent as CheveronDown } from "../assets/cheveron-down.svg";

const CustomSelect = ({ id, py = "3", handleChange, options }) => (
  <div className="relative">
    <select
      className={`bg-gray-200 border border-gray-200 py-${py} px-4 pr-8 rounded focus:bg-white focus:border-gray-500`}
      id={!id ? null : id}
      onChange={!handleChange ? null : handleChange}
    >
      {options.map((option, idx) => (
        <option key={idx}>{option}</option>
      ))}
    </select>
    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
      <CheveronDown className="fill-current h-4 w-4" />
    </div>
  </div>
);

const mapStateToProps = state => ({ options: getNodeLabels(state) });

export default connect(mapStateToProps)(CustomSelect);
