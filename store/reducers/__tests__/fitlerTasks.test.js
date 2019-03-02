import { filterTasks } from '../tasks';

import TasksMocks from '../tasks.types';

describe('filterTasks', () => {
    test('фильтрует по строке', () => {
        expect(filterTasks([['title', 'Сверстать шапку']], TasksMocks)).toEqual(
            [
                {
                    priority: 0,
                    storyPoints: 1,
                    author: '@ivanov',
                    title: 'Сверстать шапку',
                    description: 'Вывести название полей и контролы сортировки',
                    id: 'STICKER-101',
                    date: new Date(2019, 1, 2),
                    deadline: new Date(2019, 1, 2),
                    sprint: '#30. Мартовский код',
                    type: 'task',
                    tags: ['Вёрстка']
                }
            ]
        );
    });

    test('фильтрует по списку строк', () => {
        expect(
            filterTasks(
                [['sprint', ['#30. Мартовский код', '#28. Код']]],
                TasksMocks
            )
        ).toEqual([
            {
                priority: 0,
                storyPoints: 1,
                author: '@ivanov',
                title: 'Сверстать шапку',
                description: 'Вывести название полей и контролы сортировки',
                id: 'STICKER-101',
                date: new Date(2019, 1, 2),
                deadline: new Date(2019, 1, 2),
                sprint: '#30. Мартовский код',
                type: 'task',
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
                sprint: '#28. Код',
                type: 'task',
                link: ['STICKER-101', 'STICKER-102', 'STICKER-103'],
                other: 'Собрать команду DevOps',
                tags: ['Деплой']
            }
        ]);
    });

    test('фильтрует по объекту {from, to}', () => {
        expect(
            filterTasks(
                [
                    [
                        'deadline',
                        { from: new Date(2019, 5, 1), to: new Date(2019, 5, 3) }
                    ]
                ],
                TasksMocks
            )
        ).toEqual([
            {
                priority: 0,
                storyPoints: 3,
                author: '@ivanov',
                title: 'Починить прогрузку стилей',
                description:
                    'При первом посещении сайта не применяются все стили',
                id: 'STICKER-103',
                date: new Date(2019, 1, 2),
                deadline: new Date(2019, 5, 2),
                sprint: '#29. Мартовский код',
                type: 'bug',
                tags: ['Вёрстка']
            }
        ]);
    });
});
