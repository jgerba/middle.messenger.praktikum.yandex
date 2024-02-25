import tpl from './authForm.hbs?raw';
import { PropsType, ChildrenType } from '../../core/block.ts';
import ValidateForm from '../../core/validateForm.ts';

export default class LogInForm extends ValidateForm {
  constructor(props: PropsType | ChildrenType) {
    const onSubmit = (event: SubmitEvent) => this.submitForm(event);

    super('form', { ...props, events: { submit: onSubmit } });
  }

  render(): DocumentFragment {
    // remove events data from props
    // iife - destructure props from argument, return rest (no unused vars)
    // const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, this.props);
  }
}
