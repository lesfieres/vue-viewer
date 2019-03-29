/* globals jest:true */
export default {
  debounce: jest.fn((fn, time) => () => setTimeout(fn, time)),
};
