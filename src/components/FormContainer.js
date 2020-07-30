import React from "react";
import SelectNodes from "./SelectNodes";

const FormContainer = () => (
  <div className="w-1/5 h-full centre-items bg-indigo-100">
    <div className="max-w-7/8 -mt-64">
      <h1>Find The Shortest Path</h1>
      <h3>using Dijkstra's Algorithm</h3>
      <SelectNodes />
    </div>
  </div>
);

export default FormContainer;
