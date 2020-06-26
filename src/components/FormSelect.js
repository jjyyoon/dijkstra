import React from "react";
import { ReactComponent as CheveronDown } from "../assets/cheveron-down.svg";

const FormSelect = ({ label, options }) => (
  <div className="mb-6">
    <label className="block uppercase text-gray-700 text-sm font-bold mb-2" htmlFor={label}>
      {label}
    </label>
    <div className="relative">
      <select
        className="appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        id={label}
      >
        {options.map((option, idx) => (
          <option key={idx}>{option.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <CheveronDown className="fill-current h-4 w-4" />
      </div>
    </div>
  </div>
);

export default FormSelect;
