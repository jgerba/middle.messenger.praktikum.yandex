export default `
<form class='message-form'>
  <button class='message-form__dropdown-btn'><img src='../../static/svg/scrap.svg' alt='scrap icon'></button>
  {{>Input class='message-form__input' search=true name='message' text='Message'}}
  <button class='message-form__send-btn'><img src='../../static/svg/arrow.svg' alt='send icon'></button>
</form>`;
