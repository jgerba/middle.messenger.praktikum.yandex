export default `
<div class='input-wrapper {{class}}'>
  <label class='label {{#if isFocused}}label--small{{else}}label--hidden{{/if}} {{#if upload}}upload-label{{/if}}' for='{{name}}-id'>{{text}}</label>
  <input class='input {{#if search}}search-input{{/if}} {{#if upload}}upload-input{{/if}}{{class}}' id='{{name}}-id' type='{{#if type}}{{type}}{{else}}text{{/if}}'
    name='{{name}}' placeholder='{{text}}'/>
  {{#if error-text}}<p class='error'>{{error-text}}</p>{{/if}}
</div>`;
