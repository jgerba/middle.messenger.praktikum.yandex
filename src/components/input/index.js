import Handlebars from 'handlebars';
import tpl from './input.js';

export default function Input(props) {
    return Handlebars.compile(tpl)(props);
}
