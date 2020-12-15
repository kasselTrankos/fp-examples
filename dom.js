// dom is
import IO from './fp/monad/io';
import {h} from 'virtual-dom';
import {compose, lensProp, prop, set, view} from 'ramda';
import createElement from 'virtual-dom/create-element';


const DOM = (tag, attrs) => IO(()=> h(tag, attrs));

const p = DOM('p', {value: 'hola'});
const properties = lensProp('properties');
const tagName = lensProp('tagName');
const disabled = lensProp('disabled');
const propsDisabled = compose(properties, disabled);
const setProp = prop => value => xs => set(prop, value, xs)
const see = f => x => view(f, x);
console.log(p
    // .map(createElement)
    .map(setProp(compose(properties, disabled))(true))
    .unsafePerformIO()
)
const xL = { hola: 'pei'}
