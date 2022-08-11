<h1 align="center">Mesto Russia</h1>
<p align="center">
    <img alt="Version" src="https://img.shields.io/github/package-json/v/bezprobeloff/mesto" />
    <img alt="Quality" src="https://img.shields.io/badge/status-release-orange.svg" >
    <img alt="Made by: Bezprobeloff" src="https://img.shields.io/badge/made%20by-Bezprobeloff-blue" />
</p>

Ссылка на deploy проекта в gh-pages: **[Mesto Russia](https://bezprobeloff.github.io/mesto/index.html)**


![Watch the video](./readme/preview.gif)


**Обзор**

Проект сайта о красивых местах в России, который можно посмотреть в режиме мобильного, планшета и десктопа.
На каждом устройстве сайт адаптивно меняется для удобства и читабельности.
Можем обмениваться информацией с сервером по REST API: добавить и удалить (только свою) карточку с подтверждением, поставить/снять лайк, обновление данных пользователя (имя, аватарка) и т.д.

**Технологии**

* __Flexbox__
* __Grid__
* Методология __БЭМ__
* __Семантическая__ вёрстка
* __Адаптивность__ с использованием "резиновости"
* Реализация __JS__-логики:
  * код разделен на модули и классы
  * на открытие попапов (редактирование профиля, добавление карточки, просмотр картинки)
  * закрытие попапов (по Esc, по overlay, по кнопке закрытия)
  * редактирование профиля
  * поставить лайк &hearts;
  * добавить новую фотокарточку
  * удалить фотокарточку
  * посмотреть фото на весь экран
  * валидация формы
* Реализация получения данных с сервера по __REST API__:
  * Снятие/Установка лайков
  * Добавление карточки. Удаление только своих карточек
  * Обновление/редактирование данных пользователя (имя, работа, аватарка)
* Сборка проекта Webpack с Babel

**Скрипты**
###  `npm run build`

Запуск сборки проекта. Сохраняется в папку dist

### `npm run dev`

Запуск в режиме разработки, в браузере автоматически откроется по такому адресу [http://localhost:8080/]
