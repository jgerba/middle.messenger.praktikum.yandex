import MessageDropdown from './messageDropdown.ts';
import DropdownBtn from '../dropdownBtn/dropdownBtn.ts';
import DropdownOption from '../dropdownOption/dropdownOption.ts';
import photoVideoSvg from './svg/foto-video.svg';
import fileSvg from './svg/file.svg';
import locationSvg from './svg/location.svg';
import btnIcon from './svg/scrap.svg';

export default new MessageDropdown({
  dropdownBtn: new DropdownBtn({
    btnIcon,
    attr: {
      class: 'message-form__dropdown-btn',
      title: 'Open dropdown',
      type: 'button',
    },
    events: {},
  }),

  photoVideoBtn: new DropdownOption({
    alt: 'Upload photo and video',
    text: 'Photo and video',
    icon: photoVideoSvg,
    attr: { class: 'dropdown-option' },
  }),
  fileBtn: new DropdownOption({
    alt: 'Upload file',
    text: 'File',
    icon: fileSvg,
    attr: { class: 'dropdown-option' },
  }),
  locationBtn: new DropdownOption({
    alt: 'Add location',
    text: 'Location',
    icon: locationSvg,
    attr: { class: 'dropdown-option' },
  }),
});
