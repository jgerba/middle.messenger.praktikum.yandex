export default `
<form class='form form--signUp'>
  <h1 class='header'>Sign up</h1>

  <div class="form__input-wrapper">
    {{>Input name='email' type='email' text='Email'}}
    {{>Input name='login' text='Login'}}
    {{>Input name='first_name' text='Name'}}
    {{>Input name='second_name' text='Surname'}}
    {{>Input name='phone' type='phone' text='Phone'}}
    {{>Input name='password' type='password' text='Password'}}
    {{>Input name='password-confirm' type='password' text='Confirm password'}}
  </div>

  <div class="form__btns-wrapper">
    {{>Button submit=true text='Create account'}}
    {{>Button extra-btn=true text='Sign in'}}
  </div>
</form>`;
