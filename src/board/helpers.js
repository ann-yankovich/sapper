const CELL_TYPES = {
  bomb: "*",
  hidden: "□",
  empty: "+"
};

const formatMap = map => {
  let formattedMap = map.split("\n").map((item, row) => {
    return item.split("").map((item, column) => {
      return {
        row,
        column,
        value: item
      };
    });
  });

  formattedMap.forEach(row => {
    row
      .filter(item => item.value > 0)
      .forEach(item => setBombs(item, formattedMap));
  });

  formattedMap.forEach(row => {
    row
      .filter(item => item.value > 0)
      .forEach(item => setEmpty(item, formattedMap));
  });

  return formattedMap;
};

function setBombs(item, map) {
  const hiddenItems = getSiblingsByType(item, CELL_TYPES.hidden, map);
  const bombs = getSiblingsByType(item, CELL_TYPES.bomb, map);

  if (hiddenItems.length === item.value - bombs.length) {
    hiddenItems.forEach(i => setValue(i, CELL_TYPES.bomb, map));
  }
}

function setEmpty(item, map) {
  const bombs = getSiblingsByType(item, CELL_TYPES.bomb, map);
  if (bombs.length === +item.value) {
    const epmtyItems = getSiblingsByType(item, CELL_TYPES.hidden, map);
    epmtyItems.forEach(i => setValue(i, CELL_TYPES.empty, map));
  }
}

const getEmptyItems = map => {
  return map.reduce((result, row) => {
    const items = row.filter(item => item.value === CELL_TYPES.empty);
    return [...result, ...items];
  }, []);
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

export { formatMap, getEmptyItems, CELL_TYPES };
