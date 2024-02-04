export default `
<section class="modal">
  <div class='modal__backdrop'></div>
  <form class='form modal__form'>
    {{#if submitError}}
    <p class="modal__submit-error"></p>
    {{else}}
    <h3 class='modal__header'>{{header}}</h3>
    {{/if}}

    {{#if upload}}
    {{>Input name='avatar' text='Choose file on PC' type='file' upload=true}}
    {{else}}
    {{>Input name='login' text='Login'}}
    {{/if}}

    {{>Button submit=true text='Change'}}

    {{#if error}}
    <p class="modal__error"></p>
    {{/if}}
  </form>
</section>`;
