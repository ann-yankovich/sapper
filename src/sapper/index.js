import React, { Component } from "react";
import View from "./view";
import { prepareData, RESPONCES_TYPES } from "./helpers";

import "./styles.css";
import { number } from "prop-types";

class Sapper extends Component {
  constructor() {
    super();

    this.state = {
      map: "",
      message: "",
      fail: false
    };

    this.level = 1;
    this.socket = new WebSocket("wss://hometask.eg1236.com/game1/");
  }

  componentDidMount() {
    this.socket.addEventListener("open", this.start);
    this.socket.addEventListener("message", this.onMessage);
    // onerror
    // onclose
  }

  componentWillUnmount() {
    this.socket.removeEventListener("open", this.start);
    this.socket.removeEventListener("message", this.onMessage);
    this.socket.close();
  }

  start = () => {
    this.setState({
      fail: false
    });
    this.socket.send(`new ${this.level}`);
    this.socket.send("map");
  };

  onMessage = event => {
    const { type, payload } = prepareData(event.data);

    switch (type) {
      case "map":
        this.setState({ map: payload });
        break;
      case "open":
        if (payload === RESPONCES_TYPES.fail) {
          this.setState({
            message: payload,
            fail: true
          });
        } else if (payload.includes(RESPONCES_TYPES.win)) {
          this.setState({
            message: payload
          });
        }
        break;
      case "new":
        this.setState({
          message: ""
        });
        break;
      default:
        break;
    }
  };

  onLevelChange = (level: number) => {
    this.level = level;
    this.start();
  };

  onCellClick = items => {
    items.forEach(({ column, row }) => {
      this.socket.send(`open ${column} ${row}`);
    });
    this.socket.send("map");
  };

  render() {
    const { map, message } = this.state;

    if (!map) {
      return null;
    }

    return (
      <View
        level={this.level}
        map={map}
        message={message}
        fail={this.state.fail}
        restart={this.start}
        onCellClick={this.onCellClick}
        onLevelChange={this.onLevelChange}
      />
    );
  }
}

export default Sapper;
