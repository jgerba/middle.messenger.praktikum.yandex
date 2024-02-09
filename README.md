[![Netlify Status](https://api.netlify.com/api/v1/badges/ee4e4dd0-7ae5-4d49-943a-6921da50215c/deploy-status)](https://app.netlify.com/sites/jugermessenger/deploys)

# Мессенджер

Проект по созданию мэссенджера, в рамках курса по фронтенд-разработке.

### Макет проекта

https://www.figma.com/file/jX0PPV9INgyvigFhhqxuAb/Chat_external_link-(Copy)?type=design&t=1KbSAjT6Nhxv8GzA-6

### Установка проекта

-   `npm install` — установка стабильной версии,
-   `npm run dev` — запуск версии для разработчика,
-   `npm run build` — сборка проекта,
-   `npm run start` — сборка проекта и запуск локального сервера.

### Ссылки

> [!NOTE]
> В качестве временного решения функционал страниц меняется в зависимости от переданного контекста. Например: если переданная в authpage переменная login имеет значение true, то отображается шаблон для входа в приложение, в противном случае – для создания пользователя. Примеры контекста хранятся в переменной pagesContext в main.js

ссылка на проект / вход в приложение (макет страницы authpage с контекстом {login: true})
https://jugermessenger.netlify.app/

создание пользователя (макет страницы authpage)
https://jugermessenger.netlify.app/authpage

страница чата (макет страницы chatpage)
https://jugermessenger.netlify.app/chatpage

профиль пользователя (макет страницы profile)
https://jugermessenger.netlify.app/profile

> при передаче контекста { showModal: true } открывается всплывающее окно загрузки файла.

редактирование пользователя (макет страницы changeprofile)
https://jugermessenger.netlify.app/changeprofile

> при передаче контекста { changePass: true } меняется на меню редактирования пароля.

ошибка 500 (макет страницы errorpage)
https://jugermessenger.netlify.app/errorpage

ошибка 404 (макет страницы errorpage с контекстом {notFound: true})
https://jugermessenger.netlify.app/ + любое значение, отличное от вышеперечисленных
