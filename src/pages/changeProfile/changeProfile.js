export default `
<main class='main'>
  {{>ReturnBtn}}

  {{#if changePass}}
  {{>ProfileForm changePass=true }}
  {{else}}
  {{>ProfileForm}}
  {{/if}}

  {{#if showModal}}
  {{>Modal header='Upload a file' upload=true btn-text='Upload'}}
  {{/if}}
</main>`;