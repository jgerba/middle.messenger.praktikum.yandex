import tpl from './messageForm.hbs?raw';
import { PropsType, ChildrenType } from '../../../core/block.ts';
import ValidationForm from '../validationForm.ts';
import WSController from '../../../controllers/WS-controller.ts';

export default class MessageForm extends ValidationForm {
  constructor(tagName: string, props: PropsType | ChildrenType) {
    const onSubmit = (event: SubmitEvent) => this.submitHandler(event);

    super(tagName, { ...props, events: { submit: onSubmit } });
  }

  render(): DocumentFragment {
    // remove events & attr data from props
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const propsToRender = (({ events, attr, ...rest }) => rest)(this.props);

    return this.compile(tpl, propsToRender);
  }

  submitHandler(event: SubmitEvent): void {
    event.preventDefault();

    const formData = this.submitForm();

    WSController.sendMessage(formData as { [key: string]: string });
  }
}
