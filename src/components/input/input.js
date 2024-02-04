export default `
<div class='input-wrapper {{class}}'>
  <label class='label {{#if isFocused}}label--small{{else}}label--hidden{{/if}}' for='{{name}}-id'>{{text}}</label>
  <input class='input {{input-class}}' id='{{name}}-id' type='{{#if type}}{{type}}{{else}}text{{/if}}'
    name='{{name}}' placeholder='{{text}}'/>
  {{#if error-text}}<p class='error'>{{error-text}}</p>{{/if}}
</div>`;
