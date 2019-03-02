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
