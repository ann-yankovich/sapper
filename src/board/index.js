import React, { Component } from 'react';
import View from './view';
import { formatMap } from './helpers';

class Board extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const { map, onCellClick } = this.props;

    if (!map) {
      return null;
    }

    return <View map={formatMap(map)} onClick={onCellClick} />;
  }
}

export default Board;
