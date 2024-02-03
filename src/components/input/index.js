import tpl from './input.js';
import { registerTpl, renderTpl } from '../../utils/tplHelper.js';

registerTpl('Input', tpl);
export default renderTpl(tpl);
