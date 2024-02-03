import tpl from './card.js';
import { registerTpl, renderTpl } from '../../utils/tplHelper.js';

registerTpl('Card', tpl);
export default renderTpl(tpl);
