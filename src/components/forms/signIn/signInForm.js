export default `
<form class='form {{class}}'>
    <h1 class='header'>Sign in</h1>

    <div class="form__input-wrapper">
        {{>Input name='login' text='Login'}}
        {{>Input name='password' type='password' text='Password'}}
    </div>

    <div class="form__btns-wrapper">
        {{>Button submit=true text='Enter'}}
        {{>Button extra-btn=true text='Sign up'}}
    </div>
</form>`;