import React, { Component } from 'react';
import View from './view';
import { prepareData, RESPONCES_TYPES } from './helpers';

import './styles.css';

class Sapper extends Component {
  constructor() {
    super();

    this.state = {
      map: '',
      message: ''
    };

    this.level = 1;
    this.socket = new WebSocket('wss://hometask.eg1236.com/game1/');
  }

  componentDidMount() {
    this.socket.addEventListener('open', this.start);
    this.socket.addEventListener('message', this.onMessage);
    // onerror
    // onclose
  }

  componentWillUnmount() {
    this.socket.removeEventListener('open', this.start);
    this.socket.removeEventListener('message', this.onMessage);
    this.socket.close();
  }

  start = () => {
    this.socket.send(`new ${this.level}`);
    this.socket.send('open 0 0');
  };

  onMessage = event => {
    const { type, payload } = prepareData(event.data);

    switch (type) {
      case 'map':
        this.setState({ map: payload });
        break;
      case 'open':
        console.log(payload);
        if (payload === RESPONCES_TYPES.opened) {
          this.socket.send('map');
        } else if (payload === RESPONCES_TYPES.fail) {
          this.start();
        } else if (payload.includes(RESPONCES_TYPES.win)) {
          this.setState({
            message: payload
          });
        }
        break;
      default:
        break;
    }
  };

  onLevelChange = level => {
    this.level = level;
    this.start();
  };

  onCellClick = (column, row) => {
    this.socket.send(`open ${column} ${row}`);
  };

  render() {
    const { map, level, message } = this.state;

    if (!map) {
      return null;
    }

    return (
      <View
        level={level}
        map={map}
        message={message}
        onCellClick={this.onCellClick}
        onLevelChange={this.onLevelChange}
      />
    );
  }
}

export default Sapper;
