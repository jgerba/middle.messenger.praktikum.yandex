export default `
<article class='chat-preview'>
  <div class='chat-preview__img'></div>

  <div class='chat-preview__message-wrapper'>
    <h3 class='chat-preview__header'>тет-а-теты</h3>
    <p class='chat-preview__message'>И Human Interface Guidelines и Material Design рекомендуют...</p>
  </div>

  <div class='chat-preview__info-wrapper'>
    <p class='chat-preview__date'>12:00</p>

    {{#if unread}}
      <div class='chat-preview__unread-icon'>
        <p class='chat-preview__unread-number'>2</p>
      </div>
    {{/if}}
  </div>
</article>`;