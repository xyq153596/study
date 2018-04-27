import { mount, createLocalVue } from '@vue/test-utils';
import flushPromises from 'flush-promises';
import VeeValidate from './../../src/index';
import InputComponent from './components/stubs/Input';
import TestComponent from './components/Targets';

const Vue = createLocalVue();
Vue.use(VeeValidate);

test('native HTML elements targeting via name selector', async () => {
  const wrapper = mount(TestComponent, { localVue: Vue });
  let input = wrapper.find('#f1');
  let target = wrapper.find('#f2');

  input.element.value = '10';
  input.trigger('input');
  await flushPromises();

  expect(wrapper.vm.$validator.errors.first('f1')).toBe('The f1 confirmation does not match.');
  target.element.value = '10';
  target.trigger('input');
  await flushPromises();

  const field = wrapper.vm.$validator.fields.find({ name: 'f1' });

  expect(wrapper.vm.$validator.errors.has('f1')).toBe(false);
  expect(wrapper.vm.$validator.flags.f1.valid).toBe(true);
});

test('native HTML elements targeting via id selectors', async () => {
  const wrapper = mount(TestComponent, { localVue: Vue });
  let input = wrapper.find('#f3');
  let target = wrapper.find('#f4');

  input.element.value = '10';
  input.trigger('input');
  await flushPromises();

  expect(wrapper.vm.$validator.errors.first('f3')).toBe('The f3 confirmation does not match.');
  target.element.value = '10';
  target.trigger('input');
  await flushPromises();

  const field = wrapper.vm.$validator.fields.find({ name: 'f3' });

  expect(wrapper.vm.$validator.errors.has('f3')).toBe(false);
  expect(wrapper.vm.$validator.flags.f3.valid).toBe(true);
});

test('native HTML elements targeting via class selectors', async () => {
  const wrapper = mount(TestComponent, { localVue: Vue });
  let input = wrapper.find('#f5');
  let target = wrapper.find('.f6');

  input.element.value = '10';
  input.trigger('input');
  await flushPromises();

  expect(wrapper.vm.$validator.errors.first('f5')).toBe('The f5 confirmation does not match.');
  target.element.value = '10';
  target.trigger('input');
  await flushPromises();

  const field = wrapper.vm.$validator.fields.find({ name: 'f5' });

  expect(wrapper.vm.$validator.errors.has('f5')).toBe(false);
  expect(wrapper.vm.$validator.flags.f5.valid).toBe(true);
});

test('custom components targeting via $refs', async () => {
  const wrapper = mount(TestComponent, { localVue: Vue });
  wrapper.setData({
    d1: '10'
  });
  wrapper.findAll(InputComponent).at(0).trigger('input');
  await flushPromises();

  expect(wrapper.vm.$validator.errors.first('f7')).toBe('The f7 confirmation does not match.');
  wrapper.setData({
    d2: '10'
  });
  wrapper.findAll(InputComponent).at(1).trigger('input');
  await flushPromises();

  expect(wrapper.vm.$validator.errors.has('f7')).toBe(false);
  expect(wrapper.vm.$validator.flags.f7.valid).toBe(true);
});

// tests #1107
test('custom components targeting via $ref in a v-for', async () => {
  const wrapper = mount(TestComponent, { localVue: Vue });
  wrapper.setData({
    d3: '10'
  });
  wrapper.findAll(InputComponent).at(2).trigger('input');
  await flushPromises();


  expect(wrapper.vm.$validator.errors.first('f7_1')).toBe('The f7_1 confirmation does not match.');
  expect(wrapper.vm.$validator.errors.first('f7_2')).toBe('The f7_2 confirmation does not match.');
  expect(wrapper.vm.$validator.errors.first('f7_3')).toBe('The f7_3 confirmation does not match.');

  wrapper.setData({
    d4: '10'
  });
  wrapper.findAll(InputComponent).at(3).trigger('input');
  wrapper.findAll(InputComponent).at(5).trigger('input');
  wrapper.findAll(InputComponent).at(7).trigger('input');
  await flushPromises();

  expect(wrapper.vm.$validator.errors.has('f7_1')).toBe(false);
  expect(wrapper.vm.$validator.flags.f7_1.valid).toBe(true);
  expect(wrapper.vm.$validator.errors.has('f7_2')).toBe(false);
  expect(wrapper.vm.$validator.flags.f7_2.valid).toBe(true);
  expect(wrapper.vm.$validator.errors.has('f7_3')).toBe(false);
  expect(wrapper.vm.$validator.flags.f7_3.valid).toBe(true);
});


test('fails silently if it cannot find the target field', async () => {
  const wrapper = mount(TestComponent, { localVue: Vue });
  const input = wrapper.find('#f9');
  input.trigger('input');
  await flushPromises();

  expect(wrapper.vm.$validator.fields.find({ name: 'f9' }).dependencies.length).toBe(0);
});

test('catches invalid selectors', async () => {
  const wrapper = mount(TestComponent, { localVue: Vue });
  const input = wrapper.find('#f11');
  input.trigger('input');
  await flushPromises();

  expect(wrapper.vm.$validator.fields.find({ name: 'f11' }).dependencies.length).toBe(0);
});

test('handles where a querySelector method is not available #870', async () => {
  const wrapper = mount(TestComponent, { localVue: Vue });
  const input = wrapper.find('#f11');
  wrapper.vm.$validator.fields.find({ name: 'f11' }).vm = { $el: {} };
  input.trigger('input');
  await flushPromises();

  expect(wrapper.vm.$validator.fields.find({ name: 'f11' }).dependencies.length).toBe(0);
});

test('has a fallback for the confirmed rule name selector', async () => {
  const wrapper = mount(TestComponent, { localVue: Vue });
  let input = wrapper.find('#f12');
  let target = wrapper.find('#f13');

  input.element.value = '10';
  input.trigger('input');
  await flushPromises();

  expect(wrapper.vm.$validator.errors.first('f12')).toBe('The f12 confirmation does not match.');
  target.element.value = '10';
  target.trigger('input');
  await flushPromises();

  const field = wrapper.vm.$validator.fields.find({ name: 'f12' });

  expect(wrapper.vm.$validator.errors.has('f12')).toBe(false);
  expect(wrapper.vm.$validator.flags.f12.valid).toBe(true);
});