![home](https://github.com/user-attachments/assets/45ba7553-bb0d-4f53-986e-8506b5d69d76)

# Сасфликс

DEMO: https://ikakprosto.fubon.ru

### Описание

Реализовано приложение с общим списком постов и отдельными страницами с комментариями.
Код на Nuxt3 (Vue3, Vite и TypeScript уже нативно интегрированны) и разбит на компоненты.
Поддерживает и использовано для примера: CSS, SCSS, Tailwind CSS

## Важно!

Все данные хранятся в LocalStorage. Если используете в продакшене, обязательно нужно использовать Prisma, PostgreSQL и обновляемые токены (Refresh Tokens). Не используйте модуль @pinia/nuxt так как с использованием (SSR) может привести к уязвимостям безопасности.

### Demo приложение может:

- Выводим первые 5 постов из API на общей странице
- Написано без использования готовых библиотек компонентов
- Кликабельные кнопки лайка и дизлайка
- Удаление комментариев, изменяем значеня и стили кнопок локально
- Добавлена фильрация постов по тегам

[Макет в Фигме ](https://jobs.sasflix.ru/frontender/App-Template.fig)

### Дорожная карта (Branches)

- [x] Demo (Frontend), localStorage
- [ ] Site (Frontend, TailwindCSS, NuxtUI)
- [ ] Auth (Prisma, PostgreSQL, Refresh Tokens)
- [ ] CMS, Admin, User, Search (Backand, Frontend)
- [ ] Pages, Posts, Comments, Like (Backand, Frontend)
- [ ] Video Playlist (Backand, API Sasflix, Frontend)
- [ ] Buy Pass Content (Backand, Frontend)
- [ ] PWA (Frontend)
- [ ] i18n (Frontend)

&copy; Sasflix (ikakprosto.ru Demo) 22.10.2024 by Fubon
