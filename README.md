# Сервис для печати стикеров

## Подготовка

Для работы потребуется платформа NodeJS 10.

### Способы установки

В macOS:

```bash
brew install node@10
```

В Debian и Ubuntu:

```bash
curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
sudo apt install -y nodejs
```

В Windows:

1. Скачайте [установщик](https://nodejs.org/en/download/) LTS версии с официального сайта
2. Кликайте `Next` пока не установится :)

## Запуск

В первую очередь необходимо установить зависимости:

```bash
npm install
```

Запустить проект в режиме разработки можно следующим образом:

```bash
npm run dev
```

Он станет доступен в браузере по адресу http://localhost:3000.

## Доступные команды

Вызываются из терминала в формате `npm run <command>`

| Команда  | Действие                                                   |
| -------- | ---------------------------------------------------------- |
| dev      | Запуск приложения в режиме разработки                      |
| build    | Сборка скриптов, стилей и других ресурсов для production   |
| start    | Запуск приложения в production режиме                      |
| lint     | Проверка кода на потенциальные ошибки и соответствие стилю |
| lint-fix | Исправление ошибок выявленных в процессе проверки          |

## Внешние зависимости

- [cross-fetch](https://github.com/lquixada/cross-fetch) — Библиотека позволяющая делать HTTP запросы одинаковым образом как на клиенте, так и на сервере
- [@bem-react/classname](https://github.com/bem/bem-react/tree/master/packages/classname) — Библиотека для формирования имён классов в БЭМ-стиле
- [@bem-react/classnames](https://github.com/bem/bem-react/tree/master/packages/classnames) — Библиотека для создания "миксов" из нескольких классов
