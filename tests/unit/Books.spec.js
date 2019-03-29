import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import Books from '@/views/Books.vue';
import mockAxios from 'axios';
import { fail } from 'assert';
import SilenceWarnHack from '../utils/SilenceWarnHack';

let wrapper;
let localVue;
const book1 = {
  id: '1',
  title: 'test book',
  author: {
    name: 'the tester',
  },
  image_url: 'image-url',
  small_image_url: 'small-image-url',
};
const book2 = {
  id: '2',
  title: 'test book',
  author: {
    name: 'the tester',
  },
  image_url: 'image-url',
  small_image_url: 'small-image-url',
};

const RealDate = Date;
function mockDate(isoDate) {
  global.Date = class extends RealDate {
    constructor() {
      return new RealDate(isoDate);
    }
  };
}

const silenceWarnHack = new SilenceWarnHack();

jest.useFakeTimers();

describe('Books.vue', () => {
  beforeEach(() => {
    silenceWarnHack.enable();
    localVue = createLocalVue();
    localVue.use(Vuetify);
    silenceWarnHack.disable();
  });

  afterEach(() => {
    global.Date = RealDate;
  });

  it('should search and load the books', done => {
    const promise = Promise.resolve({
      data: [book1, book2],
    });
    mockAxios.get.mockImplementationOnce(() => promise);

    wrapper = mount(Books, {
      localVue,
      stubs: {
        'v-text-field': '<div class=search-field-stub></div>',
        BookCard: '<div class=book-card-stub></div>',
      },
    });

    wrapper.vm.search();
    promise
      .then(() => {
        expect(wrapper.vm.books.length).toEqual(2);
        expect(wrapper.find('.book-card-stub').exists()).toBe(true);
        done();
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('should trigger debounced search', done => {
    const promise = Promise.resolve({
      data: [book1, book2],
    });
    mockAxios.get.mockImplementationOnce(() => promise);

    wrapper = mount(Books, {
      localVue,
      stubs: {
        'v-text-field': '<div class=search-field-stub></div>',
        BookCard: '<div class=book-card-stub></div>',
      },
    });

    wrapper.setData({ inputSearch: 'ender' });
    jest.advanceTimersByTime(300);

    promise
      .then(() => {
        expect(wrapper.vm.books.length).toEqual(2);
        expect(wrapper.find('.book-card-stub').exists()).toBe(true);
        done();
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('should invalidate one search if another is performed on debounced time', done => {
    let promise1Resolver;
    let promise2Resolver;
    const promise1 = new Promise(resolve => {
      promise1Resolver = resolve;
    });
    const promise2 = new Promise(resolve => {
      promise2Resolver = resolve;
    });
    mockAxios.get.mockImplementationOnce(() => promise1);
    mockAxios.get.mockImplementationOnce(() => promise2);

    wrapper = mount(Books, {
      localVue,
      stubs: {
        'v-text-field': '<div class=search-field-stub></div>',
        BookCard: '<div class=book-card-stub></div>',
      },
    });

    mockDate('2019-03-25T22:01:00z');
    wrapper.setData({ inputSearch: 'ender' });
    jest.advanceTimersByTime(300);

    mockDate('2019-03-25T22:02:00z');
    wrapper.setData({ inputSearch: 'matrix' });
    jest.advanceTimersByTime(300);

    promise1Resolver({ data: [book1, book2] });
    promise1
      .then(() => {
        expect(wrapper.vm.books.length).toEqual(0);
        expect(wrapper.vm.performingSearch).toBe(true);
        promise2Resolver({ data: [book1] });
        promise2
          .then(() => {
            expect(wrapper.vm.books.length).toEqual(1);
            expect(wrapper.vm.performingSearch).toBe(false);
            done();
          })
          .catch(err => {
            throw new Error(err);
          });
      })
      .catch(err => {
        throw new Error(err);
      });
  });

  it('should not load books when error', done => {
    const promise = Promise.reject(new Error('error'));
    mockAxios.get.mockImplementationOnce(() => promise);

    wrapper = mount(Books, {
      localVue,
      stubs: {
        'v-text-field': '<div class=search-field-stub></div>',
        BookCard: '<div class=book-card-stub></div>',
      },
    });

    wrapper.setData({ inputSearch: 'ender' });
    jest.advanceTimersByTime(300);

    promise
      .then(() => {
        fail('Promise should fail');
        done();
      })
      .catch(() => {
        expect(wrapper.vm.books.length).toEqual(0);
        expect(wrapper.vm.performingSearch).toBe(false);
        done();
      });
  });

  it('should keep loading if an invalidated search fails', done => {
    let promise1Resolver;
    let promise2Resolver;
    const promise1 = new Promise((resolve, reject) => {
      promise1Resolver = reject;
    });
    const promise2 = new Promise(resolve => {
      promise2Resolver = resolve;
    });
    mockAxios.get.mockImplementationOnce(() => promise1);
    mockAxios.get.mockImplementationOnce(() => promise2);

    wrapper = mount(Books, {
      localVue,
      stubs: {
        'v-text-field': '<div class=search-field-stub></div>',
        BookCard: '<div class=book-card-stub></div>',
      },
    });

    mockDate('2019-03-25T22:01:00z');
    wrapper.setData({ inputSearch: 'ender' });
    jest.advanceTimersByTime(300);

    mockDate('2019-03-25T22:02:00z');
    wrapper.setData({ inputSearch: 'matrix' });
    jest.advanceTimersByTime(300);

    promise1Resolver(new Error('error'));
    promise1
      .then(() => {
        fail('Promise 1 should fail');
        done();
      })
      .catch(() => {
        expect(wrapper.vm.books.length).toEqual(0);
        expect(wrapper.vm.performingSearch).toBe(true);
        promise2Resolver({});
        done();
      });
  });

  it('should load the proper size when mode is valid', () => {
    wrapper = mount(Books, {
      localVue,
      stubs: {
        'v-text-field': '<div class=search-field-stub></div>',
        BookCard: '<div class=book-card-stub></div>',
      },
    });

    wrapper.vm.resize('line');
    expect(wrapper.vm.dynamicSizeXs).toEqual('xs12');
    expect(wrapper.vm.dynamicSizeSm).toEqual('sm12');
    expect(wrapper.vm.dynamicSizeMd).toEqual('md12');
    expect(wrapper.vm.dynamicSizeLg).toEqual('lg12');
    expect(wrapper.vm.dynamicSizeXl).toEqual('xl12');

    wrapper.vm.resize('grid');
    expect(wrapper.vm.dynamicSizeXs).toEqual('xs6');
    expect(wrapper.vm.dynamicSizeSm).toEqual('sm4');
    expect(wrapper.vm.dynamicSizeMd).toEqual('md4');
    expect(wrapper.vm.dynamicSizeLg).toEqual('lg3');
    expect(wrapper.vm.dynamicSizeXl).toEqual('xl2');

    wrapper.vm.resize('card');
    expect(wrapper.vm.dynamicSizeXs).toEqual('xs12');
    expect(wrapper.vm.dynamicSizeSm).toEqual('sm6');
    expect(wrapper.vm.dynamicSizeMd).toEqual('md6');
    expect(wrapper.vm.dynamicSizeLg).toEqual('lg4');
    expect(wrapper.vm.dynamicSizeXl).toEqual('xl4');
  });
});
