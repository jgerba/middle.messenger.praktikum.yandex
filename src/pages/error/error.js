export default `
<main class="main main-error-page">
  <h1>{{#if notFound}}404{{else}}500{{/if}}</h1>
  <h3>{{#if notFound}}Wrong path{{else}}We are already solving the problem{{/if}}</h3>
  <a href="/chatpage">Back to chats</a>
</main>
`;