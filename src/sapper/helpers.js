const RESPONCES_TYPES = {
  opened: 'OK',
  fail: 'You lose',
  win: 'You win'
};

const prepareData = eventData => {
  let map = {
    type: '',
    payload: ''
  };

  return eventData.split(':').reduce((result, current, index) => {
    if (index === 0) {
      result.type = current.trim();
    } else {
      result.payload += current.trim();
    }
    return result;
  }, map);
};

export { prepareData, RESPONCES_TYPES };
