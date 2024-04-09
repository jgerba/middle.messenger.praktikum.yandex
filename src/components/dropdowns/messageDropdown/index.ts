import MessageDropdown from './messageDropdown.ts';
import DropdownOption from '../../dropdownOption/dropdownOption.ts';
import photoVideoSvg from './svg/foto-video.svg';
import locationSvg from './svg/location.svg';
import btnIcon from './svg/scrap.svg';

export default new MessageDropdown({
  photoVideoBtn: new DropdownOption({
    alt: 'Upload image',
    text: 'Upload image',
    icon: photoVideoSvg,
    attr: { class: 'dropdown-option' },
    events: {},
  }),
  locationBtn: new DropdownOption({
    alt: 'Add location',
    text: 'Add location',
    icon: locationSvg,
    attr: { class: 'dropdown-option' },
    events: {},
  }),

  btnIcon,
  attr: { class: 'dropdown-root' },
  events: {},
});
