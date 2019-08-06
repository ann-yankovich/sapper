import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import { CELL_TYPES } from "./helpers";

import "./styles.css";

// const ItemType = {
//   value: string,
//   column: number,
//   row: number
// }

// type Props = {
//   onClick: Function;
//   item: Object<ItemType>;
// };

class Cell extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    item: PropTypes.exact({
      value: PropTypes.string.isRequired,
      column: PropTypes.number.isRequired,
      row: PropTypes.number.isRequired
    })
  };

  constructor(props) {
    super(props);

    this.state = {
      flag: false,
      doubt: false
    };
  }

  // onContextMenu={e => e.preventDefault()}
  mark = e => {
    e.preventDefault();

    this.setState({
      flag: !this.state.doubt ? !this.state.flag : false,
      doubt: this.state.flag ? !this.state.doubt : false
    });
  };

  getSymbol(sign: string) {
    return [CELL_TYPES.hidden, CELL_TYPES.bomb, "0"].includes(sign) ? "" : sign;
  }

  render() {
    const {
      item,
      item: { value },
      onClick
    } = this.props;

    const className = classnames("cell", {
      opened: value >= 0,
      bomb: value === CELL_TYPES.bomb,
      flag: this.state.flag,
      doubt: this.state.doubt
    });

    return (
      <span
        className={className}
        onClick={onClick.bind(null, [item])}
        onContextMenu={this.mark}
      >
        {this.getSymbol(value)}
      </span>
    );
  }
}

export default Cell;
