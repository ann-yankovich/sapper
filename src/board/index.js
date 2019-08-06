import React, { Component } from 'react';
import PropTypes from 'prop-types';
import View from './view';
import { formatMap, getEmptyItem } from './helpers';

class Board extends Component {
  static propTypes = {
    map: PropTypes.string.isRequired,
    onCellClick: PropTypes.func.isRequired
  };

  componentDidMount() {
    this.nextStep();
  }

  componentDidUpdate(prevProps) {
    this.nextStep();
  }

  nextStep() {
    const emptyItem = getEmptyItem(formatMap(this.props.map));
    if (emptyItem) {
      this.props.onCellClick.call(null, emptyItem.column, emptyItem.row);
    }
  }

  render() {
    const { map, onCellClick } = this.props;

    return <View map={formatMap(map)} onClick={onCellClick} />;
  }
}

export default Board;
