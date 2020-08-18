import { connect } from "react-redux";
import { getNodesCount } from "../redux/selectors";

const Repeat = ({ nodesCount, children }) => {
  const items = [];

  for (let i = 0; i < nodesCount; i++) {
    items.push(children(i));
  }

  return items;
};

const mapStateToProps = state => ({ nodesCount: getNodesCount(state) });

export default connect(mapStateToProps)(Repeat);
