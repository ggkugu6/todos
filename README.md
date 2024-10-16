# Приложение "Планировщик задач"

Проект разделен на серверную и клиентскую части, каждая из которых выполняет свои задачи и использует современный стек технологий.
## Ссылка на демонстрацию (https://rational-phaidra-andrey-198dd5cf.koyeb.app/)
Приложение развернуто на Koyeb, инициализация приложения в репозитории (https://github.com/ggkugu6/todos_docker)
Собран из 2-х докер образов server и client + БД в koyeb (создан из дамба pg_backup.sql)
## логин email454 ,  пароль andrey12 (чтоб протестить приложение, у данного пользователя есть подчиненные и руководитель) 
## Connection DATABASE
    DATABASE_HOST=ep-damp-wave-a22ezu5j.eu-central-1.pg.koyeb.app
    DATABASE_USER=koyeb-adm
    DATABASE_PASSWORD=rlDEB2V7QCdX
    DATABASE_NAME=todos

## Серверная часть

На сервере реализована мощная и гибкая архитектура для обработки запросов и взаимодействия с базой данных. Основные функции включают:

1. **Обработка HTTP-запросов** — сервер принимает и обрабатывает запросы от клиента, предоставляя необходимые данные.
2. **Маршрутизация** — управление путями и эндпоинтами для взаимодействия с API.
3. **Работа с базой данных** — использование PostgreSQL с ORM Sequelize для удобного управления данными.
4. **Аутентификация и авторизация** — для защиты данных используется JWT, обеспечивая безопасный доступ к ресурсам.
5. **Middleware-обработчик** — ограничивает доступ к задачам, разрешая доступ только их создателю и ответственному за выполнение.

### Стек технологий сервера:
- **Язык программирования:** JavaScript (Node.js)
- **База данных:** PostgreSQL (с использованием ORM Sequelize)
- **Аутентификация:** JWT (JSON Web Token)

---

## Клиентская часть

На стороне клиента реализован интуитивный и динамичный интерфейс для взаимодействия с пользователем. Основные функции включают:

1. **Отображение пользовательского интерфейса (UI)** — интерфейс выполнен с использованием библиотеки MUI, обеспечивая современный дизайн.
2. **Запросы к серверу** — используется библиотека Axios для эффективного взаимодействия с сервером.
3. **Управление состоянием** — MobX отвечает за управление состоянием приложения и обновление интерфейса.
4. **Маршрутизация** — React Router позволяет организовать навигацию между страницами без перезагрузки.
5. **Аутентификация и управление сессиями** — JWT-токен сохраняется в `localStorage`, что упрощает управление сессиями пользователя.
6. **Валидация данных** — проверка правильности и полноты заполнения форм перед отправкой данных на сервер.

### Стек технологий клиента:
- **Язык программирования:** HTML, JavaScript
- **JavaScript-библиотека:** React.js
- **Стилизация:** MUI
- **Управление состоянием:** MobX
- **Запросы к серверу:** Axios
