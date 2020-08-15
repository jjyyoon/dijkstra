import React from "react";
import CustomSelect from "./CustomSelect";

const FormSelect = ({ label }) => (
  <div className="mb-6">
    <label className="label mb-2" htmlFor={label}>
      {label}
    </label>
    <CustomSelect id={label} />
  </div>
);

export default FormSelect;
