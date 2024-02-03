export default `<div class='container {{container-class}}'>
    <label class='label {{#if notEmpty}} label-small {{/if}}' for='{{name}}'>{{name}}</label>
    <input
        class='input {{input-class}}'
        id='{{name}}'
        type='{{#if type}} {{type}} {{else}} text {{/if}} '
        name='{{name}}'
        placeholder='{{name}}'
    />
    <p class='error'>{{error-text}}</p>
</div>`;
