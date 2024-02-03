import Handlebars from 'handlebars';
import tpl from './button.js';

export default function Button(props) {
    return Handlebars.compile(tpl)(props);
}
