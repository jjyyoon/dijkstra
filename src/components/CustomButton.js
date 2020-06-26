import React from "react";

const CustomButton = ({ content }) => (
  <button
    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
    type="submit"
  >
    {content}
  </button>
);

export default CustomButton;
