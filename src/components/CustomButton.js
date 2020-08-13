import React from "react";

const CustomButton = ({ content, color }) => (
  <button
    className={`w-full bg-${color}-500 hover:bg-${color}-700 text-white focus:shadow-outline`}
    type="submit"
  >
    {content}
  </button>
);

export default CustomButton;
