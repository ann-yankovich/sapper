import React from "react";
import Board from "../board";
import Levels from "../levels";

import "./styles.css";

export interface SapperViewProps {
    map: Array<object>,
    level: number,
    onLevelChange: void,
    onCellClick: void,
    message?: string,
    fail?: boolean,
    restart(): void,
}

export default function SapperView(props: SapperViewProps) {
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
      <div>
        <Levels level={level} onChange={onLevelChange} />
      </div>
      <div className="info">
        <span className="message">&nbsp;{`${message}`}</span>
        {fail && <button onClick={() => restart()}>Try again!</button>}
      </div>
      <Board map={map} onCellClick={onCellClick} />
    </div>
  );
}
