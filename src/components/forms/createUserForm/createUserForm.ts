import tpl from './createUserForm.hbs?raw';
import { PropsType, ChildrenType } from '../../../core/block.ts';
import ValidationForm from '../validationForm.ts';

export default class CreateUserForm extends ValidationForm {
  constructor(props: PropsType | ChildrenType) {
    super('form', props);
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }
}