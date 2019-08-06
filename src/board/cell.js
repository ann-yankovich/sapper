import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { CELL_TYPES } from './helpers';

import './styles.css';

class Cell extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    item: PropTypes.exact({
      value: PropTypes.string.isRequired,
      column: PropTypes.number.isRequired,
      row: PropTypes.number.isRequired
    })
  };

  getSymbol(sign) {
    return [CELL_TYPES.hidden, CELL_TYPES.bomb, '0'].includes(sign) ? '' : sign;
  }

  render() {
    const {
      item: { value, column, row },
      onClick
    } = this.props;

    const className = classnames('column', {
      opened: value >= 0,
      error: value === CELL_TYPES.bomb
    });

    return (
      <span className={className} onClick={onClick.bind(null, column, row)}>
        {this.getSymbol(value)}
      </span>
    );
  }
}

export default Cell;
