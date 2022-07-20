# Проект: Место

### Обзор
* Интро
* Технологии
* Где посмотреть

**Интро**

Проект сайта о красивых местах в России, который можно посмотреть в режиме мобильного, планшета и десктопа.
На каждом устройстве сайт адаптивно меняется для удобства и читабельности.
Можем обмениваться информацией с сервером по REST API: добавить и удалить (только свою) карточку с подтверждением,
  поставить/снять лайк, обновление данных пользователя (имя, аватарка) и т.д.

**Технологии**

Использованы следующие технологии:

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


**Где посмотреть**

А вот здесь &rarr; [Mesto Russia](https://bezprobeloff.github.io/mesto/index.html).
