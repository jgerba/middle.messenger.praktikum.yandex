export default `
<section class='form form--profile'>
  <div class="form--profile__header-wrapper">
    {{>UserPic}}
    <h1 class='header'>{{userName}}</h1>
  </div>

  <div class="form--profile__field-wrapper">
    {{>ProfileField header='Email' text='pochta@yandex.ru'}}
    {{>ProfileField header='Login' text='ivanivanov'}}
    {{>ProfileField header='Name' text='Иван'}}
    {{>ProfileField header='Surname' text='Иванов'}}
    {{>ProfileField header='Phone' text='+7 (909) 967 30 30'}}
  </div>

  <div class="form__btns-wrapper">
    {{>Button class='form--profile__btn' extra-btn=true text='Change profile'}}
    {{>Button class='form--profile__btn' extra-btn=true text='Change password'}}
    {{>Button class='form--profile__btn' warning-btn=true text='Log out'}}
  </div>
</section>`;
