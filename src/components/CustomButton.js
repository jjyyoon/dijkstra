import React from "react";

const CustomButton = ({ content }) => (
  <button
    className="w-full bg-blue-500 hover:bg-blue-700 text-white focus:shadow-outline"
    type="submit"
  >
    {content}
  </button>
);

export default CustomButton;
