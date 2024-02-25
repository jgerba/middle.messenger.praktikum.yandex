import tpl from './messageForm.hbs?raw';
import { PropsType, ChildrenType } from '../../core/block.ts';
import ValidationForm from '../../core/validationForm.ts';

export default class MessageForm extends ValidationForm {
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
