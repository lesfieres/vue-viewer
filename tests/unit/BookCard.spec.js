import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import BookCard from '@/components/BookCard.vue';
import SilenceWarnHack from '../utils/SilenceWarnHack';

let wrapper;
let localVue;
const book = {
  title: 'test book',
  author: {
    name: 'the tester',
  },
  image_url: 'image-url',
  small_image_url: 'small-image-url',
};

const silenceWarnHack = new SilenceWarnHack();

describe('BookCard.vue', () => {
  beforeEach(() => {
    silenceWarnHack.enable();
    localVue = createLocalVue();
    localVue.use(Vuetify);
    silenceWarnHack.disable();
  });

  it('should properly show/hide elements when in grid mode', () => {
    wrapper = mount(BookCard, {
      localVue,
      propsData: {
        book,
        mode: 'grid',
      },
    });

    expect(wrapper.find('.book-card').exists()).toBe(false);
    expect(wrapper.find('.book-card-grid').exists()).toBe(true);
    expect(wrapper.find({ name: 'v-divider' }).exists()).toBe(false);
    expect(wrapper.find('.v-card__actions').exists()).toBe(false);
  });

  it('should properly show/hide elements when not in grid mode', () => {
    wrapper = mount(BookCard, {
      localVue,
      propsData: {
        book,
        mode: 'not-grid',
      },
    });

    expect(wrapper.find('.book-card').exists()).toBe(true);
    expect(wrapper.find('.book-card-grid').exists()).toBe(false);
    expect(wrapper.find({ name: 'v-divider' }).exists()).toBe(true);
    expect(wrapper.find('.v-card__actions').exists()).toBe(true);
  });

  it('should pass props properly to all components', () => {
    wrapper = mount(BookCard, {
      localVue,
      propsData: {
        book,
        mode: 'grid',
      },
    });
    expect(wrapper.find('.title').element.textContent).toEqual(book.title);
    expect(wrapper.find('.author').element.textContent).toEqual(
      book.author.name,
    );

    const vImg = wrapper.find({ name: 'v-img' });
    expect(vImg.exists()).toBe(true);
    /* eslint-disable no-underscore-dangle */
    expect(vImg.vm._props.src).toEqual(book.image_url);
    expect(vImg.vm._props.lazySrc).toEqual(book.small_image_url);
    expect(vImg.vm._props.alt).toEqual(`${book.title} (${book.author.name})`);
    expect(vImg.vm._props.height).toEqual('125px');
    expect(vImg.vm._props.width).toEqual('125px');
  });

  it('should light the stars when mouseover', () => {
    wrapper = mount(BookCard, {
      localVue,
      propsData: {
        book,
        mode: 'card',
      },
    });
    const allStars = wrapper.findAll('.v-icon');
    expect(allStars.length).toEqual(5);
    allStars.at(3).trigger('mouseover');

    expect(allStars.at(0).element.textContent).toEqual('star');
    expect(allStars.at(0).vm._props.color).toEqual('yellow');

    expect(allStars.at(1).element.textContent).toEqual('star');
    expect(allStars.at(1).vm._props.color).toEqual('yellow');

    expect(allStars.at(2).element.textContent).toEqual('star');
    expect(allStars.at(2).vm._props.color).toEqual('yellow');

    expect(allStars.at(3).element.textContent).toEqual('star');
    expect(allStars.at(3).vm._props.color).toEqual('yellow');

    expect(allStars.at(4).element.textContent).toEqual('star_border');
    expect(allStars.at(4).vm._props.color).toEqual('');
  });
});
