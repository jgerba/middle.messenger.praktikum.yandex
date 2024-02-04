export default `
<button class='btn {{class}} {{#if extra-btn}}btn--extra{{/if}} {{#if warning-btn}}btn--warning{{/if}}' type='{{#if submit}}submit{{else}}button{{/if}}'>{{text}}</button>`;
