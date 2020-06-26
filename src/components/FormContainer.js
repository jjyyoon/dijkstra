import React from "react";
import SelectNodes from "./SelectNodes";

const FormContainer = ({ graph, vertices }) => (
  <div className="w-1/5 h-full flex items-center justify-center bg-indigo-100">
    <div className="max-w-9/11 -mt-64">
      <h1>Find The Shortest Path</h1>
      <h3>using Dijkstra's Algorithm</h3>
      <SelectNodes graph={graph} options={vertices} />
    </div>
  </div>
);

export default FormContainer;
