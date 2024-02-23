import DropdownBtn from '../dropdownBtn/dropdownBtn';
import MessageDropdown from './messageDropdown.ts';
import photoVideoSvg from './svg/foto-video.svg';
import fileSvg from './svg/file.svg';
import locationSvg from './svg/location.svg';

export default new MessageDropdown({
  photoVideoBtn: new DropdownBtn({
    alt: 'Upload photo and video',
    text: 'Photo and video',
    src: photoVideoSvg,
    attr: { class: 'dropdown-btn' },
  }),
  fileBtn: new DropdownBtn({
    alt: 'Upload file',
    text: 'File',
    src: fileSvg,
    attr: { class: 'dropdown-btn' },
  }),
  locationBtn: new DropdownBtn({
    alt: 'Add location',
    text: 'Location',
    src: locationSvg,
    attr: { class: 'dropdown-btn' },
  }),

  attr: { class: 'dropdown message-drop hidden' },
});
