export default `
<main class='main'>
  {{>ReturnBtn}}

  {{>Profile userName='Иван'}}

  {{#if showModal}}
  {{>Modal header='Upload a file' upload=true btn-text='Upload'}}
  {{/if}}
</main>`;