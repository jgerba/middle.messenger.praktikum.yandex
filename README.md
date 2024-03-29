[![Netlify Status](https://api.netlify.com/api/v1/badges/3182eb1c-219a-4f0a-aef6-91bf21039bf5/deploy-status)](https://app.netlify.com/sites/jugermessenger/deploys)

<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" /> <img src="https://img.shields.io/badge/Sass-CC6699?style=for-the-badge&logo=sass&logoColor=white" /> <img src="https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white" /> <img src="https://img.shields.io/badge/stylelint-000?style=for-the-badge&logo=stylelint&logoColor=white" /> <img src="https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E" />

# Мессенджер

Проект по созданию мэссенджера, в рамках курса по фронтенд-разработке.

### Макет проекта

https://www.figma.com/file/jX0PPV9INgyvigFhhqxuAb/Chat_external_link-(Copy)?type=design&t=1KbSAjT6Nhxv8GzA-6

### Используемый стек

- typescript @5.4.3
- vite @5.2.4
- handlebars @4.7.8
- express @4.19.1
- uuid @9.0.1

- sass @1.72.0
- chai @5.1.0
- mocha @10.3.0
- eslint @8.57.0
- stylelint @16.2.1
- husky @9.0.11

### Установка проекта

- `npm install` — установка стабильной версии,
- `npm run dev` — запуск версии для разработчика,
- `npm run build` — сборка проекта,
- `npm run start` — сборка проекта и запуск локального сервера,
- `npm run lint` — проверка проекта при помощи Eslint и Stylelint,
- `npm run lint:js` — проверка проекта при помощи Eslint,
- `npm run lint:css` — проверка проекта при помощи Stylelint.
- `npm run test` — запуск тестов.

###

### Ссылки

модуль аутентификации
вход в приложение
https://jugermessenger.netlify.app/

создать пользователя
https://jugermessenger.netlify.app/sign-up

<details>

> При нажатии на кнопки SignUp и LogIn происходит переключение между формами.

> Есть валидация по blur у каждого элемента input по отдельности, а также повторная при отправке формы.

> При прохождении валидации в консоль выводятся введенные данные формы.

</details>

модуль чата
https://jugermessenger.netlify.app/messenger

<details>

> При нажатии на кнопку Profile происходит переход в модуль профиля.

> У формы отправки сообщения есть валидация при отправке формы (кнопка формы со стрелкой send message).

> При прохождении валидации в консоль выводятся введенные данные формы.

> Слева находится превью доступных чатов, клик по чату выводит его содрежимое в основной раздел модуля.

> В основном разделе модуля отображаются полученные/отправленные сообщения, в правом верхнем углу выпадающее меню для добалвения/удаления пользователя из чата, а также удаления активного чата.

> Клик по изображению аватара чата открывает модальное окно для его замены.

> Левый верхний угол - форма фильтрации превью доступных чатов. При введении фильтра над формой появляется соответствующий бейдж, клик по бейджу приводит к сбросу фильтра.

</details>

модуль профиля
https://jugermessenger.netlify.app/settings

<details>

> При нажатии на кнопку Change profile происходит переход в форму редактирования профиля.
> При нажатии на кнопку Change password происходит переход в форму редактирования пароля.
> При нажатии на кнопку со стрелкой Step back происходит переход из форм в начальное меню, из начального - в модуль чата.

> Есть валидация по blur у каждого элемента input по отдельности (за исключением элемента Old password в форме Change password), а также повторная при отправке формы.

> При провале валидации в консоль выводится соответствующее сообщение, при прохождении - данные формы.

> Клик по изображению аватара пользователя открывает модальное окно для его замены.

</details>

ошибка 404 (страница errorpage с контекстом {notFound: true})
https://jugermessenger.netlify.app/ + любое значение, отличное от вышеперечисленных
