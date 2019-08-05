import React from 'react';
import Cell from './cell';
import './styles.css';

function BoardView(props) {
  const { map } = props;

  console.log(map);

  return (
    <div>
      <div className="map">
        {map.map((item, row) => (
          <div className="row" key={row}>
            {item.map((item, column) => (
              <Cell key={column} item={item} onClick={props.onClick} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default BoardView;
