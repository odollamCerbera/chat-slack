### Hexlet tests and linter status:
[![Actions Status](https://github.com/odollamCerbera/frontend-project-12/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/odollamCerbera/frontend-project-12/actions)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=odollamCerbera_chat-slack&metric=bugs)](https://sonarcloud.io/summary/new_code?id=odollamCerbera_chat-slack)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=odollamCerbera_chat-slack&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=odollamCerbera_chat-slack)

# Проект чата - "Hexlet Chat"

Чат-приложение с поддержкой множества каналов и обменом сообщениями в реальном времени.

### Основные возможности:
- **Регистрация и авторизация** - создайте аккаунт и войдите в систему
- **Каналы** - создавайте, переименовывайте и удаляйте каналы
- **Сообщения** - обменивайтесь сообщениями в реальном времени
- **Адаптивный дизайн** - Bootstrap обеспечивает красивый интерфейс
- **Мониторинг ошибок** - интеграция с Rollbar для отслеживания проблем

## Технологии:
- **Frontend:** React 18, Redux Toolkit, React Router v6
- **Реальное время:** Socket.IO-client
- **Стилизация:** Bootstrap, React Bootstrap
- **Интернационализация:** i18next
- **Мониторинг:** Rollbar
- **Сборка:** Vite
- **Деплой:** Render

## Демонстрация: 

Попробуйте приложение в действии: [Chat Демо](https://frontend-project-12-4oo9.onrender.com)

## Установка:

1. Клонируйте репозиторий:
   ```bash
   git clone https://github.com/odollamCerbera/frontend-project-12
   cd frontend
   ```

2. Установите зависимости:
   ```bash
   npm install
   ```

3. Создайте файл `.env.local` и добавьте переменные:
   ```
   VITE_ROLLBAR_ACCESS_TOKEN=ваш_токен_rollbar
   ```

4. Запустите приложение:
   ```bash
   npm start
   ```

5. Откройте [http://localhost:5001](http://localhost:5001)

## Структура проекта:

```
src/
├── components/     # React-компоненты
├── pages/          # Страницы приложения (HomePage, LoginPage, SignupPage, NotFoundPage)
├── store/          # Redux store, slices, thunks, селекторы
│   ├── slices/     # channelsSlice, messagesSlice и др.
│   └── thunks/     # Асинхронные операции
├── utils/          # Вспомогательные функции, routes.js, profanity.js
├── locales/        # Файлы переводов для i18n
├── assets/         # Изображения
├── App.jsx         # Корневой компонент с роутингом
├── init.jsx        # Инициализация приложения (провайдеры)
├── index.jsx       # Точка входа
├── socket.js       # Настройка Socket.IO
├── rollbar.js      # Настройка мониторинга ошибок
└── i18n.js         # Конфигурация интернационализации
```

## Описание основных файлов:

| Файл | Назначение |
|------|------------|
| `App.jsx` | Главный компонент, настройка роутинга, подключение сокетов |
| `init.jsx` | Инициализация всех провайдеров (Redux, i18n, Rollbar) |
| `socket.js` | Конфигурация Socket.IO клиента |
| `rollbar.js` | Настройка отслеживания ошибок |
| `i18n.js` | Конфигурация мультиязычности |
| `jsconfig.json` | Настройка алиасов для импортов (@components, @utils и др.) |
