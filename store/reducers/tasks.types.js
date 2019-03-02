/**
 * @typedef TaskM
 * @property {number} [priority] - Приоритет задачи от 0 до 10 (ноль это минорная задача)
 * @property {number} [storyPoints] - Стоимость/Вес выполнения задачи
 * @property {string} [author] - Логин того кто создал задачу
 * @property {string} [title] - Название задачи
 * @property {string} [description] - Краткое описание задчи
 * @property {string} [assign] - Исполнитель
 * @property {string} [id] - Id задачи в трекере
 * @property {Date} [date] - Дата создания задачи
 * @property {Date} [deadline] - Дата дедлайна
 * @property {string} [sprint] - Название спринта
 * @property {string} [type] - Тип задача (баг/фича и т.д.)
 * @property {string[]} [tags] - Теги (фронт/бек и т.д.)
 * @property {string} [link] - Ссылка/номер связанной задачи
 * @property {string} [other] - другое
 */

/**
 * @typedef {TaskM[]} Tasks
 */

export default [
    {
        priority: 0,
        storyPoints: 1,
        author: '@ivanov',
        title: 'Сверстать шапку',
        description: 'Вывести название полей и контролы сортировки',
        id: 'STICKER-101',
        date: new Date(2019, 1, 2),
        deadline: new Date(2019, 1, 2),
        sprint: '#29. Мартовский код',
        type: 'task',
        tags: ['Вёрстка']
    },
    {
        priority: 0,
        storyPoints: 2,
        author: '@ivanov',
        title: 'Сверстать карточку',
        description: 'Вывести все поля задачи',
        id: 'STICKER-102',
        date: new Date(2019, 1, 2),
        deadline: new Date(2019, 1, 2),
        sprint: '#29. Мартовский код',
        type: 'task',
        tags: ['Вёрстка']
    },
    {
        priority: 0,
        storyPoints: 3,
        author: '@ivanov',
        title: 'Починить прогрузку стилей',
        description: 'При первом посещении сайта не применяются все стили',
        id: 'STICKER-103',
        date: new Date(2019, 1, 2),
        deadline: new Date(2019, 1, 2),
        sprint: '#29. Мартовский код',
        type: 'bug',
        tags: ['Вёрстка']
    },
    {
        priority: 10,
        storyPoints: 1,
        author: '@ivanov',
        title: ' Настроить деплой',
        description: 'Задеплоить проект на heroku',
        id: 'STICKER-104',
        date: new Date(2019, 1, 2),
        deadline: new Date(2019, 1, 2),
        sprint: '#29. Мартовский код',
        type: 'task',
        link: ['STICKER-101', 'STICKER-102', 'STICKER-103'],
        other: 'Собрать команду DevOps',
        tags: ['Деплой']
    }
];
