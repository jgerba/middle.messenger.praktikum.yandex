import tpl from './signInForm.js';
import { registerTpl, renderTpl } from '../../../utils/tplHelper.js';

registerTpl('SignInForm', tpl);
export default renderTpl(tpl);
