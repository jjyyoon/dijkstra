import React from "react";

const btnClassName = (simple, outline, color) => {
  if (simple) {
    return `w-full bg-${color}-500 hover:bg-${color}-700 text-white focus:shadow-outline-${color}`;
  }

  if (outline) {
    return `hover:bg-${color}-600 text-${color}-700 hover:text-white border border-${color}-500`;
  }

  return `border-transparent text-${color}-500 hover:text-${color}-800 text-sm py-1 px-2`;
};

const CustomButton = ({ type, content, simple, outline, color, addition, handleClick }) => {
  let className = btnClassName(simple, outline, color);

  if (addition) {
    className = `${className} ${addition}`;
  }

  return (
    <button
      className={className}
      type={type ? type : "button"}
      onClick={handleClick ? handleClick : null}
    >
      {content}
    </button>
  );
};

export default CustomButton;
