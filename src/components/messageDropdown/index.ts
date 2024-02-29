import DropdownOption from '../dropdownOption/dropdownOption.ts';
import MessageDropdown from './messageDropdown.ts';
import photoVideoSvg from './svg/foto-video.svg';
import fileSvg from './svg/file.svg';
import locationSvg from './svg/location.svg';

export default new MessageDropdown({
  photoVideoBtn: new DropdownOption({
    alt: 'Upload photo and video',
    text: 'Photo and video',
    icon: photoVideoSvg,
    attr: { class: 'dropdown-btn' },
  }),
  fileBtn: new DropdownOption({
    alt: 'Upload file',
    text: 'File',
    icon: fileSvg,
    attr: { class: 'dropdown-btn' },
  }),
  locationBtn: new DropdownOption({
    alt: 'Add location',
    text: 'Location',
    icon: locationSvg,
    attr: { class: 'dropdown-btn' },
  }),

  attr: { class: 'dropdown message-drop hidden' },
});
