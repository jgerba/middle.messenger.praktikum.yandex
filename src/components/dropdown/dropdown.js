export default `
<article class='dropdown {{#if header}}header-drop{{else}}message-drop{{/if}}'>
  {{#if chatDrop}}
  {{>DropdownBtn src='../../../static/svg/add.svg' alt='add icon' text='Add user'}}
  {{>DropdownBtn src='../../../static/svg/remove.svg' alt='remove icon' text='Remove user'}}
  {{else}}
  {{>DropdownBtn src='../../../static/svg/foto-video.svg' alt='media icon' text='Photo and video'}}
  {{>DropdownBtn src='../../../static/svg/file.svg' alt='file icon' text='File'}}
  {{>DropdownBtn src='../../../static/svg/location.svg' alt='location icon' text='Location'}}
  {{/if}}
</article>`;