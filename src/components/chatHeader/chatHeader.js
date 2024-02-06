export default `
<header class='chat-header'>
  <div class="chat-header__title-wrapper">
    <img class="chat-header__avatar" src="{{avatar}}" alt="chat avatar">
    <h1 class="chat-header__title">Вадим</h1>
  </div>

  <button class="chat-header__dropdown-btn">
    <img class="chat-header__icon" src='../../../static/svg/dots.svg' alt="dropdown button">
  </button>
  {{>Dropdown header=true}}
</header>`;
