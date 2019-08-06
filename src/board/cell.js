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

  getSymbol(sign: string) {
    return [CELL_TYPES.hidden, CELL_TYPES.bomb, "0"].includes(sign) ? "" : sign;
  }

  render() {
    const {
      item,
      item: { value },
      onClick
    } = this.props;

    const className = classnames("column", {
      opened: value >= 0,
      error: value === CELL_TYPES.bomb
    });

    return (
      <span className={className} onClick={onClick.bind(null, [item])}>
        {this.getSymbol(value)}
      </span>
    );
  }
}

export default Cell;
