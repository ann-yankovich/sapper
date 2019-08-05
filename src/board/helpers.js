const CELL_TYPES = {
  bomb: '*',
  hidden: '□',
  empty: '+'
};
const formatMap = map => {
  // console.log('formatMap', map);
  return map.split('\n').map((item, row) => {
    return item.split('').map((item, column) => {
      return {
        row,
        column,
        value: item
      };
    });
  });
};

export { formatMap, CELL_TYPES };
