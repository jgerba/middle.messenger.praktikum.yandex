export default `<div class='input-wrapper {{class}}'>
    <label class='label {{#if isFocused}} label--small {{else}} label--hidden {{/if}}' for='{{name}}'>{{name}}</label>
    <input
        class='input {{input-class}}'
        id='{{name}}'
        type='{{#if type}} {{type}} {{else}} text {{/if}} '
        name='{{name}}'
        placeholder='{{name}}'
    />
    {{#if error-text}}<p class='error'>{{error-text}}</p>{{/if}}
</div>`;
