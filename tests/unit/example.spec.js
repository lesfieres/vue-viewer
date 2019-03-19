import { mount, createLocalVue } from '@vue/test-utils';
import Vuetify from 'vuetify';
import HelloWorld from '@/components/HelloWorld.vue';

let wrapper;
let localVue;
describe('HelloWorld.vue', () => {
  beforeEach(() => {
    localVue = createLocalVue();
    localVue.use(Vuetify);
  });

  it('renders props.msg when passed', () => {
    const msg = 'Welcome to Vuetify';
    wrapper = mount(HelloWorld, {
      localVue,
      propsData: { msg },
    });
    expect(wrapper.element.getElementsByClassName('welcome').item(0).textContent).toMatch(msg);
  });
});
