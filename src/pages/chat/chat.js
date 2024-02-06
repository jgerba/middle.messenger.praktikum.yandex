export default `
<main class="main chat">
  <section class="chat__left-panel">
    {{>ProfileLink}}
    {{>SearchForm}}

    <section class="chat__chats-overview">
      {{>ChatPreview unread=true}}
      {{>ChatPreview}}
    </section>
  </section>

  <section class="chat__selected-chat">
    {{>ChatHeader}}

    <section class="chat__dialog">
      {{>Message text='Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент
      попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с
      моделью
      500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой
      забрали только кассеты с пленкой.

      Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали.
      Всего
      их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.' time='11:56'}}

      {{>Message isPersonal='true' isRead='true' text='Круто!' time='12:00'}}
    </section>

    {{>MessageForm}}
    </section>
</main>
`;
