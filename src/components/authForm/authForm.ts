import tpl from './authForm.hbs?raw';
import { PropsType, ChildrenType } from '../../core/block.ts';
import AuthForm from '../../core/authForm.ts';

export default class LogInForm extends AuthForm {
  constructor(props: PropsType | ChildrenType) {
    super('form', props);
  }

  render(): DocumentFragment {
    // remove events data from props
    // iife - destructure props from argument, return rest (no unused vars)
    // const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, this.props);
  }
}
