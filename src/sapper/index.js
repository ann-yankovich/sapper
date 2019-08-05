import React, { Component } from 'react';
import View from './view';
import { prepareData } from './helpers';

import './styles.css';

class Sapper extends Component {
  constructor() {
    super();

    this.state = {
      // level: 1,
      map: null
    };

    this.socket = new WebSocket('wss://hometask.eg1236.com/game1/');
  }

  componentDidMount() {
    this.socket.addEventListener('open', this.onConnected);
    this.socket.addEventListener('message', this.onMessage);
    // onerror
    // onclose
  }

  componentWillUnmount() {
    this.socket.removeEventListener('open', this.onStart);
    this.socket.removeEventListener('message', this.onMessage);
    this.socket.close();
  }

  onConnected = () => {
    this.socket.send(`new ${this.state.level}`);
    this.socket.send('map');
    // this.openCell(0, 0);
  };

  onMessage = event => {
    const { type, payload } = prepareData(event.data);

    this.inProcess = false;

    switch (type) {
      case 'map':
        // const map = formatMap(payload, this.openCells);
        this.setState({ map: payload });
        break;
      case 'open':
        // this.setState({
        //   finalMessage: payload !== EMPTY_CEIL ? payload : ''
        // });
        console.log(payload);
        // if (payload === EMPTY_CEIL) {
        //   this.socket.send('map');
        //   this.inProcess = true;
        // }
        // if (payload === FAIL) {
        //   this.startNewGame();
        // }
        break;
      default:
        console.log(payload);
        break;
    }
  };

  onLevelChange = level => {
    this.socket.send(`new ${this.state.level}`);
    // this.setState({
    //   level
    // });
  };

  onCellClick = (column, row) => {
    this.socket.send(`open ${column} ${row}`);
  };

  render() {
    const { map, level } = this.state;

    return (
      <View
        level={level}
        map={map}
        onCellClick={this.onCellClick}
        onLevelChange={this.onLevelChange}
      />
    );
  }
}

export default Sapper;
