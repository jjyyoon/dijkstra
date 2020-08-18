import React, { useState } from "react";

import CustomSelect from "./CustomSelect";
import ChangeLabel from "./ChangeLabel";
import Repeat from "./Repeat";
import LinkedTo from "./LinkedTo";
import { ReactComponent as CloseOutline } from "../assets/close-outline.svg";

const Popover = ({ handleClose }) => {
  const [selectedId, setSelectedId] = useState(0);

  const handleChange = ({ target: { selectedIndex } }) => {
    setSelectedId(selectedIndex);
  };

  return (
    <div className="absolute right-0 mt-1 z-10">
      <div className="absolute right-10 w-4 h-4 bg-gray-200 transform rotate-45" />
      <div className="w-72 bg-white rounded-lg shadow-xl border border-gray-200 absolute right-2 top-2">
        <div className="px-3 py-2 bg-gray-200 rounded-t-lg flex items-center justify-between">
          <h3>Set Node</h3>
          <CustomSelect py="1" handleChange={handleChange} />
          <CloseOutline className="h-4 w-4 cursor-pointer" onClick={handleClose} />
        </div>

        <div className="p-4 pt-3 mb-4">
          <ChangeLabel key={selectedId} id={selectedId} />
          <div>
            <p className="label mb-2 border-b-4 border-teal-500 py-1">Linked To</p>
            <Repeat>
              {idx => <LinkedTo key={`${selectedId}${idx}`} source={selectedId} target={idx} />}
            </Repeat>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popover;
