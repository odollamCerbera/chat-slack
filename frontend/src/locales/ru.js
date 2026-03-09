export default {
  translation: {
    logo: 'Hexlet Chat',
    authorization: {
      login: 'Войти',
      logout: 'Выйти',
      signup: 'Регистрация',
    },
    notFoundPage: {
      pageNotFound: 'Страница не найдена',
      suggestAction: 'Но вы можете перейти',
      mainPage: 'на главную страницу',
    },
    loginPage: {
      login: 'Ваш ник',
      password: 'Пароль',
      noAccount: 'Нет аккаунта?',
    },
    signupPage: {
      username: 'Имя пользователя',
      password: 'Пароль',
      passwordRepeat: 'Подтвердите пароль',
      signup: 'Регистрация',
      signup_btn: 'Зарегистрироваться',
    },
    channels: {
      channels: 'Каналы',
      channel: 'Имя канала',
      channelPrefix: '#',
      controlChannel: 'Управление каналом',
      createChannel: 'Добавить канал',
      renameChannel: 'Переименовать',
      deleteChannel: 'Удалить',
      send: 'Отправить',
      cancel: 'Отменить',
      channelCreated: 'Канал создан',
      channelRenamed: 'Канал переименован',
      channelDeleted: 'Канал удалён',
    },
    messages: {
      newMessage: 'Введите сообщение...',
      messagePrefix: ': ',
      count_one: '{{ count }} сообщение',
      count_few: '{{ count }} сообщения',
      count_many: '{{ count }} сообщений',
    },
    errors: {
      validation: {
        invalidRange: 'От 3 до 20 символов',
        minLength: 'Не менее 6 символов',
        requiredField: 'Обязательное поле',
        passwordMismatch: 'Пароли должны совпадать',
        notUnique: 'Должно быть уникальным',
      },
      system: {
        invalidData: 'Неверные имя пользователя или пароль',
        alreadyExists: 'Такой пользователь уже существует',
        connection: 'Ошибка соединения',
        serverError: 'Сервер не отвечает',
        unknown: 'Неизвестная ошибка',
      },
    },
  }
}
