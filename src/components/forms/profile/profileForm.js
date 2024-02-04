export default `
<form class='form form--profile'>
  <div class="form--profile__header-wrapper">
    {{>UserPic}}
  </div>

  {{#if changePass}}
  <div class="form--profile__field-wrapper">
    {{>Input name='oldPassword' type='password' text='Old password'}}
    {{>Input name='newPassword' type='password' text='New password'}}
    {{>Input name='password-confirm' type='password' text='Confirm password'}}
  </div>
  {{else}}
  <div class="form--profile__field-wrapper">
    {{>Input name='email' type='email' text='pochta@yandex.ru'}}
    {{>Input name='login' text='ivanivanov'}}
    {{>Input name='first_name' text='Иван'}}
    {{>Input name='second_name' text='Иванов'}}
    {{>Input name='phone' type='phone' text='+7 (909) 967 30 30'}}
  </div>
  {{/if}}

  <div class="form__btns-wrapper">
    {{>Button submit=true text='Save changes'}}
  </div>
</form>`;
