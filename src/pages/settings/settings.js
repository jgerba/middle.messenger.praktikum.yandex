export default `
<main class='main'>
  {{>ReturnBtn}}
  {{>SettingsForm userName='Иван'}}
  {{#if showModal}}
  {{>Modal header='Upload a file' upload=true btn-text='Upload'}}
  {{/if}}
</main>`;
