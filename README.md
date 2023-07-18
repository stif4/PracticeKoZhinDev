# PRACTICE-BOILERPLATE

### Установка

Выполнить `yarn`

### Запуск сервера

1. Выполнить `yarn start`
2. Открыть http://localhost:3000/

### Включение eslint в IDE

Для WebStorm идем в `Настройки` -> `Languages & Frameworks` -> `Code Quality Tools` -> `ESLint`

И включаем там пункты `Automatic ESLint configuration` и `Run eslint --fix on save`

### Запуск Eslint

`yarn lint`

### Описание структуры проекта

```
constants - константы приложения: роуты, урлы для запросов и тд.

hooks - хранятся кастомные хуки, 1 файл - 1 хук.
    hooks/
        useDebounce.tsx
        useHideScroll.tsx

routes - роуты приложения (страницы).
    IndexPage/
        views - компоненты, используемые только в IndexPage
        IndexPage.tsx - реакт компонент
        IndexPage.scss - стили компонента
        index.ts - подгрузка компонента как директории

ui - глупые компоненты: кнопки, карточки, инпуты и тд.
    ui/
        Button
            Button.tsx
            Button.scss
        Input
            Input.tsx
            Input.scss

shared - общие компоненты, к примеру Layout - оболочка для страниц.

style - общие стили.
    index.scss - главный файл стилей
    variables.scss - scss переменные

types - все интерфейсы/типы приложения.

utils -  в данной папке хранятся вспомогательные, простые, функции, которые могут использоваться в компонентах или хуках.

Application.tsx - основной компонент приложения.


.eslintrc - правила стилизации
package.json - описание зависимостей
tsconfig.json - настройки тайпскрипта
yarn.lock - фиксированные версии зависимостей
.env.sample - пример файла .env
.env - содержит некоторые пользовательские переменные среды, к примеру url для бэкенда:
    APP_BACKEND_URL=https://jsonplaceholder.typicode.com
```

### Структуру redux store и роутинг настроить самостоятельно
