import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import View from './view';
import { formatMap, getEmptyItems } from './helpers';

class Board extends PureComponent {
  static propTypes = {
    map: PropTypes.string.isRequired,
    onCellClick: PropTypes.func.isRequired
  };

  componentDidUpdate() {
    const emptyItems = getEmptyItems(formatMap(this.props.map));
    if (emptyItems.length) {
      this.props.onCellClick.call(null, emptyItems);
    }
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
