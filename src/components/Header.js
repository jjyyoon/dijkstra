import React, { useState } from "react";
import { connect } from "react-redux";
import { changeSetting } from "../redux/actions";
import { getIsResultSet } from "../redux/selectors";

import CustomButton from "./CustomButton";
import SetLinks from "./SetLinks";
import ResultContainer from "./ResultContainer";

const Header = ({ useRealDist, isResultSet, changeSetting }) => {
  const [showSetting, setShowSetting] = useState(false);

  const handleChange = () => changeSetting();
  const handleClick = () => setShowSetting(!showSetting);
  const handleClose = () => setShowSetting(false);

  return (
    <div className="h-1/10 p-4">
      <div className="inline-block">
        <div>
          <input type="checkbox" checked={useRealDist} onChange={handleChange} />
          <label>Use Real Distance as a Cost</label>
        </div>
        <div>
          <input type="checkbox" checked={!useRealDist} onChange={handleChange} />
          <label>Set Your Own Costs</label>
        </div>
      </div>
      <div className="float-right relative">
        <CustomButton
          content="Change Node Setting"
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
  changeSetting: () => dispatch(changeSetting())
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
