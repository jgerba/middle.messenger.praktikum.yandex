import ReturnButton from './returnButton.ts';
import arrowSvg from './svg/left_arrow.svg';

export default new ReturnButton({
  arrowSvg,
  attr: { class: 'btn-return-wrapper', title: 'Step back' },
  events: {},
});
