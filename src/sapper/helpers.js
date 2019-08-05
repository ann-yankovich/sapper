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

export { prepareData };
