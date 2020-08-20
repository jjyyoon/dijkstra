import React, { useState } from "react";
import { connect } from "react-redux";
import { changeSetting, resetResult } from "../redux/actions";
import { getIsResultSet } from "../redux/selectors";

import CustomButton from "./CustomButton";
import SetLinks from "./SetLinks";
import ResultContainer from "./ResultContainer";

const Header = ({ useRealDist, isResultSet, changeSetting, resetResult }) => {
  const [showSetting, setShowSetting] = useState(false);

  const handleChange = () => {
    changeSetting();
    resetResult();
  };
  const handleClick = () => setShowSetting(!showSetting);
  const handleClose = () => setShowSetting(false);

  return (
    <div className="p-4 pb-0">
      <div className="inline-block">
        <div>
          <input type="checkbox" checked={!useRealDist} onChange={handleChange} />
          <label>Set Your Own Distances</label>
        </div>
        <div>
          <input type="checkbox" checked={useRealDist} onChange={handleChange} />
          <label>Use Real Distances</label>
        </div>
      </div>
      <div className="float-right relative">
        <CustomButton
          content="Change Node Settings"
          simple={true}
          color="red"
          handleClick={handleClick}
        />
        {showSetting && <SetLinks handleClose={handleClose} />}
      </div>
      {isResultSet && <ResultContainer />}
    </div>
  );
};

const mapStateToProps = state => ({
  useRealDist: state.graph.useRealDist,
  isResultSet: getIsResultSet(state)
});

const mapDispatchToProps = dispatch => ({
  changeSetting: () => dispatch(changeSetting()),
  resetResult: () => dispatch(resetResult())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
