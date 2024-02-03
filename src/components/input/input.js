export default `<div class='input-wrapper {{class}}'>
    <label class='input-wrapper__label {{#if notEmpty}} input-wrapper__label--small {{/if}}' for='{{name}}'>{{name}}</label>
    <input
        class='input-wrapper__input {{input-class}}'
        id='{{name}}'
        type='{{#if type}} {{type}} {{else}} text {{/if}} '
        name='{{name}}'
        placeholder='{{name}}'
    />
    {{#if error-text}}<p class='input-wrapper__error'>{{error-text}}</p>{{/if}}
</div>`;
