export default `
<article class='message {{#if isPersonal}}personal-message{{/if}}'>
  <p class="message__text">{{text}}</p>
  <p class="message__time">{{time}}</p>

  {{#if isRead}}<img class="message__is-read-icon" src='../../static/svg/is_read.svg' alt="message is read">{{/if}}
</article>`;
