import React from "react";

const CustomButton = ({ type, content, color = "blue", handleClick }) => (
  <button
    className={`w-full bg-${color}-500 hover:bg-${color}-700 text-white focus:shadow-outline-${color}`}
    type={type}
    onClick={!handleClick ? null : handleClick}
  >
    {content}
  </button>
);

export default CustomButton;
