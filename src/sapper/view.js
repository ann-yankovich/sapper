import React from "react";
import Board from "/src/board";
import Levels from "/src/levels";

import "./styles.css";

export default function SapperView(props) {
  const {
    map,
    level,
    onLevelChange,
    onCellClick,
    message,
    fail,
    restart
  } = props;

  return (
    <div className="sapper-wrapper">
      <Levels level={level} onChange={onLevelChange} />
      <p>{message}</p>
      <div className="info">
        {fail && <button onClick={restart}>Try again!</button>}
      </div>
      <Board map={map} onCellClick={onCellClick} />
    </div>
  );
}
