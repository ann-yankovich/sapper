import React from 'react';
import './styles.css';

LevelsView.propTypes = {
  levels: PropTypes.array.isRequired
};

export default function LevelsView(props) {
  const { levels } = props;

  return (
    <ul className="levels">
      {levels.map((item, index) => {
        return (
          <li key={item}>
            <input
              id={item}
              type="radio"
              name="level"
              value={index + 1}
              onChange={props.onChange}
            />
            <label htmlFor={item} className={item}>
              {item}
            </label>
          </li>
        );
      })}
    </ul>
  );
}
