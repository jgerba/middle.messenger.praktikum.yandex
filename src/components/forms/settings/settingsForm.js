export default `
<form class='form form--settings'>
  <div class="form--settings__header-wrapper>
    {{>UserPic}}
    <h1 class='header'>{{userName}}</h1>
  </div>

  <div class="form--settings__field-wrapper">
    {{>SettingsField header='Email' text='pochta@yandex.ru'}}
    {{>SettingsField header='Login' text='ivanivanov'}}
    {{>SettingsField header='Name' text='Иван'}}
    {{>SettingsField header='Surname' text='Иванов'}}
    {{>SettingsField header='Nickname' text='Иван'}}
    {{>SettingsField header='Phone' text='+7 (909) 967 30 30'}}
  </div>

  <div class="form__btns-wrapper">
    {{>Button class='form--settings__btn' extra-btn=true text='Change profile'}}
    {{>Button class='form--settings__btn' extra-btn=true text='Change password'}}
    {{>Button class='form--settings__btn' warning-btn=true text='Log out'}}
  </div>
</form>`;
