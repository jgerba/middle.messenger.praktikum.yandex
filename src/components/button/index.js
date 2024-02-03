import tpl from './button.js';
import { registerTpl, renderTpl } from '../../utils/tplHelper.js';

registerTpl('Button', tpl);
export default renderTpl(tpl);
