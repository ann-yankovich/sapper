import React from 'react';
import Board from '/src/board';
import Levels from '/src/levels';

import './styles.css';

export default function SapperView(props) {
  const { map, level, onLevelChange, onCellClick, message } = props;

  return (
    <div className="sapper-wrapper">
      <Levels level={level} onChange={onLevelChange} />
      <Board map={map} onCellClick={onCellClick} />
      {message && <p>{message}</p>}
    </div>
  );
}
