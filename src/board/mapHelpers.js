const BOMB = '*';
const BLIND = '□';
const CLEAN = '+';

let formattedMap = [];

const formatMap = (map, open) => {
  formattedMap = map.split('\n').map((item, row, array) => {
    return item.split('').map((item, column, array) => {
      return {
        row,
        column,
        value: item
      };
    });
  });

  formattedMap.forEach(item => {
    item.forEach(item => {
      const { value } = item;
      if (value > 0) {
        let cleanSibling = getSiblingsBySign(item, CLEAN)[0];

        if (cleanSibling) {
          open(cleanSibling);
          return;
        }

        let siblingsBomb = getSiblingsBySign(item, BOMB);
        if (siblingsBomb.length === +value) {
          let siblingsEmpty = getSiblingsBySign(item, BLIND);
          siblingsEmpty.forEach(item => {
            setValue(item, CLEAN);
          });
          open(siblingsEmpty);
          return;
        }

        let siblingsEmpty = getSiblingsBySign(item, BLIND);
        if (siblingsEmpty.length === value - siblingsBomb.length) {
          siblingsEmpty.forEach(item => setValue(item, BOMB));
        }
      }
    });
  });

  return formattedMap;
};

const setValue = ({ row, column }, value) => {
  formattedMap[row][column].value = value;
};

const getValue = (row, column) => {
  return (
    (formattedMap[row] &&
      formattedMap[row][column] &&
      formattedMap[row][column].value) ||
    0
  );
};

const getSiblingsBySign = (item, sign) => {
  const { row, column } = item;
  let result = [];

  var offsetsMap = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1]
  ];

  offsetsMap.forEach(([rowOffset, columnOffset]) => {
    var siblingRow = row + rowOffset;
    var siblingColumn = column + columnOffset;

    if (siblingRow < 0 || siblingColumn < 0) {
      return;
    }

    createItem(siblingRow, siblingColumn);
  });

  function createItem(row, column) {
    let value = getValue(row, column);
    if (value === sign) {
      result.push({ value, row, column });
    }
  }

  return result;
};

export { formatMap, BOMB, BLIND, CLEAN };
