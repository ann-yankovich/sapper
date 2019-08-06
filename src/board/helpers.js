const CELL_TYPES = {
  bomb: '*',
  hidden: '□',
  empty: '+'
};

const formatMap = map => {
  let formattedMap = map.split('\n').map((item, row) => {
    return item.split('').map((item, column) => {
      return {
        row,
        column,
        value: item
      };
    });
  });

  formattedMap.forEach((row, rowIndex) => {
    row
      .filter(item => item.value > 0)
      .forEach(item => {
        let hiddenItems = getSiblingsByType(
          item,
          CELL_TYPES.hidden,
          formattedMap
        );
        let bombs = getSiblingsByType(item, CELL_TYPES.bomb, formattedMap);

        if (hiddenItems.length === item.value - bombs.length) {
          hiddenItems.forEach(i => setValue(i, CELL_TYPES.bomb, formattedMap));
        }

        bombs = getSiblingsByType(item, CELL_TYPES.bomb, formattedMap);
        if (bombs.length === +item.value) {
          const epmtyItems = getSiblingsByType(
            item,
            CELL_TYPES.hidden,
            formattedMap
          );
          epmtyItems.forEach(i => setValue(i, CELL_TYPES.empty, formattedMap));
        }
      });
  });

  return formattedMap;
};

const getEmptyItem = map => {
  return map
    .map(row => {
      return row.filter(item => item.value === CELL_TYPES.empty).shift();
    })
    .filter(item => !!item)
    .shift();
};

function setValue({ row, column }, value, map) {
  map[row][column].value = value;
}

function getValue(row, column, map) {
  return (map && map[row] && map[row][column] && map[row][column].value) || 0;
}

function getSiblingsByType(item, sign, map) {
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
    let value = getValue(row, column, map);
    if (value === sign) {
      result.push({ value, row, column });
    }
  }

  return result;
}

export { formatMap, getEmptyItem, CELL_TYPES };
