import tpl from './profileForm.hbs?raw';
import { PropsType, ChildrenType } from '../../core/block.ts';
import ValidateForm from '../../core/validateForm.ts';

export default class ProfileForm extends ValidateForm {
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
