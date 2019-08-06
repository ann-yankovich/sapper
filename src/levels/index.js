import React, { Component } from 'react';
import View from './view';

const LEVELS = {
  easy: 1,
  normal: 2,
  hard: 3,
  nightmare: 4
};

class Levels extends Component {
  onChange = event => {
    this.props.onChange(event.target.value);
  };

  render() {
    return <View levels={Object.keys(LEVELS)} onChange={this.onChange} />;
  }
}

export default Levels;
