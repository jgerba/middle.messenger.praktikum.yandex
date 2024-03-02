import MessageDropdown from './messageDropdown.ts';
import DropdownOption from '../../dropdownOption/dropdownOption.ts';
import photoVideoSvg from './svg/foto-video.svg';
import fileSvg from './svg/file.svg';
import locationSvg from './svg/location.svg';
import btnIcon from './svg/scrap.svg';

export default new MessageDropdown({
  photoVideoBtn: new DropdownOption({
    alt: 'Upload photo and video',
    text: 'Photo and video',
    icon: photoVideoSvg,
    attr: { class: 'dropdown-option' },
    events: {},
  }),
  fileBtn: new DropdownOption({
    alt: 'Upload file',
    text: 'File',
    icon: fileSvg,
    attr: { class: 'dropdown-option' },
    events: {},
  }),
  locationBtn: new DropdownOption({
    alt: 'Add location',
    text: 'Location',
    icon: locationSvg,
    attr: { class: 'dropdown-option' },
    events: {},
  }),

  btnIcon,
  events: {},
});

