/* globals jest:true */
export default {
  get: jest.fn(() => Promise.resolve({ data: {} })),
};
